/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";

const DashHeader = ({ headerName }) => {
  const navigate = useNavigate();
  const [userNav, setUserNav] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const { id, isAdmin, name, position, avatar } = useAuth();
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserNav(false);
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
          <span className="inline-block text-gray-700 dark:text-gray-200 text-2xl sm:text-4xl font-semibold">
            {getHeaderName()}
          </span>
        </p>
      </div>

      <div className="flex flex-1 items-center justify-end">
        <nav aria-label="Site Nav" className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-300" />

        <div className="ml-8 flex items-center">
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
                    <div className="mr-1 sm:mr-2 flex flex-col tracking-wide text-right">
                      <h1 className="font-medium text-xs sm:text-md text-gray-800 dark:text-gray-200 capitalize">
                        {name}
                      </h1>
                      <p className="text-gray-400 font-light text-[10px] sm:text-sm">{position}</p>
                    </div>
                    <img
                      alt="Profile"
                      src={avatar}
                      className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover border border-slate-300 dark:border-slate-600"
                    />
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
                      <div className="py-1">
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
