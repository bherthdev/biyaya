import { useSelector } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { selectItemById } from '../items/itemsApiSlice';
import { useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';
import iconItem from "../../assets/icon-item.svg"

const MenuItem = ({ itemId, search }) => {

    const { username } = useAuth();

    const item = useSelector((state) => selectItemById(state, itemId));

    const navigate = useNavigate();

    
    if (item && item.status === "In Stock" && item.qty > 0) {

        if (item.category === search) 
        {
            return (

                <div className="flex bg-white dark:bg-slate-800 rounded-3xl shadow-sm border-gray-200 dark:border-gray-800 p-4 text-center text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400">
                    <div className="text-4xl px-2 font-bold  md:text-5xl   flex flex-col gap-2">
                        <div className='rounded-lg h-52 w-32 object-cover'>
                            <img
                                alt="Man"
                                src={
                                    item.avatar
                                        ? item.avatar
                                        : iconItem}
                                className="h-52 w-32 rounded-3xl  dark:border-slate-600 object-cover"
                            />
                        </div>

                        <div className="flex justify-center gap-8 items-center">
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
                        </div>
                    </div>
                    <div className="w-full px-2 text-sm flex flex-col gap-3 items-start justify-between text-gray-500 dark:text-gray-400">
                        <div className='text-black text-lg text-left'>
                            <h1 className='font-bold'>{item.name}
                            </h1>
                            <h1 className='mb-2'>₱ {Number(item.price).toFixed(2)}</h1>
                            <p className='text-left text-xs text-gray-400'
                               title={item.description}
                            >
                            {item.description.length > 120 ? item.description.slice(0, 120) + '...' :  item.description} 
                            </p>
                        </div>
                        <div className=''>
                            <span
                                title="Add to cart"

                                className={`cursor-pointer text-sx flex items-center gap-2 px-4 py-2 text-black border dark:text-gray-300 border-gray-300 dark:border-slate-600  dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full`} >

                                <FaPlus size={8} />
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