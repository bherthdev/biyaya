import React from "react";
import { IoIosClose } from 'react-icons/io';
import { useSelector } from "react-redux";
import { selectOrderById } from "../features/orders/ordersApiSlice";

function Modal({ isOpen, onClose, orderId }) {

  const order = useSelector((state) => selectOrderById(state, orderId));


  const showHideClassName = isOpen ? "block" : "hidden";

  return (
    <div className={`fixed z-20 inset-0 overflow-y-auto ${showHideClassName}`}>
      <div className="flex items-center justify-center h-screen pt-4 px-4 pb-20 text-center  ">
     
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-400  dark:bg-gray-900 opacity-80"></div>
        </div>
     
        <div
          className="inline-block bg-white dark:bg-gray-800 rounded-xl text-center overflow-hidden shadow-xl transform transition-all sm:my-8 align-middle  w-10/12 sm:w-4/12"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
         <div className="flex justify-between border-b-2">
          <h1 className="py-2 px-4 text-lg uppercase font-medium">Receipt</h1>
           <button  onClick={onClose} className=" w-12 h-12 m-0 p-1 text-gray-300 hover:text-gray-600 dark:text-gray-500 hover:dark:text-gray-400 ">
           <IoIosClose size={35}/>
           </button>
         </div> 

          {/* {children} */}

          <div className="bg-white dark:bg-gray-700 py-5 px-7">
              <div className="flex flex-col justify-between gap-7">

                <div className="flex flex-col gap-5 border-b-2 pb-10">

                  <div className="flex justify-between text-left">
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="text-[10px] tracking-wider">ORDER NO.</p>
                      <h2 className="text-xs font-bold mb-4">{order?.orderNo}</h2>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="text-[10px] tracking-wider">BARISTA</p>
                      <h2 className="text-xs font-bold ">{order?.barista}</h2>
                    </div>
                    <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                      <p className="">{order?.dateTime}</p>
                      <p className="">{order?.orderType}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-2 ">
                    {order && order.items.map((item, idx) =>
                      <div key={idx} className="text-sm">

                        <dl className=" divide-gray-100 text-sm text-left whitespace-nowrap">
                          <div className="grid  gap-1  sm:grid-cols-5 sm:gap-4 whitespace-nowrap">
                            <dt className="font-medium text-gray-900 ">{item.name}</dt>
                            <dd className="text-gray-700 sm:col-span-2 text-center">{item.qty}</dd>
                            <dd className="text-gray-700 font-semibold sm:col-span-2 text-right">{item.total}</dd>
                          </div>

                        </dl>
                      </div>
                    )}
                  </div>
                </div>
                <div>

                  <div className=" text-left text-xl flex flex-col gap-4  ">
                    <div className="flex justify-between">
                      <h1 className=" text-gray-500 dark:text-gray-300">Total</h1>
                      <h1 className="font-semibold text-gray-600 dark:text-gray-300">{Number(order?.total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h1>
                    </div>
                    <div className="flex justify-between text-2xl">
                      <h1 className="font-semibold text-gray-700 dark:text-gray-300">Cash</h1>
                      <h1 className="font-bold text-gray-800 dark:text-gray-300">{Number(order?.cash).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h1>
                    </div>
                    <div className="flex justify-between">
                      <h1 className=" text-gray-500 dark:text-gray-300">Change</h1>
                      <h1 className="font-semibold text-gray-600 dark:text-gray-300">{Number(order?.change).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/* Footer Button */}
          {/* <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 flex justify-between gap-6">
            <button
              type="button"
              className="flex h-9 w-full justify-center px-3 sm:px-4 py-1 text-slate-700 border dark:text-slate-200 border-slate-300 dark:border-slate-600  hover:bg-gray-200 dark:hover:bg-gray-900 dark:active:bg-slate-800 rounded-md duration-150"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="h-9 w-full flex justify-center items-center rounded-md border border-transparent shadow-sm px-3 sm:px-4 py-1 bg-red-700 text-base text-white hover:bg-red-800"
              onClick={onOk}
            >
              Yes
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Modal;
