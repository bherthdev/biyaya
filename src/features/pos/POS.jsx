import React, { useState } from 'react'
import { useGetItemsQuery } from '../items/itemsApiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import PageLoader from "../../components/PageLoader";
import MenuItem from './MenuItem';
import Order from "./Order"
import { Cart } from './Cart';


const POS = () => {

    const { orderTransac, setOrderTransac, orderItems, setOrdersItems } = Order()
    

    const item = {
        id:'',
        name:'',
        desc:'',
        avatar:'',
        qty:'',
        price:''
    }

    const [search, setsearch] = useState("Coffee");

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
        content = <p className="text-red-600">{error?.data?.message}</p>;
    }



    if (isSuccess) {
        const { ids } = items;

        const menuContent = ids?.length && ids.map((itemId) => <MenuItem key={itemId} itemId={itemId} search={search} orderItems={orderItems} setOrderTransac={setOrderTransac}  orderTransac={orderTransac} setOrdersItems={setOrdersItems} />)




        content = (
            <>
                <Cart toggleCart={location.pathname == '/dashboard/pos'} orderTransac={orderTransac} setOrderTransac={setOrderTransac} orderItems={orderItems} setOrdersItems={setOrdersItems}/>

                <div aria-label="Page Header" className="bg-[#F1F1F1] h-full">
                    <div className="mx-auto max-w-screen-xl px-4 h-full py-5 sm:px-6 lg:px-5">
                        <div className="mt-2 ">

                            <div className='flex items-center gap-5'>

                                <button
                                    title="Coffee"
                                    onClick={() => setsearch('Coffee')}
                                    className={`${search === 'Coffee' ? 'bg-[#242424] text-white hover:bg-gray-700' : 'hover:bg-gray-200 text-black'} flex px-7  py-3   border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                                    Coffee
                                </button>
                                <button
                                    title="Non Coffee"
                                    onClick={() => setsearch('Non Coffee')}
                                    className={`${search === 'Non Coffee' ? 'bg-[#242424] text-white hover:bg-gray-700' : 'hover:bg-gray-200 text-black'} flex px-7  py-3   border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                                    Non Coffee
                                </button>
                                <button
                                    title="Food"
                                    onClick={() => setsearch('Food')}
                                    className={`${search === 'Food' ? 'bg-[#242424] text-white hover:bg-gray-700' : 'hover:bg-gray-200 text-black'} flex px-7  py-3   border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                                    Food
                                </button>
                                <button
                                    title="Other"
                                    onClick={() => setsearch('Other')}
                                    className={`${search === 'Other' ? 'bg-[#242424] text-white hover:bg-gray-700' : 'hover:bg-gray-200 text-black'} flex px-7  py-3   border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                                    Other
                                </button>
                            </div>

                            <p className="text-xl mt-10 font-medium  text-gray-700 sm:text-2xl dark:text-gray-200">
                                {search} menu
                            </p>

                            <div className="mx-auto max-w-screen-xl mt-8">
                                <div className="mt-4 sm:mt-4">
                                    <div className="font-normal grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-4 xl:grid-cols-2 xl:gap-8 2xl:grid-cols-4 2xl:gap-8 ">
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