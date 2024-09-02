
import { useGetOrdersQuery } from "./ordersApiSlice";
import Order from "./Order";
import Thead from "../../components/Thead";
import Tbody from "../../components/Tbody";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageLoader from "../../components/PageLoader";
import ReceiptModal from "../../components/ReceiptModal"
import { MdErrorOutline } from "react-icons/md";
import { ImFilesEmpty } from "react-icons/im";



const OrdersList = () => {
  
  const [search, setsearch] = useState("");
  const columnsArray = ["ORDER#/TYPE", "DATE/TIME", "NO. OF ITEMS", "TOTAL", "BARISTA"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOderID] = useState('');
  const [backDateOrder, setBackDateOrder] = useState(false);

  const handleModalOpen = (id, isBackDate) => {
    setOderID(id)
    setBackDateOrder(isBackDate)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }



  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery("ordersList", {
    pollingInterval: 10000, // refresh data every 15 seconds
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;


  if (isLoading) content = <PageLoader />

  if (isError) {
    content = (
      <div className="no-print mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex justify-between">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold  text-gray-500  dark:text-gray-400">
              Order List
            </h1>
          </div>

          <div className="sm:flex  mt-6 sm:mt-0">
            <div className="">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none shrink-0">
                  <svg
                    className="w-4 h-4  text-gray-500 dark:text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    // className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="w-full pl-10 p-2 block py-4 px-6 text-sm font-normal bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700 outline-none focus:border-gray-300  focus:shadow-sm rounded-xl"
                  placeholder="Search..."
                  value={search}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-5">
          <div className="h-[400px] 2xl:h-[500px] min-w-full rounded bg-white col-span-1 lg:col-span-2">
            <div className="h-5 bg-white mt-5 rounded-t-lg"></div>
            <div className="overflow-x-auto h-full bg-white min-w-full shadow-sm ">
              <table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-700 text-sm leading-normal">
                <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                  <tr className="sticky">
                    {columnsArray.map((column, index) => (
                      <Thead thName={column} key={index} />
                    ))}
                  </tr>
                </thead>
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
            <div className="pt-10 bg-gray-50 rounded-b"></div>
          </div>
        </div>

      </div>
    )
    // <PageError error={error?.data?.message} />
  }


  const handleSearch = (text) => {
    setsearch(text);
  };

  if (isSuccess) {
    const { ids, entities: ordersEntities } = orders;


    const tableContent = ids?.length && ids.map((orderId) => <Order key={orderId} orderId={orderId} search={search} handleModalOpen={handleModalOpen} />)
    const checkOrders = Object.values(ordersEntities).sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))


    content = (
      <>
        <ReceiptModal isOpen={isModalOpen} onClose={handleModalClose} orderId={orderId} backDateOrder={backDateOrder} />

        <div className="no-print mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex justify-between">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold  text-gray-500  dark:text-gray-400">
                Order List
              </h1>
              {/* <span
                onClick={() => navigate("/dashboard/items/new")}
                title='Add Item'
                className="block sm:hidden items-center cursor-pointer  px-8 py-3 text-black border dark:text-gray-300 font-medium border-gray-300 dark:border-slate-600  hover:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150"
              >
                <AiOutlineUserAdd size={20} />
              </span> */}
            </div>

            <div className="sm:flex  mt-6 sm:mt-0">
              <div className="">
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none shrink-0">
                    <svg
                      className="w-4 h-4  text-gray-500 dark:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      // className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    className="w-full pl-10 p-2 block py-4 px-6 text-sm font-normal bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700 outline-none focus:border-gray-300  focus:shadow-sm rounded-xl"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-5">
            <div className="h-[400px] 2xl:h-[500px] min-w-full rounded bg-white col-span-1 lg:col-span-2">
              <div className="h-5 bg-white mt-5 rounded-t-lg"></div>
              <div className="overflow-x-auto h-full bg-white min-w-full shadow-sm ">
                <table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-700 text-sm leading-normal">
                  <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                    <tr className="sticky">
                      {columnsArray.map((column, index) => (
                        <Thead thName={column} key={index} />
                      ))}
                    </tr>
                  </thead>
                  {checkOrders.length !== 0
                    && <Tbody tbName={tableContent} />
                  }
                </table>
                {checkOrders.length === 0
                  && <div className="flex text-sm flex-col p-5 gap-3  dark:bg-gray-900 text-gray-400 dark:text-gray-400">
                    <div className="flex flex-col  m-auto ">
                      <div className="m-auto">
                        <ImFilesEmpty size={30} />
                      </div>
                    </div>
                    <div className='m-auto '>No orders</div>
                  </div>
                }
              </div>
              <div className="pt-10 bg-gray-50 rounded-b"></div>
            </div>
          </div>

        </div>


      </>
    );
  }

  return content;
};
export default OrdersList;
