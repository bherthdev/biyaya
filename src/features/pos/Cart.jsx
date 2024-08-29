import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import iconItem from "../../assets/icon-item.svg"
import { useAddNewOrderMutation } from "../orders/ordersApiSlice";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Order from "./Order"
import { MdClose } from "react-icons/md";
import { useUpdateItemMutation } from "../items/itemsApiSlice";
import Spenner from "../../components/Spinner";
import useActivityLogger from "../../hooks/useActivityLogger";


export const Cart = ({ placeOrder, setPlaceOrder, enableSaveOrder, setEnableSaveOrder, toggleCart, orderTransac, setOrderTransac, orderItems, setOrdersItems, toggleCartMobile, setToggleCartMobile }) => {
    const { log } = useActivityLogger();

    const cashRef = useRef(null);
    const { formatDate, generateOR } = Order()

    const { id, name } = useAuth(); //current user id
    const [itemToBeUpdate, setItemToBeUpdate] = useState([]);

    useEffect(() => {
        orderItems.length && cashRef.current ? cashRef.current.focus() : window.focus()
    }, [placeOrder]);


    // Utility to combine states
    const combineMutationStates = (...mutations) => {
        return {
            isLoading: mutations.some(({ isLoading }) => isLoading),
            isSuccess: mutations.every(({ isSuccess }) => isSuccess),
            isError: mutations.some(({ isError }) => isError),
            error: mutations.reduce((acc, { error }) => acc || error, null),
        };
    };

    // Use mutations
    const [addNewOrder, addNewOrderState] = useAddNewOrderMutation();
    const [updateItem, updateItemState] = useUpdateItemMutation();

    // Combined states
    const { isLoading, isSuccess, isError, error } = combineMutationStates(addNewOrderState, updateItemState);

    // Use `isLoading`, `isSuccess`, `isError`, and `error` as needed when saving the order and updating the items



    const inputChange = (e) => {
        setOrderTransac({ ...orderTransac, dateTime: formatDate(), cash: e.target.value, change: Number(e.target.value) - Number(orderTransac.total) })
        Number(e.target.value) >= Number(orderTransac.total) ? setEnableSaveOrder(true) : setEnableSaveOrder(false)

    }

    useEffect(() => {
        if (orderTransac?.items) {
            const updatedItems = orderTransac.items
                .filter(data => data?.stock)  // Filter out items without stock
                .map(data => ({
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    stockMGT: data.stock,
                    category: data.category,
                    price: data.price,
                    qty: Number(data.currentStock) - Number(data.qty),
                    status: Number(data.currentStock) - Number(data.qty) === 0 ? 'Out of Stock' : 'In Stock',
                }));

            setItemToBeUpdate(updatedItems);
        }
    }, [orderTransac]);


    const computeTotal = () => {
        if (orderItems.length) {
            setPlaceOrder(prev => !prev)
            setOrderTransac({ ...orderTransac, items: orderItems })
        }
    }


    const saveOrder = async () => {

        if (!enableSaveOrder) return;
        try {
            const result = await addNewOrder(orderTransac);

            if (result?.data?.message) {
                handleSuccess(result.data.message);
                log(`POS ORDER`, `Order No. ${orderTransac?.orderNo} Grand Total: ${orderTransac?.total}`, result?.data?.orderID)

                if (itemToBeUpdate.length) {
                    // Update each item after the order is successfully saved
                    const updatePromises = itemToBeUpdate.map(item => updateItem({ ...item }));

                    // Wait for all updateItem mutations to complete
                    const updateResults = await Promise.allSettled(updatePromises);

                    // Handle the results of the item updates
                    handleUpdateResults(updateResults);
                }
            }
        } catch (error) {
            handleError(error);
        }
    };

    const handleUpdateResults = (results) => {
        const hasErrors = results.some(result => result.status === 'rejected');

        if (hasErrors) {
            toast.error("Some items failed to update.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.success("All items updated successfully.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            resetOrderState();
        }
    };

    const handleSuccess = (message) => {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        resetOrderState();
    };

    // Helper function to handle error
    const handleError = (error) => {
        toast.error(error?.error?.error || "An unexpected error occurred", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    // Helper function to reset order state
    const resetOrderState = () => {
        setToggleCartMobile(false);
        setPlaceOrder(false);
        setEnableSaveOrder(false);
        setOrdersItems([]);
        setOrderTransac({
            user: id,
            orderNo: generateOR(),
            dateTime: formatDate(),
            barista: name,
            orderType: 'Dine in',
            items: [],
            total: 0,
            cash: 0,
            change: 0
        });
    };



    const updateItems = (id, option) => {
        const index = orderItems.findIndex(item => item.id === id)
        const tempRows = [...orderItems]; // avoid direct state mutation
        const tempObj = orderItems[index]; // copy state object at index to a temporary object

        if (index !== -1) {

            if (Number(tempObj.qty) >= 1) {

                //check if + or - the qty
                if (option) {

                    //check if item stock mgt and current qty is greater than qty
                    if (tempObj?.stock && Number(tempObj?.currentStock) > Number(tempObj?.qty)) {
                        tempObj.qty = Number(tempObj.qty) + 1
                    } else {
                        //check if item is not stock mgt
                        if (!tempObj?.stock) tempObj.qty = Number(tempObj.qty) + 1
                    }

                } else {
                    tempObj.qty = Number(tempObj.qty) - 1
                }

                tempObj.total = Number(tempObj.qty) * Number(tempObj.price)
                tempRows[index] = tempObj;
            }

            tempObj.qty === 0 && tempRows.splice(index, 1)
        }

        setOrderTransac({ ...orderTransac, total: orderItems.reduce((totalOrder, item) => totalOrder + item.total, 0) })
        setOrdersItems(tempRows)

        // update computation
        if (orderItems.length > 0) {
            setPlaceOrder(false)
            setEnableSaveOrder(false)
            setOrderTransac({ ...orderTransac, total: orderItems.reduce((totalOrder, item) => totalOrder + item.total, 0), cash: 0, change: 0 })
        }

    }


    const classToggleCart = toggleCart ? ' ease-in-out duration-300 right-0 top-0 bottom-0' : ' right-[-100%]  ease-in-out duration-300'
    const classToggleCartMobile = toggleCartMobile ? `flex` : `hidden sm:flex`


    const content = (
        <>
            <div className={` ${classToggleCartMobile} shadow-2xl sm:shadow-transparent  h-full bg-white fixed w-80 border ${classToggleCart} z-40 px-5  flex-col justify-between border-e bg-white `}>
                <div className={`py-5 flex flex-col  gap-5`}>
                    <div className="flex sm:hidden justify-between">
                        <h1 className={`text-3xl text-gray-700`}

                        >
                            Cart
                        </h1>
                        <div
                            onClick={() => setToggleCartMobile(false)}
                            className="p-1 text-gray-400">
                            <MdClose size={30} />
                        </div>
                    </div>
                    <div className="hidden sm:flex justify-between items-center">
                        <h1 className={`text-3xl text-gray-700`}

                        >
                            Cart
                        </h1>

                        <p className="flex text-sm text-gray-400 font-normal">
                            {orderTransac.orderNo}
                        </p>
                    </div>
                    <div className="flex gap-5 text-xs">
                        <button
                            title="Dine in"
                            onClick={() => setOrderTransac({ ...orderTransac, orderType: 'Dine in' })}
                            className={`${orderTransac.orderType == 'Dine in' ? 'bg-[#242424] text-white hover:bg-gray-700' : 'hover:bg-gray-200 text-black'} flex px-5  py-2 border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                            Dine in
                        </button>
                        <button
                            title="Dine in"
                            onClick={() => setOrderTransac({ ...orderTransac, orderType: 'Take out' })}
                            className={`${orderTransac.orderType === 'Take out' ? 'bg-[#242424] text-white hover:bg-gray-700' : 'hover:bg-gray-200 text-black'} flex px-5  py-2 border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
                            Take out
                        </button>
                    </div>

                </div>
                <div className="h-2/3 overflow-x-auto">

                    {orderItems.length
                        ? orderItems.map((item, idx) => (
                            <div key={idx} className="flex mt-5 gap-3  border-b dark:bg-slate-800 py-5 border-gray-300 dark:border-gray-800 text-center text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400">
                                <div className="text-4xl  font-bold  md:text-5xl   flex flex-col gap-2">
                                    <div className='h-24 w-20 object-cover bg-gray-600 rounded-2xl'>
                                        <img
                                            alt="Man"
                                            src={item.avatar
                                                ? item.avatar
                                                : iconItem
                                            }
                                            className="h-24 w-20 rounded-2xl opacity-60 dark:border-slate-600 object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-2 text-sm flex flex-col gap-2 items-start justify-start text-gray-500 dark:text-gray-400">
                                    <div className='text-gray-800 text-lg text-left'>
                                        <h1 className='font-semibold'>{item.name}
                                        </h1>
                                        <h1 className='text-gray-500 text-sm font-semibold'>₱ {Number(item.price).toFixed(2)}</h1>
                                        {item.stock && <h1 className='text-green-700 text-xs mt-2'> {Number(item.currentStock)} in stock</h1>}
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
                        ))
                        : <>
                            <div className="flex flex-col justify-center items-center gap-2 mt-10">
                                <h1 className="text-2xl font-semibold text-gray-300">No Items</h1>
                                <p className="text-xs text-gray-300">Add items to cart to compute the total. </p>
                            </div>

                        </>



                    }

                </div>
                <div className={` py-4 bg-white  font-sans sticky bottom-0 border-t border-gray-100 `}>
                    <div className={`flex flex-col gap-5`}>
                        <div className="flex justify-between text-2xl font-medium">
                            <h1 className="text-gray-500">Total</h1>
                            <p className="text-green-800">₱ {Number(orderTransac.total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
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
                                        ref={cashRef}
                                        required
                                        value={orderTransac.cash}
                                        onChange={inputChange}
                                    />
                                </div>
                                <div className="flex justify-between text-lg">
                                    <h1 className="text-gray-500">Change</h1>
                                    <p className="text-red-800 font-medium">₱ {Number(orderTransac.change).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                                </div>
                                <span
                                    onClick={saveOrder}
                                    title="Save Order"
                                    disabled={enableSaveOrder}
                                    className={`${enableSaveOrder ? 'bg-green-900 hover:bg-green-700 ' : 'bg-gray-300'}  cursor-pointer flex font-medium text-xl justify-center  text-white w-full py-3 border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >

                                    {isLoading
                                        ?
                                        <div className=" text-sm flex text-gray-400 justify-end">
                                            <Spenner />
                                            <p>Saving order.... </p>
                                        </div>
                                        : `Save Order`
                                    }


                                </span>
                            </>
                            :
                            <>
                                <div
                                    onClick={computeTotal}
                                    title="Place an order"
                                    className={`${orderItems.length ? `bg-[#242424] hover:bg-gray-700` : `bg-gray-300`} cursor-pointer flex font-medium text-xl justify-center  text-white  w-full py-3 border dark:text-slate-600 border-gray-300 dark:border-slate-700  dark:bg-gray-800 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >
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
