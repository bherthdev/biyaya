import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import iconItem from "../../assets/icon-item.svg"


export const Cart = ({ toggleCart, orderTransac, setOrderTransac, orderItems, setOrdersItems }) => {

    const [placeOrder, setPlaceOrder] = useState(false)
    const [enableSaveOrder, setEnableSaveOrder] = useState(false)

    const inputChange = (e) => {
        setOrderTransac({ ...orderTransac, Cash: e.target.value, Change: Number(e.target.value) - Number(orderTransac.Total) })
        Number(e.target.value) >= Number(orderTransac.Total) ? setEnableSaveOrder(true): setEnableSaveOrder(false)
    }

    const computeTotal = () => {
        orderItems.length && setPlaceOrder(placeOrder => !placeOrder)
    }

    const saveOrder = () =>{
        setOrderTransac({...orderTransac, Items: [...orderItems, orderItems]})
        console.log(orderTransac)
    }



    const classToggleCart = toggleCart ? ' ease-in-out duration-300 right-0 top-0' : ' right-[-100%]  ease-in-out duration-300'


    const updateItems = (id, option) => {
        const index = orderItems.findIndex(item => item.id === id)
        const tempRows = [...orderItems]; // avoid direct state mutation
        const tempObj = orderItems[index]; // copy state object at index to a temporary object


        if (index !== -1) {
            if (Number(tempObj.qty) >= 1) {
                option ? tempObj.qty = Number(tempObj.qty) + 1 : tempObj.qty = Number(tempObj.qty) - 1
                tempObj.total = Number(tempObj.qty) * Number(tempObj.price)
                tempRows[index] = tempObj;
            }
            tempObj.qty === 0 && tempRows.splice(index, 1)
        }

        setOrderTransac({ ...orderTransac, Total: orderItems.reduce((totalOrder, item) => totalOrder + item.total, 0) })
        setOrdersItems(tempRows)

        // update computation
        if(orderItems.length > 0 ) {
            setPlaceOrder(false) 
            setEnableSaveOrder(false) 
            setOrderTransac({...orderTransac, Total: orderItems.reduce((totalOrder, item) => totalOrder + item.total, 0) ,  Cash: 0, Change: 0 })
        }

    }


    const content = (
        <>


            <div className={`flex h-screen fixed w-80 border ${classToggleCart} z-20 px-4  flex-col justify-start border-e bg-white `}>
                <div className={`py-5 flex flex-col  gap-5`}>
                    <div className="flex justify-between items-center">
                        <h1 className={`text-3xl text-gray-700`}

                        >
                            Cart
                        </h1>
                        <p className="text-base text-gray-400 font-normal">
                            Order {orderTransac.OrderNo}
                        </p>
                    </div>
                    <div className="flex gap-5 text-xs">
                        <button
                            title="Dine in"
                            onClick={() => setOrderTransac({ ...orderTransac, OrderType: 'Dine in' })}
                            className={`${orderTransac.OrderType == 'Dine in' ? 'bg-[#242424] text-white hover:bg-gray-700' : 'hover:bg-gray-200 text-black'} flex px-5  py-2 border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                            Dine in
                        </button>
                        <button
                            title="Dine in"
                            onClick={() => setOrderTransac({ ...orderTransac, OrderType: 'Take out' })}
                            className={`${orderTransac.OrderType === 'Take out' ? 'bg-[#242424] text-white hover:bg-gray-700' : 'hover:bg-gray-200 text-black'} flex px-5  py-2 border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                            Take out
                        </button>
                    </div>

                </div>
                <div className="h-2/3 overflow-x-auto">
                    {orderItems.map((item, idx) => (
                        <div key={idx} className="flex mt-5 gap-3  border-b dark:bg-slate-800 py-5 border-gray-300 dark:border-gray-800 text-center text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400">
                            <div className="text-4xl  font-bold  md:text-5xl   flex flex-col gap-2">
                                <div className='h-24 w-20 object-cover'>
                                    <img
                                        alt="Man"
                                        src={item.avatar
                                            ? item.avatar
                                            : iconItem
                                        }
                                        className="h-24 w-20 rounded-2xl  dark:border-slate-600 object-cover"
                                    />
                                </div>
                            </div>
                            <div className="w-full px-2 text-sm flex flex-col gap-2 items-start justify-start text-gray-500 dark:text-gray-400">
                                <div className='text-gray-800 text-lg text-left'>
                                    <h1 className='font-semibold'>{item.name}
                                    </h1>
                                    <h1 className='text-gray-500 text-sm font-semibold'>₱ {Number(item.price).toFixed(2)}</h1>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className=''>
                                        <label htmlFor="Quantity" className="sr-only"> Quantity </label>

                                        <div className="flex items-center">
                                            <span
                                                onClick={() => updateItems(item.id, false)}
                                                className="cursor-pointer border border-gray-300 hover:bg-gray-100 rounded-full  p-3 text-black transition hover:opacity-75">
                                                <FaMinus size={8} />

                                            </span>

                                            <input
                                                type="number"
                                                id="Quantity"
                                                value={item.qty}
                                                readOnly
                                                className="h-10 w-9 font-bold rounded border-gray-200 text-center sm:text-sm text-black [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none "
                                            />

                                            <span
                                                onClick={() => updateItems(item.id, true)}
                                                className="cursor-pointer border border-gray-300 hover:bg-gray-100 rounded-full p-3 text-black transition hover:opacity-75">
                                                <FaPlus size={8} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <div className={`  py-4  font-sans   sticky inset-x-0 bottom-0 border-t border-gray-100 `}>
                    <div className={`flex flex-col gap-5`}>
                        <div className="flex justify-between text-2xl font-medium">
                            <h1 className="text-gray-500">Total</h1>
                            <p className="text-green-800">₱ {Number(orderTransac.Total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                        </div>
                        {placeOrder
                            ?
                            <>
                                <div className="flex items-center justify-between text-2xl font-medium">
                                    <h1 className="text-gray-500">Cash</h1>
                                    <input
                                        className={`w-2/3 mt-1 px-3 py-1 text-right font-semibold text-gray-900 dark:text-gray-100 border dark:focus:border border-gray-300 dark:border-gray-800  dark:focus:border-gray-700  dark:bg-slate-900 outline-none focus:border-gray-300  focus:shadow-sm rounded-md`}
                                        id="cash"
                                        name="cash"
                                        type="number"
                                        required
                                        value={orderTransac.Cash}
                                        onChange={inputChange}
                                    />
                                </div>
                                <div className="flex justify-between text-lg">
                                    <h1 className="text-gray-500">Change</h1>
                                    <p className="text-red-800 font-medium">₱ {Number(orderTransac.Change).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                                </div>
                                <span    
                                    onClick={saveOrder}
                                    title="Place an order"
                                    disabled={enableSaveOrder}
                                    className={`${enableSaveOrder ? 'bg-green-900 hover:bg-green-700 ' : 'bg-gray-300'}  cursor-pointer flex font-medium text-xl justify-center  text-white w-full py-3 border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                                    Save Order
                                </span>
                            </>
                            :
                            <>
                                <div
                                    onClick={computeTotal}
                                    title="Place an order"
                                    className={`bg-[#242424] cursor-pointer flex font-medium text-xl justify-center  text-white hover:bg-gray-700 w-full py-3 border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                                    Place an order
                                </div>

                            </>
                        }

                    </div>
                </div>

            </div>

        </>
    )
    return content
}
