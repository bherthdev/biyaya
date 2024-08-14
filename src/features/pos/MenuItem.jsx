import { useSelector } from 'react-redux';
import { selectItemById } from '../items/itemsApiSlice';
import { FaPlus } from 'react-icons/fa';
import iconItem from "../../assets/icon-item.svg"


const MenuItem = ({ itemId, search, orderTransac, setOrderTransac, orderItems, setOrdersItems }) => {

    const item = useSelector((state) => selectItemById(state, itemId));
   

    const addToCart = (item) => {

        const index = orderItems.findIndex(items => items.id === item.id)

        const tempRows = [...orderItems]; // avoid direct state mutation
        const tempObj = orderItems[index]; // copy state object at index to a temporary object

        if (index !== -1) {
            if (Number(tempObj?.qty) >= 1) {
                //check if item stock mgt and current qty is greater than qty
                if (tempObj?.stock && Number(tempObj?.currentStock) > Number(tempObj?.qty)) {

                    tempObj.qty = Number(tempObj.qty) + 1
                    tempRows[index] = tempObj;
                    tempObj.total = Number(tempObj.qty) * Number(tempObj.price)
                    setOrdersItems(tempRows)
                    setOrderTransac({ ...orderTransac, total: orderItems.reduce((totalOrder, item) => totalOrder + item.total, 0) })

                } else {
                    //check if item is not stock mgt
                    if (!tempObj?.stock) {
                        tempObj.qty = Number(tempObj.qty) + 1
                        tempRows[index] = tempObj;
                        tempObj.total = Number(tempObj.qty) * Number(tempObj.price)
                        setOrdersItems(tempRows)
                        setOrderTransac({ ...orderTransac, total: orderItems.reduce((totalOrder, item) => totalOrder + item.total, 0) })
                    }
                }
            }
        } else {
            setOrdersItems([...orderItems, { id: item.id, name: item.name, avatar: item.avatar, stock: item.stock_mgt, currentStock: qty, qty: 1, price: item.price, total: Number(item.price) }])
            setOrderTransac({ ...orderTransac, total: orderTransac.total + Number(item.price) })
        }
    }




    if (item && item.status === "In Stock") {

        if (item.category === search) {
            return (

                <div className="gap-3  flex flex-col justify-between  bg-white dark:bg-slate-800 rounded-3xl shadow-sm border-gray-200 dark:border-gray-800 p-2 sm:p-4 text-center text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400">
                    <div className=" text-4xl  font-bold  md:text-5xl flex flex-col">
                        <div className='h-20 w-full lg:h-36 lg:w-full object-cover bg-gray-600 rounded-3xl'>
                            <img
                                alt="Man"
                                src={
                                    item.avatar
                                        ? item.avatar
                                        : iconItem
                                }
                                className="h-20 w-full lg:h-36 lg:w-full rounded-3xl opacity-80 dark:border-slate-600 object-cover"
                            />
                        </div>
                        <div className="w-full  text-sm font-normal mt-3 gap-4 flex flex-col items-start justify-between text-gray-500 dark:text-gray-400">
                            <div className='mx-auto text-black text-sm sm:text-lg text-center  '>

                                <h1 className='font-bold'>{item.name}
                                </h1>
                                <div className={`${item.stock_mgt && `sm:flex-row`} flex flex-col  justify-between my-1 text-xs sm:text-base`}>
                                    <p className='text-gray-500 font-semibold'>₱ {Number(item.price).toFixed(2)}</p>
                                    {item.stock_mgt && <p className='text-green-700 text-xs font-medium'> {(item?.qty)} in stock</p>}
                                </div>
                                <p className='hidden sm:block text-left text-xs text-gray-400'
                                    title={item.description}
                                >
                                    {item.description.length > 110 ? item.description.slice(0, 110) + '...' : item.description}
                                </p>
                            </div>

                        </div>
                    </div>
                    <div className='flex justify-start items-center w-full'>
                        <span
                            title="Add to cart"
                            onClick={() => addToCart(item)}

                            className={`cursor-pointer w-full bg-[#242424] active:bg-gray-600 hover:bg-gray-700 text-[11px] sm:text-base flex justify-center items-center gap-2 px-4 py-2 sm:py-3 text-white border border-gray-300 rounded-full`} >

                            <FaPlus size={10} />
                            Add to cart
                        </span>
                    </div>


                </div>

            );
        }

    } else return null;

}

export default MenuItem