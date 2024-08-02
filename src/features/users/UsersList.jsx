
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import Thead from "../../components/Thead";
import Tbody from "../../components/Tbody";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageLoader from "../../components/PageLoader";
import { AiOutlineUserAdd } from 'react-icons/ai';
import { IoMdAdd } from "react-icons/io";

const UsersList = () => {

  const [search, setsearch] = useState("");
  const columnsArray = ["NAME", "POSITION", "STATUS", "ROLES"];



  const navigate = useNavigate();
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 20000, // refresh data every 15 seconds
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });



  let content;

  if (isLoading) content = <PageLoader />

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }


  const handleSearch = (text) => {
    setsearch(text);
  };


  if (isSuccess) {
    const { ids } = users;
    const tableContent = ids?.length && ids.map((userId) => <User key={userId} userId={userId} search={search} />)


    content = (
      <>

        <div className="mx-auto h-screen max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex justify-between">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold  text-gray-500  dark:text-gray-400">
                Manage User
              </h1>
              <span
                onClick={() => navigate("/dash/users/new")}
                title='Add Employee'
                className="ml-4 block sm:hidden cursor-pointer text-sm px-3 py-2 text-white border dark:text-gray-300 font-medium border-gray-200 dark:border-slate-600 bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-md duration-150"
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
                  onClick={() => navigate("/dashboard/users/new")}
                  title='Add New Item'
                  className="hidden sm:flex items-center cursor-pointer  px-8 py-3 text-black border dark:text-gray-300 font-medium border-gray-300 dark:border-slate-600  hover:bg-white dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150"
                >
                  <IoMdAdd size={19} />
                  Add Item
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 text-sm font-medium text-gray-500">
              {/* <div className="flex">
                <div className="flex justify-center items-center w-32 h-12 px-10 py-2 rounded-t-lg bg-white">
                  <div>USERS</div>
                </div>
                <div className="w-40 h-12 px-10 py-2 border rounded-t-lg bg-gray-100">
                  <div>CATEGORIES</div>
                </div>
              </div> */}

              <div className="w-full bg-white h-5 rounded-t-lg">


              </div>
            </div>
          <div className="overflow-x-auto bg-white min-w-full shadow-sm rounded-b-lg ">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm leading-normal">
              <thead className="bg-gray-50 dark:bg-gray-800 ">
                <tr>
                  {columnsArray.map((column, index) => (
                    <Thead thName={column} key={index} />
                  ))}
                  <Thead thName="" />
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
export default UsersList;
