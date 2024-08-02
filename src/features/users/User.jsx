import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { MdEditNote } from 'react-icons/md';

const User = ({ userId, search }) => {

  const { username } = useAuth();

  const user = useSelector((state) => selectUserById(state, userId));

  const navigate = useNavigate();



  if (user && user.username !== username) {

    if (user.name.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
      user.email.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
      user.position.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
      user.department.toLowerCase().indexOf(search.toLowerCase()) > -1
    ) {

      const handleEdit = () => navigate(`/dashboard/users/${userId}`);

      return (
        <tr onClick={handleEdit} className="hover:bg-slate-200 text-xl dark:hover:bg-[#151e30] cursor-pointer">
          <td
            className={`sm:flex gap-4 whitespace-nowrap px-6 py-6 font-medium text-gray-900 dark:text-gray-300`}
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 h-14 w-14">
                <img
                  alt="Man"
                  src={
                    user.avatar
                      ? user.avatar
                      : `https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80`
                  }
                  className="h-14 w-14 rounded-full border border-slate-300  dark:border-slate-600 object-cover"
                />
              </div>
            <div className="ml-4">
              <p className="capitalize">{user.name} </p>
            </div>
            </div>


          </td>

          <td
            className={`whitespace-nowrap px-6 py-6 font-medium text-gray-600 dark:text-gray-300`}
          >
            <div className="flex-nowrap">
              <p className="capitalize">{user.position} </p>
             
            </div>
          </td>

          <td
            className={`whitespace-nowrap px-6 py-6 font-medium text-gray-900 dark:text-gray-300 `}
          >
            <span
              className={` ${user.active
                ? " text-green-700 font-semibold dark:bg-green-900 dark:text-green-200"
                : "text-red-700 font-semibold dark:bg-red-900 dark:text-red-200"
                }  inline-flex items-center justify-center px-3 py-2 font-normal leading-none  rounded-full`}
            >
              {user.active ? "Active" : "Inactive"}
            </span>
          </td>

          <td
            className={`whitespace-nowrap px-6 py-6 font-medium text-gray-600 dark:text-gray-500 `}
          >
            {user.roles}
          </td>

          <td
            className={`whitespace-nowrap px-6 py-6 text-gray-700 dark:text-gray-300`}
          >
            <span
              title="Edit User"
              className="flex justify-end hover:text-slate-500 cursor-pointer"
              onClick={handleEdit}
            >
              <MdEditNote size={30} />
            </span>

          </td>

        </tr>
      );
    }



  } else return null;


};
export default User;
