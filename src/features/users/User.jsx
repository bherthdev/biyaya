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
      user.position.toLowerCase().indexOf(search.toLowerCase()) > -1 
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
                ? "border-emerald-500 text-emerald-700"
                : "border-red-500 text-red-700"
                }  inline-flex items-center justify-center rounded-full border  px-2.5 py-0.5`}
            >
              {user.active
                ? <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="-ms-1 me-1.5 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                : <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="-ms-1 me-1.5 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              }

              <p className="whitespace-nowrap text-sm">
                {user.active ? "Active" : "Inactive"}
              </p>
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
