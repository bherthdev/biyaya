
import { useGetItemsQuery } from "./itemsApiSlice";
import Item from "./Item";
import Thead from "../../components/Thead";
import Tbody from "../../components/Tbody";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageLoader from "../../components/PageLoader";
import { AiOutlineUserAdd } from 'react-icons/ai';
import { IoMdAdd } from "react-icons/io";


const ItemsList = () => {

  const [search, setsearch] = useState("");
  const columnsArray = ["ITEM NAME", "DESCRIPTION", "QTY", "PRICE", "CATEGORY", "STATUS"];


  const navigate = useNavigate();
  const {
    data: items,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetItemsQuery("itemsList", {
    pollingInterval: 10000, // refresh data every 15 seconds
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;


  if (isLoading) content = <PageLoader />

  if (isError) {
    // content = <p className="text-red-600">{error?.data?.message}</p>;

    content = (
      <div className="mx-auto h-screen max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex justify-between">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold text-gray-500  dark:text-gray-400">
              Item List
            </h1>
            <span
              onClick={() => navigate("/dashboard/items/new")}
              title='Add Items'
              className="hidden sm:flex items-center cursor-pointer  px-8 py-3 text-black border dark:text-gray-300 font-medium border-gray-300 dark:border-slate-600  hover:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150"
            >
              <AiOutlineUserAdd size={20} />
            </span>
          </div>

          <div className="sm:flex  mt-6 sm:mt-0">
            <div className="pr-0 sm:pr-4 ">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none shrink-0">
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
                  className="w-full pl-10 p-2 block py-4 px-3 text-sm font-normal bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700 outline-none focus:border-gray-300  focus:shadow-sm rounded-lg"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex">
              <span
                onClick={() => navigate("/dashboard/items/new")}
                title='Add New Item'
                className="hidden sm:flex items-center cursor-pointer  px-8 py-3 text-black border dark:text-gray-300 font-medium border-gray-300 dark:border-slate-600  hover:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150"
              >
                <IoMdAdd size={19} />
                Add Item
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-5 bg-white min-w-full shadow-sm rounded-lg ">
          <table className="min-w-full mt-5 divide-y divide-gray-200 dark:divide-gray-700 text-sm leading-normal">
            <thead className="bg-gray-50 dark:bg-gray-800 ">
              <tr>
                {columnsArray.map((column, index) => (
                  <Thead thName={column} key={index} />
                ))}
              </tr>
            </thead>
          </table>
          <div className="p-10 flex justify-center">
            <p className="text-red-600">{error?.data?.message}</p>
          </div>
        </div>
      </div>
    )
  }


  const handleSearch = (text) => {
    setsearch(text);
  };

  if (isSuccess) {
    const { ids } = items;
    const tableContent = ids?.length && ids.map((itemId) => <Item key={itemId} itemId={itemId} search={search} />)

    content = (
      <>

        <div className="mx-auto h-screen max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex justify-between">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold  text-gray-500  dark:text-gray-400">
                Item List
              </h1>
              <span
                onClick={() => navigate("/dashboard/items/new")}
                title='Add Item'
                className="block sm:hidden items-center cursor-pointer  px-8 py-3 text-black border dark:text-gray-300 font-medium border-gray-300 dark:border-slate-600  hover:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150"
              >
                <AiOutlineUserAdd size={20} />
              </span>
            </div>

            <div className="sm:flex  mt-6 sm:mt-0">
              <div className="pr-0 sm:pr-4 ">
                <label htmlFor="table-search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none shrink-0">
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
                    className="w-full pl-10 p-2 block py-4 px-3 text-sm font-normal bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-200 dark:border-gray-800  dark:focus:border-gray-700 outline-none focus:border-gray-300  focus:shadow-sm rounded-lg"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex">
                <span
                  onClick={() => navigate("/dashboard/items/new")}
                  title='Add New Item'
                  className="hidden sm:flex items-center cursor-pointer  px-8 py-3 text-black border dark:text-gray-300 font-medium border-gray-300 dark:border-slate-600  hover:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150"
                >
                  <IoMdAdd size={19} />
                  Add Item
                </span>
              </div>
            </div>
          </div>

          <div className="h-5 bg-white mt-5 rounded-t-lg"></div>
          <div className="overflow-x-auto h-3/4 bg-white min-w-full shadow-sm rounded-lg ">
            <table className="min-w-full  divide-y divide-gray-200 dark:divide-gray-700 text-sm leading-normal">
              <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                <tr className="sticky">
                  {columnsArray.map((column, index) => (
                    <Thead thName={column} key={index} />
                  ))}
                </tr>
              </thead>
              <Tbody tbName={tableContent} />

            </table>
          </div>
        </div>


      </>
    );
  }

  return content;
};
export default ItemsList;
