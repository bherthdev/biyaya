import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectItemById } from "./itemsApiSlice";
import iconPicture from "../../assets/icon-item.svg"

const Item = ({ itemId, search }) => {

  const { username } = useAuth();

  const item = useSelector((state) => selectItemById(state, itemId));

  const navigate = useNavigate();

  if (item && item.username !== username) {

    if (item.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
      item.qty.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
      item.status.toLowerCase().indexOf(search.toLowerCase()) > -1
    ) {

      const handleEdit = () => navigate(`/inventory/${itemId}`);

      return (
        <tr onClick={handleEdit} className="hover:bg-slate-200 text-lg dark:hover:bg-[#151e30] cursor-pointer">

          <td
            className={`sm:flex gap-4 whitespace-nowrap px-8 py-3 font-medium text-gray-900 dark:text-gray-300`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-12 w-12">
                <img
                  alt="img"
                  src={
                    item.avatar
                      ? item.avatar
                      : iconPicture
                  }
                  className="h-12 w-12 rounded-full border border-slate-300  dark:border-slate-600 object-cover"
                />
              </div>
              <div className="ml-4">
                <p className="capitalize">{item.name} </p>
              </div>
            </div>


          </td>

          <td className={`whitespace-pre-wrap  px-8 py-3  text-gray-900 dark:text-gray-300`}>
            <div className="flex-wrap">
              <p className=" text-sm text-gray-700 dark:text-gray-500"
                title={item.description}
              >
                {item.description.slice(0, 30)}...
              </p>
            </div>
          </td>
          <td className={`whitespace-nowrap px-8 py-3  font-medium text-gray-600 dark:text-gray-500 `}>
           <div className="flex gap-1 justify-start text-sm">

            <h1
              className={` ${item.status === "In Stock"
                ? " text-green-600"
                : " text-red-600"
                }  inline-flex items-center justify-center leading-none`}
            >
              {item.status === "In Stock" ? "In Stock" : "Out of Stock"}
              
            </h1>
            <h2 className="flex items-center">
              {item.stock_mgt && ` (${item.qty})`}
            </h2>
           </div>
          </td>

          <td className={`whitespace-nowrap px-8 py-3  text-sm text-gray-900 dark:text-gray-300`}>
            <div className="flex-nowrap">
              <p className="capitalize">₱ {Number(item.price).toFixed(2)} </p>

            </div>
          </td>

          <td className={`whitespace-nowrap px-8 py-3 text-base  text-gray-900 dark:text-gray-300 `}>
            {item.category}
          </td>

        
        </tr>
      );
    }



  } else return null;


};
export default Item;
