import { useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { selectItemById } from '../items/itemsApiSlice';
import { useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';
import iconItem from "../../assets/icon-item.svg"


const MenuItem = ({ itemId, search, orderTransac, setOrderTransac, orderItems, setOrdersItems }) => {


    const item = useSelector((state) => selectItemById(state, itemId));



    const addToCart = (item) => {

        const index = orderItems.findIndex(items => items.id === item.id)

        const tempRows = [...orderItems]; // avoid direct state mutation
        const tempObj = orderItems[index]; // copy state object at index to a temporary object

        if (index !== -1) {


            if (Number(tempObj.qty) >= 1) {

                tempObj.qty = Number(tempObj.qty) + 1

                tempRows[index] = tempObj;

                tempObj.total = Number(tempObj.qty) * Number(tempObj.price)

                setOrdersItems(tempRows)
                setOrderTransac({ ...orderTransac, total: orderItems.reduce((totalOrder, item) => totalOrder + item.total, 0) })
            }

        } else {
            setOrdersItems([...orderItems, { id: item.id, name: item.name, avatar: item.avatar, qty: 1, price: item.price, total: Number(item.price) }])

            setOrderTransac({ ...orderTransac, total: orderTransac.total + Number(item.price) })

        }





    }


    if (item && item.status === "In Stock" && item.qty > 0) {

        if (item.category === search) {
            return (

                <div className="gap-3 group relative flex sm:block overflow-hidden bg-white dark:bg-slate-800 rounded-3xl shadow-sm border-gray-200 dark:border-gray-800 p-4 text-center text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400">
                    <div className="text-4xl  font-bold  md:text-5xl flex gap-2">
                        <div className='rounded-lg h-36 w-full lg:h-36 lg:w-full object-cover'>
                            <img
                                alt="Man"
                                src={
                                    item.avatar
                                        ? item.avatar
                                        : iconItem}
                                className="h-36 w-full lg:h-36 lg:w-full rounded-3xl  dark:border-slate-600 object-cover"
                            />
                        </div>

                        {/* <div className="flex justify-center gap-8 items-center">
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
                                        className="h-10 w-9 rounded border-gray-200 text-center sm:text-sm text-black [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none "
                                    />

                                    <span className="cursor-pointer border border-gray-300 hover:bg-gray-100 rounded-full p-3 text-black transition hover:opacity-75">
                                        <FaPlus size={8} />
                                    </span>
                                </div>
                            </div>
                        </div> */}

                    </div>
                    <div className="w-full  text-sm font-normal mt-3 gap-4 flex flex-col items-start justify-between text-gray-500 dark:text-gray-400">
                        <div className='text-black text-lg text-center '>

                            <h1 className='font-bold '>{item.name}
                            </h1>
                            <p className='mb-3 text-base text-gray-500 font-semibold'>₱ {Number(item.price).toFixed(2)}</p>
                            <p className='text-left text-xs text-gray-400'
                                title={item.description}
                            >
                                {item.description.length > 110 ? item.description.slice(0, 110) + '...' : item.description}
                            </p>
                        </div>

                        <div className='flex justify-start items-center w-full'>
                            <span
                                title="Add to cart"
                                onClick={() => addToCart(item)}

                                className={`cursor-pointer w-full text-sx sm:text-base flex justify-center items-center gap-2 px-4 py-2 sm:py-3 text-black border dark:text-gray-300 border-gray-300 dark:border-slate-600  dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >

                                <FaPlus size={10} />
                                Add to cart
                            </span>
                        </div>
                    </div>


                </div>

            );
        }



    } else return null;

}

export default MenuItem