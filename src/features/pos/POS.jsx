import React, { useContext, useState } from 'react'
import { useGetItemsQuery } from '../items/itemsApiSlice';
import { useNavigate } from 'react-router-dom';
import PageLoader from "../../components/PageLoader";
import MenuItem from './MenuItem';
import { Cart } from './Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineShoppingCart } from 'react-icons/md';
import PageError from '../../components/PageError';
import { POSContext } from '../../context/POSContext';

const POS = () => {
    
    const { orderTransac } = useContext(POSContext);

    const [toggleCartMobile, setToggleCartMobile] = useState(false)
    const [enableSaveOrder, setEnableSaveOrder] = useState(false)
    const [placeOrder, setPlaceOrder] = useState(false)

    const [search, setsearch] = useState("Coffee");
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


    let content;


    if (isLoading) content = <PageLoader />

    if (isError) {
        content = <PageError error={error?.data?.message}/>
    }



    if (isSuccess) {
        const { ids } = items;

        const menuContent = ids?.length && ids.map((itemId) => <MenuItem key={itemId} itemId={itemId} search={search} enableSaveOrder={enableSaveOrder} setEnableSaveOrder={setEnableSaveOrder}  setPlaceOrder={setPlaceOrder}  />)

        content = (
            <>
                <div>
                    <ToastContainer />
                    <Cart toggleCart={location.pathname == '/pos'}  toggleCartMobile={toggleCartMobile} setToggleCartMobile={setToggleCartMobile} enableSaveOrder={enableSaveOrder} setEnableSaveOrder={setEnableSaveOrder} placeOrder={placeOrder} setPlaceOrder={setPlaceOrder} />
                </div>
                <div aria-label="Page Header" className="">
                    <div className="mx-auto max-w-screen-xl px-0 py-8 sm:px-6 lg:px-8">
                        <div className=" sm:mt-2 ">
                            <div className='fixed z-20 mx-auto max-w-screen-xl border sm:border-transparent px-4 sm:px-0 flex-row sm:flex-col sm:flex top-20 sm:top-32  sm:bg-[#f1f1f1] bg-white '>
                                <div className='mt-2 sm:mt-10 overflow-auto  grid gap-1 sm:gap-4 grid-cols-4 text-xs sm:text-base  py-5 sm:py-0'>

                                    <button
                                        title="Coffee"
                                        onClick={() => setsearch('Coffee')}
                                        className={`${search === 'Coffee' ? 'bg-[#242424] text-white hover:bg-gray-700' : 'hover:bg-gray-200 text-black'} flex justify-center items-center px-5 sm:px-7 py-1 sm:py-3   border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                                        Coffee
                                    </button>
                                    <button
                                        title="Non Coffee"
                                        onClick={() => setsearch('Non Coffee')}
                                        className={`${search === 'Non Coffee' ? 'bg-[#242424] text-white hover:bg-gray-700' : 'hover:bg-gray-200 text-black'} flex justify-center items-center px-5 sm:px-7 py-1 sm:py-3   border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                                        Non Coffee
                                    </button>
                                    <button
                                        title="Food"
                                        onClick={() => setsearch('Food')}
                                        className={`${search === 'Food' ? 'bg-[#242424] text-white hover:bg-gray-700' : 'hover:bg-gray-200 text-black'} flex justify-center items-center px-5 sm:px-7 py-1 sm:py-3   border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                                        Food
                                    </button>
                                    <button
                                        title="Other"
                                        onClick={() => setsearch('Other')}
                                        className={`${search === 'Other' ? 'bg-[#242424] text-white hover:bg-gray-700' : 'hover:bg-gray-200 text-black'} flex justify-center items-center px-5 sm:px-7 py-1 sm:py-3   border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                                        Other
                                    </button>
                                </div>
                                <div className='flex justify-between items-center mt-2 sm:mt-5 mb-5 '>
                                    <h1 className="text-lg  font-medium  text-gray-700 sm:text-2xl dark:text-gray-200">
                                        {search} menu
                                    </h1>
                                    <div onClick={() => setToggleCartMobile(true)} className='flex sm:hidden justify-between items-center  relative'>
                                        <div className='absolute p-1 w-6 h-6 rounded-full bg-[#242424] top-[-0%] left-[-100%] '>
                                            <h1 className='text-white text-xs text-center '>
                                                {orderTransac.items?.reduce((total, item) => total + item.qty, 0)}
                                            </h1>
                                        </div>

                                        <MdOutlineShoppingCart size={25} className='text-gray-700' />
                                    </div>

                                </div>
                            </div>


                            <div className="mx-auto max-w-screen-xl mt-36 ">
                                <div className="mt-4 sm:mt-4">
                                    <div className="font-normal px-6 sm:px-0 grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-6 2xl:grid-cols-4 2xl:gap-6 ">
                                        {menuContent}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return content
}

export default POS