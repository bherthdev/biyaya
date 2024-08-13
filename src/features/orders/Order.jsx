import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectOrderById } from "./ordersApiSlice";
import { MdEditNote } from 'react-icons/md';
import { SlOptionsVertical } from "react-icons/sl";

const Order = ({ orderId, search, handleModalOpen }) => {

  const order = useSelector((state) => selectOrderById(state, orderId));

  const navigate = useNavigate();

  if (order) {


    if (order.orderNo.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
      order.barista.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
      order.dateTime.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
      order.orderType.toLowerCase().indexOf(search.toLowerCase()) > -1
    ) {

      // const handleEdit = () => navigate(`/dashboard/orders/${orderId}`);

      return (
        <>

          <tr className=" text-lg dark:hover:bg-[#151e30] ">

            <td
              className={`sm:flex gap-4 whitespace-nowrap px-8 py-3 font-medium text-gray-900 dark:text-gray-300`}
            >
              <div className="flex flex-col text-left">
                <h1 className="font-semibold">{order.orderNo} </h1>
                <p className="text-gray-600 text-sm font-normal">{order.orderType} </p>

              </div>


            </td>

            <td className={`whitespace-pre-wrap  px-8 py-3  text-gray-900 dark:text-gray-300`}>
              <p className="text-sm text-gray-700 dark:text-gray-500">
                {order.dateTime}
              </p>
            </td>

            <td className={`whitespace-nowrap px-8 py-3  text-gray-900 dark:text-gray-300`}>
              <p className="">{order.items.reduce((totalItem, item) => totalItem + Number(item.qty), 0)} </p>
            </td>
            <td className={`whitespace-nowrap px-8 py-3 font-semibold  text-gray-900 dark:text-gray-300`}>
              <p className="">₱ {Number(order.total).toFixed(2)} </p>
            </td>

            <td className={`whitespace-nowrap px-8 py-3 text-sm  text-gray-900 dark:text-gray-300 `}>
              {order.barista}
            </td>
            <td className={`whitespace-nowrap px-8 py-3 flex flex-col items-end justify-end text-sm  text-gray-900 dark:text-gray-300 `}>
              <span
                onClick={()=>handleModalOpen(order.id)}
                title='Receipt'
                className="items-center cursor-pointer  px-6 py-2 text-black border dark:text-gray-300 font-medium border-gray-300 dark:border-slate-600  hover:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150"
              >

                Receipt
              </span>
            </td>
          </tr>
        </>
      );
    }



  } else return null;


};
export default Order;
