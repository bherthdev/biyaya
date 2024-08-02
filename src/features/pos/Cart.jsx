import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import iconItem from "../../assets/icon-item.svg"

export const Cart = ({ toggleCart }) => {



    const [orderCat, setOrderCat] = useState('Dine in')



    const classToggleCart = toggleCart ? ' ease-in-out duration-300 right-0' : ' right-[-100%]  ease-in-out duration-300'

    const content = (
        <>

            <div className={`flex h-full fixed w-80 border ${classToggleCart} z-50 px-4  flex-col justify-start border-e bg-white `}>
                <div className={`py-5 flex flex-col  gap-5`}>
                    <div className="flex justify-between ">
                        <h1 className={`text-3xl text-gray-700`}

                        >
                            Cart
                        </h1>
                        <p className="text-base text-gray-400 font-normal">
                            Order #1234
                        </p>
                    </div>
                    <div className="flex gap-5 text-xs">
                        <button
                            title="Dine in"
                            onClick={() => setOrderCat('Dine in')}
                            className={`${orderCat === 'Dine in' ? 'bg-[#242424] text-white hover:bg-gray-700' : 'hover:bg-gray-200 text-black'} flex px-5  py-2 border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                            Dine in
                        </button>
                        <button
                            title="Dine in"
                            onClick={() => setOrderCat('Take out')}
                            className={`${orderCat === 'Take out' ? 'bg-[#242424] text-white hover:bg-gray-700' : 'hover:bg-gray-200 text-black'} flex px-5  py-2 border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                            Take out
                        </button>
                    </div>
                </div>

                <div className="h-2/3 overflow-x-auto">

                    <div className="flex mt-5  border-b dark:bg-slate-800 pb-3 border-gray-300 dark:border-gray-800 text-center text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400">
                        <div className="text-4xl  font-bold  md:text-5xl   flex flex-col gap-2">
                            <div className='h-36 w-24 object-cover'>
                                <img
                                    alt="Man"
                                    src={iconItem}
                                    className="h-36 w-24 rounded-3xl  dark:border-slate-600 object-cover"
                                />
                            </div>
                        </div>
                        <div className="w-full px-2 text-sm flex flex-col gap-3 items-start justify-start text-gray-500 dark:text-gray-400">
                            <div className='text-gray-800 text-lg text-left'>
                                <h1 className='font-semibold'>Ice coffe
                                </h1>
                                <h1 className='my-3 text-gray-500'>₱ 23</h1>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className=''>
                                    <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                                    <div className="flex items-center">
                                        <span className="cursor-pointer border border-gray-300 hover:bg-gray-100 rounded-full  p-3 text-black transition hover:opacity-75">
                                            <FaMinus size={8} />

                                        </span>

                                        <input
                                            type="number"
                                            id="Quantity"
                                            value={0}
                                            readOnly
                                            className="h-10 w-9 font-bold rounded border-gray-200 text-center sm:text-sm text-black [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none "
                                        />

                                        <span className="cursor-pointer border border-gray-300 hover:bg-gray-100 rounded-full p-3 text-black transition hover:opacity-75">
                                            <FaPlus size={8} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`  py-4  font-sans font-medium  sticky inset-x-0 bottom-0 border-t border-gray-100 `}>
                    <div className={`flex flex-col gap-5`}>
                        <div className="flex justify-between text-2xl">
                        <h1 className="text-gray-500">Total</h1>
                        <p>₱ 233</p>
                        </div>
                        <div
                            title="Place an order"
                            className={`bg-[#242424] flex font-light text-xl justify-center  text-white hover:bg-gray-700 w-full py-3 border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                            Place an order
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
    return content
}
