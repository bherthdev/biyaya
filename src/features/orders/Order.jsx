import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectOrderById } from "./ordersApiSlice";
import { MdEditNote } from 'react-icons/md';
import { SlOptionsVertical } from "react-icons/sl";

const Order = ({ orderId, search }) => {

  // const { username } = useAuth();

  const order = useSelector((state) => selectOrderById(state, orderId));

  const navigate = useNavigate();

  if (order) {


    if (order.orderNo.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
      order.barista.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
      order.dateTime.toLowerCase().indexOf(search.toLowerCase()) > -1
    ) {

      // const handleEdit = () => navigate(`/dashboard/orders/${orderId}`);

      return (
        <tr className=" text-xl dark:hover:bg-[#151e30] ">

          <td
            className={`sm:flex gap-4 whitespace-nowrap px-6 py-6 font-medium text-gray-900 dark:text-gray-300`}
          >
            <div className="flex flex-col text-left">
              <h1 className="font-bold">{order.orderNo} </h1>
              <p className="text-gray-600 text-lg font-normal">{order.orderType} </p>

            </div>


          </td>

          <td className={`whitespace-pre-wrap  px-6 py-6  text-gray-900 dark:text-gray-300`}>
            <p className="text-lg text-gray-700 dark:text-gray-500">
              {order.dateTime}
            </p>
          </td>

          <td className={`whitespace-nowrap px-6 py-6  text-gray-900 dark:text-gray-300`}>
            <p className="">{order.items.reduce((totalItem, item) => totalItem + Number(item.qty), 0)} </p>
          </td>
          <td className={`whitespace-nowrap px-6 py-6 font-bold  text-gray-900 dark:text-gray-300`}>
            <p className="">₱ {Number(order.total).toFixed(2)} </p>
          </td>

          <td className={`whitespace-nowrap px-6 py-6 text-lg  text-gray-900 dark:text-gray-300 `}>
            {order.barista}
          </td>
          <td className={`whitespace-nowrap px-6 py-6 flex flex-col items-end justify-end text-lg  text-gray-900 dark:text-gray-300 `}>
            <span

              title='Receipt'
              className="items-center cursor-pointer  px-8 py-3 text-black border dark:text-gray-300 font-medium border-gray-300 dark:border-slate-600  hover:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150"
            >

              Receipt
            </span>
          </td>
        </tr>
      );
    }



  } else return null;


};
export default Order;
