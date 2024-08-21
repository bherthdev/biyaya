/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { IoNotificationsOutline } from "react-icons/io5";

const DashHeader = ({ headerName }) => {
  const navigate = useNavigate();
  const [userNav, setUserNav] = useState(false);
  const [notif, setNotif] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const { id, isAdmin, name, position, avatar } = useAuth();
  const menuRef = useRef();
  const notifRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserNav(false);
      }  
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotif(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setColorChange(window.scrollY >= 1);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleSettingsClick = () => {
    navigate(`/settings/users/${id}`);
    setUserNav(!userNav);
  };
  const handleNotifClick = () => {
    setNotif(!notif);
  };

  const navClass = colorChange
    ? 'border-b z-30 sticky top-0 w-full dark:border-b-slate-800 ease-in-out duration-300'
    : 'ease-in-out duration-300';

  const getHeaderName = () => {
    switch (headerName) {
      case '/dashboard':
        return 'Dashboard';
      case '/inventory':
        return 'Inventory';
      case '/orders':
        return 'Orders';
      case '/pos':
        return 'POS';
      default:
        return 'Settings';
    }
  };

  return (
    <div className={`bg-white dark:bg-slate-900 sm:px-8 border flex ${navClass} h-20 sm:h-32 items-center justify-between px-4 right-0`}>
      <div className="flex items-center">
        <p className="flex">
          <span className="sr-only">Logo</span>
          <span className="inline-block text-gray-700 dark:text-gray-200 text-2xl sm:text-3xl font-semibold">
            {getHeaderName()}
          </span>
        </p>
      </div>

      <div className="flex items-center justify-end">
        <nav aria-label="Site Nav" className="hidden lg:flex lg:gap-4  lg:text-gray-300" />

        <div className="flex justify-between items-center gap-2">
          {/* <div className="relative">

            <div
             onClick={() => setNotif(!notif)}
              ref={notifRef}
              className="hidden sm:flex cursor-pointer items-center relative rounded-lg border dark:bg-slate-800 p-2 text-gray-800 dark:text-gray-300 hover:text-gray-700"
            >
              <span className="sr-only">Notifications</span>

              <div className="absolute p-1 w-2 h-2 rounded-full bg-red-700  top-1 right-1"></div>
              <span>
                <IoNotificationsOutline size={20} />
              </span>



            </div>
            {notif &&
            <div className="absolute right-0 z-50 origin-top-right bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 mt-2 w-48 rounded-md shadow-lg">
              <div className="block top-[-6px] bg-white h-3 w-3 border-t border-l rotate-45 absolute right-3"></div>
              <div className="py-2">
                <span
                  onClick={handleNotifClick}
                  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-400"
                >
                  Account Setting
                </span>
              </div>
            </div>
            }
          </div> */}
          <div className="flex items-center divide-x divide-gray-100 border-gray-200 dark:border-l-gray-900 dark:border-r-gray-900">

            <div className="flex gap-4">

              <div className="inline-flex bg-white dark:bg-slate-900 rounded-full" ref={menuRef}>

                <div className="relative">
                  <button
                    onClick={() => setUserNav(!userNav)}
                    type="button"
                    className="group flex shrink-0 items-center rounded-lg transition"
                  >
                    <span className="sr-only">Menu</span>

                    <img
                      alt="Profile"
                      src={avatar}
                      className="h-12 w-12 sm:h-13 sm:w-13 rounded-full object-cover border border-slate-300 dark:border-slate-600"
                    />
                    <div className="ml-1 sm:mr-2 hidden sm:flex flex-col tracking-wide text-left">
                      <h1 className="font-medium text-xs sm:text-md text-gray-800 dark:text-gray-200 capitalize">
                        {name}
                      </h1>
                      <p className="text-gray-400 font-light text-[10px] sm:text-sm">{position}</p>
                    </div>
                    {isAdmin && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`mx-2 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block ${userNav && "rotate-180"}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  {isAdmin && userNav && (
                    <div className="absolute right-0 z-50 origin-top-right bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 mt-2 w-48 rounded-md shadow-lg">
                    <div className="block top-[-7px] bg-white h-3 w-3 border-t border-l rotate-45 absolute right-3"></div>

                      <div className="py-2">
                        <span
                          onClick={handleSettingsClick}
                          className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-400"
                        >
                          Account Setting
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHeader;
