/* eslint-disable jsx-a11y/anchor-is-valid */
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { PiMoneyLight, PiReceiptLight } from "react-icons/pi";
import { useGetOrdersQuery } from "../orders/ordersApiSlice";
import { useGetItemsQuery } from "../items/itemsApiSlice";
import Spenner from "../../components/Spenner";
import { MdErrorOutline } from "react-icons/md";
import ReceiptModal from "../../components/ReceiptModal"

const Welcome = () => {

  const columnsOrders = ["Order#/Type", "Date/Time", "ITEMS", "Amount", "Barista"];
  const columnsItems = ["Item Name", "Stock"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOderID] = useState('');

  const handleModalOpen = (id) => {
    setOderID(id)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const {
    data: ordersData,
    isLoading: isLoadingOrders,
    isSuccess: isOrdersSuccess,
    isError: isOrdersError,
    error: ordersError,
  } = useGetOrdersQuery("ordersList", {
    pollingInterval: 10000, // refresh data every 10 seconds
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: itemsData,
    isLoading: isLoadingItems,
    isSuccess: isItemsSuccess,
    isError: isItemsError,
    error: itemsError,
  } = useGetItemsQuery("itemsList", {
    pollingInterval: 10000, // refresh data every 10 seconds
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });


  // Combined loading state
  const isLoading = isLoadingOrders || isLoadingItems;

  // Combined success state
  const isSuccess = isOrdersSuccess && isItemsSuccess;

  // Combined error state
  const isError = isOrdersError || isItemsError;
  const error = ordersError || itemsError;

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

  if (isLoading) {
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

                <article className="rounded-lg animate-pulse bg-gray-200 border border-gray-100  p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className=" bg-gray-300 animate-pulse w-20 h-3 rounded-full"> </p>
                      <p className="bg-gray-300 animate-pulse h-7 w-28 rounded-full mt-2"></p>
                    </div>
                    <span className="rounded-full bg-gray-300 p-3 h-12 w-12">
                    </span>
                  </div>
                </article>
                <article className="rounded-lg animate-pulse bg-gray-200 border border-gray-100  p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className=" bg-gray-300 animate-pulse w-20 h-3 rounded-full"> </p>
                      <p className="bg-gray-300 animate-pulse h-7 w-28 rounded-full mt-2"></p>
                    </div>
                    <span className="rounded-full bg-gray-300 p-3 h-12 w-12">
                    </span>
                  </div>
                </article>
                <article className="rounded-lg animate-pulse bg-gray-200 border border-gray-100  p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className=" bg-gray-300 animate-pulse w-20 h-3 rounded-full"> </p>
                      <p className="bg-gray-300 animate-pulse h-7 w-28 rounded-full mt-2"></p>
                    </div>
                    <span className="rounded-full bg-gray-300 p-3 h-12 w-12">
                    </span>
                  </div>
                </article>
                <article className="rounded-lg animate-pulse bg-gray-200 border border-gray-100  p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className=" bg-gray-300 animate-pulse w-20 h-3 rounded-full"> </p>
                      <p className="bg-gray-300 animate-pulse h-7 w-28 rounded-full mt-2"></p>
                    </div>
                    <span className="rounded-full bg-gray-300 p-3 h-12 w-12">
                    </span>
                  </div>
                </article>

              </dl>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
              <div className="bg-gray-200 animate-pulse flex flex-col h-96 min-w-full rounded col-span-1 lg:col-span-2">
                <h1 className="bg-gray-300 animate-pulse my-4 ml-6 rounded-full w-16 py-4  text-sm font-medium text-gray-700 "></h1>
                <div className=" bg-gray-300 animate-pulse border border-gray-300 h-5  min-w-full "></div>
                <div className=" border border-gray-300  bg-gray-200 animate-pulse  min-w-full flex justify-between">
                  <div className="flex flex-col justify-center gap-2 px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                    <div className="bg-gray-300 rounded-full h-5 w-20"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                </div>
                <div className=" border border-gray-300  bg-gray-200 animate-pulse  min-w-full flex justify-between">
                  <div className="flex flex-col justify-center gap-2 px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                    <div className="bg-gray-300 rounded-full h-5 w-20"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                </div>
                <div className=" border border-gray-300  bg-gray-200 animate-pulse  min-w-full flex justify-between">
                  <div className="flex flex-col justify-center gap-2 px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                    <div className="bg-gray-300 rounded-full h-5 w-20"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-200 animate-pulse flex flex-col h-96 min-w-full rounded col-span-1 ">
                <h1 className="bg-gray-300 animate-pulse my-4 ml-6 rounded-full w-16 py-4  text-sm font-medium text-gray-700 "></h1>
                <div className=" bg-gray-300 animate-pulse border border-gray-300 h-5  min-w-full "></div>

                <div className=" border border-gray-300  bg-gray-200 animate-pulse  min-w-full flex justify-between">
                  <div className="flex flex-col justify-center gap-2 px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                    <div className="bg-gray-300 rounded-full h-5 w-20"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                </div>
                <div className=" border border-gray-300  bg-gray-200 animate-pulse  min-w-full flex justify-between">
                  <div className="flex flex-col justify-center gap-2 px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                    <div className="bg-gray-300 rounded-full h-5 w-20"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                </div>
                <div className=" border border-gray-300  bg-gray-200 animate-pulse  min-w-full flex justify-between">
                  <div className="flex flex-col justify-center gap-2 px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                    <div className="bg-gray-300 rounded-full h-5 w-20"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-5 py-3">
                    <div className="bg-gray-300 rounded-full h-8 w-16"> </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    content = (
      <div aria-label="Page Header" className="">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mt-2">
            <p className="text-xl font-bold text-gray-700 sm:text-2xl dark:text-gray-200">
              Welcome Back, {name}!
            </p>

            <p className="mt-1.5 text-sm text-gray-500">
              {`Today is  ${dateToday} - ${time} `}
            </p>
            <div className="mx-auto max-w-screen-xl  py-3  md:py-5">
              <dl className="font-normal grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <article className="rounded-lg border border-gray-100 bg-white p-6">
                  <div className="flex  text-sm flex-col gap-3  dark:bg-gray-900 text-red-700 dark:text-gray-400">
                    <div className="flex flex-col  m-auto ">
                      <div className="m-auto">
                        <MdErrorOutline size={30} />
                      </div>
                    </div>
                    <div className='m-auto  text-center'>{error?.data?.message}</div>
                  </div>
                </article>
                <article className="rounded-lg border border-gray-100 bg-white p-6">
                  <div className="flex  text-sm flex-col gap-3  dark:bg-gray-900 text-red-700 dark:text-gray-400">
                    <div className="flex flex-col  m-auto ">
                      <div className="m-auto">
                        <MdErrorOutline size={30} />
                      </div>
                    </div>
                    <div className='m-auto text-center'>{error?.data?.message}</div>
                  </div>
                </article>
                <article className="rounded-lg border border-gray-100 bg-white p-6">
                  <div className="flex  text-sm flex-col gap-3  dark:bg-gray-900 text-red-700 dark:text-gray-400">
                    <div className="flex flex-col  m-auto ">
                      <div className="m-auto">
                        <MdErrorOutline size={30} />
                      </div>
                    </div>
                    <div className='m-auto text-center'>{error?.data?.message}</div>
                  </div>
                </article>
                <article className="rounded-lg border border-gray-100 bg-white p-6">
                  <div className="flex  text-sm flex-col gap-3  dark:bg-gray-900 text-red-700 dark:text-gray-400">
                    <div className="flex flex-col  m-auto ">
                      <div className="m-auto">
                        <MdErrorOutline size={30} />
                      </div>
                    </div>
                    <div className='m-auto text-center'>{error?.data?.message}</div>

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
                    </tbody>
                  </table>
                  <div className="flex text-sm flex-col p-5 gap-3  dark:bg-gray-900 text-red-700 dark:text-gray-400">
                    <div className="flex flex-col  m-auto ">
                      <div className="m-auto">
                        <MdErrorOutline size={30} />
                      </div>
                    </div>
                    <div className='m-auto'>{error?.data?.message}</div>
                  </div>
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
                    </tbody>
                  </table>
                  <div className="flex text-sm flex-col p-5 gap-3  dark:bg-gray-900 text-red-700 dark:text-gray-400">
                    <div className="flex flex-col  m-auto ">
                      <div className="m-auto">
                        <MdErrorOutline size={30} />
                      </div>
                    </div>
                    <div className='m-auto '>{error?.data?.message}</div>
                  </div>
                </div>
                <div className="pt-8 bg-gray-200 rounded-b"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {

    const { entities: ordersEntities } = ordersData;
    const { entities: itemsEntities } = itemsData;

    // Sort items by status
    const items = Object.values(itemsEntities).sort((a, b) => {
      const statusOrder = {
        "In Stock": 2,
        "Out of Stock": 1,
      }
      return statusOrder[a.status] - statusOrder[b.status]
    }
    )

    // Sort orders by recent or current date
    const orders = Object.values(ordersEntities).sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))


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

    // const totalQty = orders.reduce((total, order) => {
    //   const orderQty = order.items.reduce((sum, item) => sum + Number(item.qty), 0);
    //   return total + orderQty;
    // }, 0);

    const totalSales = orders.reduce((total, order) => total + Number(order.total), 0);



    content = (
      <div aria-label="Page Header" className="">
        <ReceiptModal isOpen={isModalOpen} onClose={handleModalClose} orderId={orderId} />

        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 no-print">
          <div className="mt-2">
            <div className="flex justify-between">
              <div>
                <p className="text-xl font-bold text-gray-700 sm:text-2xl dark:text-gray-200">
                  Welcome Back, {name}!
                </p>
                <p className="mt-1.5 text-sm text-gray-500">
                  {`Today is  ${dateToday} - ${time} `}
                </p>
              </div>
              {/* <div
                className="flex  items-center  rounded-lg bg-gray-50 dark:bg-slate-800 p-4 text-gray-800 dark:text-gray-300 hover:text-gray-700"
              >
                <span className="sr-only">Notifications</span>
                <RxActivityLog />

              </div> */}
            </div>
            <div className="mx-auto max-w-screen-xl  py-3  md:py-5">
              <dl className="font-normal grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                <article className="rounded-lg border border-gray-100 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Sales</p>

                      <p className="text-2xl font-medium text-gray-900">₱{Number(totalSales).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                    </div>

                    <span className="rounded-xl bg-green-100 p-3 text-green-600">
                      <PiMoneyLight size={25} className="text-green-600 dark:text-gray-500" />
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
                      <p className="text-sm text-gray-500">  Total Orders </p>

                      <p className="text-2xl font-medium text-gray-900">{orders.length}</p>
                    </div>

                    <span className="rounded-xl bg-gray-100 p-3 text-green-600">
                      <PiReceiptLight size={25} className="text-gray-500 dark:text-gray-500" />
                    </span>
                  </div>
                </article>

                <article className="rounded-lg border border-gray-100 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500"> Sales Today</p>

                      <p className="text-2xl font-medium text-gray-900">₱{Number(salesToday()).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                    </div>

                    <span className="rounded-xl bg-orange-100 p-3 text-orange-600">
                      <PiMoneyLight   size={25} className="text-orange-500 dark:text-gray-500" />

                    </span>
                  </div>
                  <div className="mt-1 flex gap-1 text-green-600">
                    <p className="flex gap-2 text-xs">
                      <span className="text-gray-500">  *Updated every order success </span>
                    </p>
                  </div>
                </article>

                <article className=" rounded-lg border border-gray-100 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">  Orders Today </p>

                      <p className="text-2xl font-medium text-gray-900"> {ordersToday()}</p>
                    </div>

                    <span className="rounded-xl bg-gray-100 p-3 text-green-600">
                      <PiReceiptLight size={25} className="text-gray-500 dark:text-gray-500" />
                    </span>
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
                        <tr key={idx} onClick={(() => handleModalOpen(order.id))} className="hover:bg-gray-100 cursor-pointer dark:hover:bg-[#151e30] ">

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
                <div className="pt-8 bg-gray-50 rounded-b"></div>
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

                      {items.length
                        ? items.map((item, idx) => (

                          <tr key={idx} className=" dark:hover:bg-[#151e30] ">

                            <td
                              className={`sm:flex gap-4 whitespace-nowrap px-6 py-3 font-medium text-gray-900 dark:text-gray-300`}
                            >
                              <div className="flex flex-col text-left">
                                <h1 className="font-medium">{item.name} </h1>
                              </div>
                            </td>



                            <td className={`whitespace-nowrap  font-medium  px-6 py-3  text-gray-600 dark:text-gray-500 `}>
                              <div className="flex gap-1 justify-start text-xs font-semibold ">
                                <div
                                  className={` ${item.status === "In Stock"
                                    ? " text-green-600  "
                                    : " text-red-600  "
                                    }  inline-flex items-center justify-center leading-none  rounded-full`}
                                >
                                  {item.status === "In Stock" ? "In Stock" : "Out of Stock"}
                                </div>
                                <span className="text-xs font-normal flex items-center">
                                  {item.stock_mgt && `(${item.qty})`}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))
                        : <div className="flex  p-5  dark:bg-gray-900 text-gray-700 dark:text-gray-400">
                          <div className="flex space-x-2">
                            <Spenner />
                            <div className='m-auto'>Getting items...</div>
                          </div>
                        </div>
                      }


                    </tbody>
                  </table>
                </div>
                <div className="pt-8 bg-gray-50 rounded-b"></div>
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
