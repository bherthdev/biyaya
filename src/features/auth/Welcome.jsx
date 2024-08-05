/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { CiViewList } from "react-icons/ci";
import { BsReceipt } from "react-icons/bs";
import { PiReceiptLight } from "react-icons/pi";
import { useGetOrdersQuery } from "../orders/ordersApiSlice";
import { useGetItemsQuery } from "../items/itemsApiSlice";

const Welcome = () => {

  const columnsOrders = ["Order#/Type", "Date/Time", "QTY", "Amount", "Barista"];
  const columnsItems = ["Item Name", "QTY", "Status"];


  const {
    data: ordersData,
    isLoadingOrders,
    isSuccess: ordersSucces,
    isErrorOrders,
    errorOrders,
  } = useGetOrdersQuery("ordersList", {
    pollingInterval: 10000, // refresh data every 15 seconds
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: itemsData,
    isLoadingItem,
    isSuccess: itemsSucces,
    isErrorItem,
    errorItem,
  } = useGetItemsQuery("itemsList", {
    pollingInterval: 10000, // refresh data every 15 seconds
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

 
  let [time, getTime] = useState(new Date().toLocaleTimeString());
  function refreshTime() {
    getTime((time = new Date().toLocaleTimeString()));
  }
  setInterval(refreshTime, 1000);
  const { name } = useAuth();

  const dateToday = (new Date().toLocaleDateString("en-US", {
    year: 'numeric', day: 'numeric',
    month: 'long'
  }))


  let content

  if(ordersSucces || itemsSucces){

    const { entities: ordersEntities } = ordersData;
    const { entities: itemsEntities } = itemsData;

    const orders = Object.values(ordersEntities);
    const items = Object.values(itemsEntities);


    const salesToday = () => {
      const today = new Date();
      const currentDate = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
  
      const totalSalesToday = orders
        .filter(order => {
          const orderDate = new Date(order.dateTime);
          const orderDateString = `${orderDate.getFullYear()}${orderDate.getMonth()}${orderDate.getDate()}`;
          return orderDateString === currentDate;
        })
        .reduce((totalSales, order) => totalSales + Number(order.total), 0);
  
      return totalSalesToday;
    }
  
    const ordersToday = () => {
      const today = new Date();
      const currentDate = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
  
      const totalSalesToday = orders
        .filter(order => {
          const orderDate = new Date(order.dateTime);
          const orderDateString = `${orderDate.getFullYear()}${orderDate.getMonth()}${orderDate.getDate()}`;
          return orderDateString === currentDate;
        })
  
      return totalSalesToday.length;
    }
  
    const totalQty = orders.reduce((total, order) => {
      const orderQty = order.items.reduce((sum, item) => sum + Number(item.qty), 0);
      return total + orderQty;
    }, 0);
  


    content = (
      <div aria-label="Page Header" className="">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mt-2">
  
            <p className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-gray-200">
              Welcome Back, {name}!
            </p>
  
            <p className="mt-1.5 text-sm text-gray-500">
              {`Today is  ${dateToday} - ${time} `}
            </p>
  
            <div className="mx-auto max-w-screen-xl  py-3  md:py-5">
              <dl className="font-normal grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  
                <article className="rounded-lg border border-gray-100 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500"> Sales Today</p>
  
                      <p className="text-2xl font-medium text-gray-900">₱ {Number(salesToday()).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                    </div>
  
                    <span className="rounded-full bg-green-100 p-3 text-green-600">
                      <BsReceipt size={25} className="text-green-400 dark:text-gray-500" />
                    </span>
                  </div>
                  <div className="mt-1 flex gap-1 text-green-600">
                    <p className="flex gap-2 text-xs">
                      <span className="text-gray-500">  *Updated every order success </span>
                    </p>
                  </div>
                </article>
  
                <article className="rounded-lg border border-gray-100 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">  Orders Today </p>
  
                      <p className="text-2xl font-medium text-gray-900"> {ordersToday()}</p>
                    </div>
  
                    <span className="rounded-full bg-gray-100 p-3 text-green-600">
                      <PiReceiptLight size={25} className="text-gray-500 dark:text-gray-500" />
                    </span>
                  </div>
                  <div className="mt-1 flex gap-1 text-green-600">
                    <p className="flex gap-2 text-xs">
                      {/* <span className="text-gray-500">  {dateToday} </span> */}
                    </p>
                  </div>
                </article>
  
                <article className="rounded-lg border border-gray-100 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">  Total Orders </p>
  
                      <p className="text-2xl font-medium text-gray-900">{orders.length}</p>
                    </div>
  
                    <span className="rounded-full bg-gray-100 p-3 text-green-600">
                      <PiReceiptLight size={25} className="text-gray-500 dark:text-gray-500" />
                    </span>
                  </div>
                  <div className="mt-1 flex gap-1 text-green-600">
                    <p className="flex gap-2 text-xs">
                      {/* <span className="text-gray-500">  {dateToday} </span> */}
                    </p>
                  </div>
                </article>
  
                <article className="rounded-lg border border-gray-100 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500"> Total Items </p>
  
                      <p className="text-2xl font-medium text-gray-900">{totalQty}</p>
                    </div>
  
                    <span className="rounded-full bg-gray-100 p-3 text-green-600">
                      <CiViewList size={25} className="text-gray-700 dark:text-gray-500" />
  
                    </span>
                  </div>
                  <div className="mt-1 flex gap-1 text-green-600">
                    <p className="flex gap-2 text-xs">
                      {/* <span className="text-gray-500">  {dateToday} </span> */}
                    </p>
                  </div>
                </article>
  
  
  
              </dl>
            </div>
  
            {/* Orders Table */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
              <div className=" h-96 min-w-full rounded bg-white col-span-1 lg:col-span-2">
                <h1 className="py-4 px-6 text-sm font-medium text-gray-700 ">Recent Orders</h1>
                <div className="overflow-x-auto h-full bg-white min-w-full shadow-sm ">
                  <table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-700 text-sm leading-normal">
                    <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                      <tr className="sticky">
                        {columnsOrders.map((column, index) => (
                          <th key={index} className={`mx-auto text-start px-6 py-2 bg-[#F1F1F1] dark:bg-gray-700  text-xs font-normal text-gray-500 dark:text-gray-400 uppercase tracking-wider`}>
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:bg-slate-800 divide-gray-200 dark:divide-gray-700 ">
  
                      {orders.map((order, idx) => (
                        <tr key={idx} className=" dark:hover:bg-[#151e30] ">
                          <td
                            className={`sm:flex gap-4 whitespace-nowrap px-6 py-3 font-medium text-gray-900 dark:text-gray-300`}
                          >
                            <div className="flex flex-col text-left">
                              <h1 className="font-medium">{order.orderNo} </h1>
                              <p className="text-gray-600  font-normal">{order.orderType} </p>
                            </div>
                          </td>
  
                          <td className={`whitespace-nowrap  px-6 py-3  text-gray-900 dark:text-gray-300`}>
                            <p className=" text-gray-700 dark:text-gray-500">
                              {order.dateTime}
                            </p>
                          </td>
  
                          <td className={`whitespace-nowrap px-6 py-3  text-gray-900 dark:text-gray-300`}>
                            <p className="">{order.items.reduce((totalItem, item) => totalItem + Number(item.qty), 0)} </p>
                          </td>
                          <td className={`whitespace-nowrap px-6 py-3 font-semibold  text-gray-900 dark:text-gray-300`}>
                            <p className="">₱ {Number(order.total).toFixed(2)} </p>
                          </td>
  
                          <td className={`whitespace-nowrap px-6 py-3 text-gray-900 dark:text-gray-300 `}>
                            {order.barista}
                          </td>
                        </tr>
                      ))}
                    </tbody>
  
  
                  </table>
                </div>
                <div className="pt-8 bg-gray-200 rounded-b"></div>
              </div>
  
              <div className="h-96 mt-20 lg:mt-0 min-w-full rounded bg-white">
                <h1 className="py-4 px-6 text-sm font-medium text-gray-700 ">Item Status</h1>
                <div className="overflow-x-auto h-full bg-white min-w-full shadow-sm ">
                  <table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-700 text-sm leading-normal">
                    <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                      <tr className="sticky">
                        {columnsItems.map((column, index) => (
                          <th key={index} className={`mx-auto text-start px-6 py-2 bg-[#F1F1F1] dark:bg-gray-700  text-xs font-normal text-gray-500 dark:text-gray-400 uppercase tracking-wider`}>
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y dark:bg-slate-800  divide-gray-200 dark:divide-gray-700 ">
  
                      {items.map((item, idx) => (
  
                        <tr key={idx} className=" dark:hover:bg-[#151e30] ">
  
                          <td
                            className={`sm:flex gap-4 whitespace-nowrap px-6 py-3 font-medium text-gray-900 dark:text-gray-300`}
                          >
                            <div className="flex flex-col text-left">
                              <h1 className="font-medium">{item.name} </h1>
                            </div>
                          </td>
  
                          <td className={`whitespace-pre-wrap px-6 py-3 text-gray-900 dark:text-gray-300`}>
                            <p className=" text-gray-700 dark:text-gray-500">
                              {item.qty}
                            </p>
                          </td>
  
                          <td className={`whitespace-nowrap font-medium flex justify-center  text-gray-600 dark:text-gray-500 `}>
                            <span
                              className={` ${item.status === "In Stock"
                                ? "bg-green-200 text-green-900 font-semibold dark:bg-green-900 dark:text-green-200"
                                : "bg-red-200 text-red-900 font-semibold dark:bg-red-900 dark:text-red-200"
                                }  inline-flex items-center justify-center px-3 py-1 text-[11px] font-normal leading-none  rounded-full`}
                            >
                              {item.status === "In Stock" ? "In Stock" : "Out of Stock"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pt-8 bg-gray-200 rounded-b"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  

  return content;
};

export default Welcome;
