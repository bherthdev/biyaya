import React, { useEffect, useRef, useState } from "react";
import { IoIosClose } from 'react-icons/io';
import { useSelector } from "react-redux";
import { selectOrderById } from "../features/orders/ordersApiSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import biyayaLogo from "../assets/biyaya_logo.png";
import html2pdf from "html2pdf.js";

function Modal({ isOpen, onClose, orderId }) {

  const [printNav, setPrintNav] = useState(false);
  const order = useSelector((state) => selectOrderById(state, orderId));
  const optionRef = useRef();
  const printRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (optionRef.current && !optionRef.current.contains(e.target)) {
        setPrintNav(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleDownloadPDF = () => {
    const element = printRef.current;
    
     // Define custom options
     const opt = {
      margin: 1,
      filename: `Biyaya_Receipt-${order?.orderNo}.pdf`,
      image: { type: 'jpeg', quality: 0.99 },
      html2canvas: { scale: 5 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate and download the PDF with the options
    html2pdf().set(opt).from(element).save();
  };

  const showHideClassName = isOpen ? "block" : "hidden";

  return (
    <div className={`fixed z-50 inset-0 overflow-y-auto ${showHideClassName}`}>
      <div className="flex items-center justify-center h-screen pt-4 px-4 pb-20 text-center  ">

        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-black  dark:bg-gray-900 opacity-80"></div>
        </div>

        <div
          className="inline-block bg-white dark:bg-gray-800 rounded-xl text-center overflow-hidden  transform transition-all  sm:my-8 align-middle  w-full sm:w-8/12 lg:w-4/12"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >

          <div className="flex justify-between border-b-2  no-print">
            <div className="flex py-2 px-4 items-center ">
              <h1 className=" text-gray-700 text-lg uppercase font-medium">Receipt</h1>
              <div
                className="relative text-gray-400 p-1 cursor-pointer hover:text-gray-600"
                ref={optionRef}
                onClick={() => setPrintNav(prev => !prev)}
              >

                <BsThreeDotsVertical />
                {printNav &&
                  <div className="absolute left-[-6px] z-50 origin-top-right bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 mt-2 w-48 rounded-md shadow-lg">
                    <div className="block top-[-7px] bg-white h-3 w-3 border-t border-l rotate-45 absolute left-3"></div>

                    <div className="py-2">
                      <span
                        onClick={() => window.print()}
                        className="cursor-pointer block text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-400"
                      >
                        Print                       </span>
                      <span
                        onClick={handleDownloadPDF}
                        className="cursor-pointer block text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-400"
                      >
                        Download as PDF
                      </span>
                    </div>

                  </div>
                }

              </div>
            </div>
            <button onClick={onClose} className=" w-12 h-12 m-0 p-1 text-gray-300 hover:text-gray-600 dark:text-gray-500 hover:dark:text-gray-400 ">
              <IoIosClose size={35} />
            </button>
          </div>

          {/* {children} */}

          <div ref={printRef} id="print-area" className="bg-white  dark:bg-gray-700 py-10 px-7">
            <div  className="flex flex-col justify-between gap-7">

              <div className="flex flex-col gap-5 border-dashed border-gray-500 border-b pb-5">

                <div className="flex justify-between pb-5 items-center text-left border-dashed border-b border-gray-500">

                  <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                    <img src={biyayaLogo} alt="Logo" className="w-20 " />
                    <div className="font-normal text-xs">
                      <div className="mb-2">
                        <p className="text-[10px] tracking-wider">ORDER NO.</p>
                        <h2 className="text-black ">{order?.orderNo}</h2>
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="text-[10px] tracking-wider">BARISTA</p>
                        <h2 className="text-black ">{order?.barista}</h2>
                      </div>

                    </div>

                  </div>

                  <div className="text-right w-24 text-xs text-gray-500 dark:text-gray-400">

                    <div className="mb-2">
                      <p className="text-[10px] tracking-wider">DATE/TIME</p>
                      <h2 className="text-black ">{order?.dateTime}</h2>
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="text-[10px] tracking-wider">ORDER TYPE</p>
                      <h2 className="text-black ">{order?.orderType}</h2>
                    </div>
                  </div>

                </div>
                <div className="flex flex-col justify-between gap-2 ">
                  <div className=" mb-5">
                    <dl className=" divide-gray-100 text-xs ">
                      <div className="grid  gap-1 grid-cols-4 sm:gap-4 ">
                        <dt className=" text-gray-900 text-left ">Name</dt>
                        <dd className="text-gray-700  text-right">Qty</dd>
                        <dd className="text-gray-700  text-right">Price</dd>
                        <dd className="text-gray-700  text-right ">Sub Total</dd>
                      </div>
                    </dl>
                  </div>
                  {order && order.items.map((item, idx) =>
                    <div key={idx} className="text-sm ">

                      <dl className=" divide-gray-100 text-sm ">
                        <div className="grid  gap-1 grid-cols-4 sm:gap-4 ">
                          <dt className="font-medium text-gray-900 text-left ">{item.name}</dt>
                          <dd className="text-gray-700  text-right">{item.qty}</dd>
                          <dd className="text-gray-700  text-right">₱ {Number(item.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</dd>
                          <dd className="text-gray-700 font-medium text-right ">₱ {Number(item.total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</dd>
                        </div>

                      </dl>
                    </div>
                  )}
                </div>
              </div>
              <div>

                <div className=" text-left text-base flex flex-col gap-2  ">
                  <div className="flex justify-between">
                    <h1 className="font-bold text-lg text-gray-800">Grand Total</h1>
                    <h1 className="font-bold text-lg text-gray-800 "> ₱ {Number(order?.total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className="font-semibold text-gray-500 ">Cash</h1>
                    <h1 className="font-semibold text-gray-600 "> ₱ {Number(order?.cash).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h1>
                  </div>
                  <div className="flex justify-between">
                    <h1 className=" text-gray-500 ">Change</h1>
                    <h1 className="font-semibold text-gray-600 "> ₱ {Number(order?.change).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</h1>
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
