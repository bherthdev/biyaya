import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import iconItem from "../../assets/icon-item.svg";

const User = ({ userId, search }) => {

  const { username } = useAuth();

  const user = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();



  if (user && user.username !== username) {

    if (user.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
      user.position.toLowerCase().indexOf(search.toLowerCase()) > -1
    ) {

      const handleEdit = () => navigate(`/settings/users/${userId}`);

      return (

        <div onClick={handleEdit} title='Edit user' className="cursor-pointer hover:shadow-lg gap-3 p-3 lg:p-5 flex flex-col justify-between bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-gray-200 dark:border-gray-800  text-center text-gray-800 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-400">
          <div className="text-4xl font-bold md:text-5xl flex flex-col">
            <div className='mx-auto h-28 lg:w-2/5   bg-gray-600 rounded-xl '>
              <img
                alt={user.name}
                src={user.avatar || iconItem}
                className="h-full w-full rounded-xl opacity-80 dark:border-slate-600 object-cover"
              />
            </div>
            <div className="w-full text-sm font-normal mt-3 gap-4 flex flex-col items-start justify-between text-gray-500 dark:text-gray-400">
              <div className='mx-auto sm:mb-5 flex flex-col gap-2 text-black text-base sm:text-lg text-center'>
                <h1 className=''>{user.name}</h1>
                <p className='text-gray-500 text-sm'>{user.position}</p>
                <span
                  className={` ${user.active
                    ? "border-emerald-500 text-emerald-700"
                    : "border-red-500 text-red-700"
                    }  inline-flex items-center justify-center rounded-full border  px-2 py-0.5`}
                >
                

                  <p className="whitespace-nowrap text-xs">
                    {user.active ? "Active" : "Inactive"}
                  </p>
                </span>

              </div>
            </div>
          </div>
        </div>
      );
    }



  } else return null;


};
export default User;
