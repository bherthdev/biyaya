import React, { useContext, useEffect, useState } from 'react'
import { useGetItemsQuery } from '../items/itemsApiSlice';
import PageLoader from "../../components/PageLoader";
import MenuItem from './MenuItem';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineShoppingCart } from 'react-icons/md';
import PageError from '../../components/PageError';
import { POSContext } from '../../context/POSContext';
import { ToastContainer } from 'react-toastify';
import { IoIosArrowForward } from 'react-icons/io';

const POS = () => {

    const { headSearch, setHeadSearch,
        orderTransac, toggleCart, setToggleCart,
    } = useContext(POSContext);

    const [search, setsearch] = useState("All");

    const itemCategories = ["All", "Coffee", "Non Coffee", "Food", "Other"]

    const {
        data: items,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetItemsQuery("itemsList", {
        pollingInterval: 15000, // refresh data every 15 seconds
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        headSearch && setsearch('All')

    }, [headSearch])

    const onCategorySearch = (category) => {
        setsearch(category)
        setHeadSearch('')
    }


    let content;


    if (isLoading) content = <PageLoader />

    if (isError) {
        content = <PageError error={error?.data?.message} />
    }



    if (isSuccess) {
        const { ids } = items;

        const menuContent = ids?.length && ids.map((itemId) => <MenuItem key={itemId} itemId={itemId} search={search} />)

        content = (
            <>
                <div aria-label="Page Header" className='mb-20 no-print'>
                    <aside
                    onClick={()=> setToggleCart(true)}
                        className={`fixed bottom-5 end-5 hover:p-7 ease-in-out duration-300  z-30 flex items-center justify-center  rounded-full bg-white p-5  cursor-pointer border shadow-2xl`}
                    >
                        <div className='relative text-black '>
                            <div className='absolute flex px-2 py-1 rounded-full bg-[#242424] -top-5 -right-4 z-10'>
                                <h1 className='text-white text-xs text-center'>
                                    {orderTransac.items?.reduce((total, item) => total + item.qty, 0)}
                                </h1>

                            </div>
                            <MdOutlineShoppingCart size={25}/>
                        </div>

                    </aside>

                    <div className='z-20 sticky  top-[79px] sm:top-32  bg-white sm:bg-[#f1f1f1] border-b'>
                        <div className='flex flex-col px-6 lg:px-12 pt-5 pb-2'>
                            <div className='flex justify-between gap-2 items-center'>
                                <h1 className="text-md font-medium  text-gray-700 sm:text-2xl dark:text-gray-200">
                                    {search ? search : 'All'} Menu
                                </h1>
                                <div className="relative block">
                                    <label className="sr-only" htmlFor="search">
                                        {" "}
                                        Search{" "}
                                    </label>
                                    <button
                                        type="button"
                                        className="absolute top-1/2 left-1 -translate-y-1/2 rounded-full  dark:bg-slate-900 p-2 text-gray-400 transition hover:text-gray-700"
                                    >
                                        <span className="sr-only">Submit Search</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
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
                                    </button>
                                    <input
                                        className="h-10 w-32 border border-gray-100 dark:text-gray-300 rounded-full bg-[#f1f1f1]  sm:bg-white dark:bg-slate-800 pl-11 pr-2 text-sm  sm:w-56"
                                        id="search"
                                        type="search"
                                        placeholder="Search..."
                                        value={headSearch}
                                        onChange={(e) => setHeadSearch(e.target.value)}
                                    />
                                </div>

                            </div>

                            <div className='grid grid-cols-1 min-w-full'>
                                <div className='flex whitespace-nowrap overflow-y-auto py-3 gap-3 text-xs sm:text-lg'>
                                    {itemCategories.map((category, idx) => (
                                        <div
                                            key={idx}
                                            title={category}
                                            onClick={() => onCategorySearch(category)}
                                            className={`${search === category ? 'bg-[#242424] text-white active:bg-black' : 'active:bg-white text-black hover:shadow'} flex justify-center items-center px-6 sm:px-8 py-2 cursor-pointer  border  border-gray-300 rounded-full`} >
                                            {category}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto max-w-screen-xl mt-4 sm:mt-6 px-8 sm:px-10">
                        <div className="font-normal grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-4 2xl:gap-8 ">
                            {menuContent}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return content
}

export default POS