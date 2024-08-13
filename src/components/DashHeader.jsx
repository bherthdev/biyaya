/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useAuth from "../hooks/useAuth";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import Spenner from "./Spenner";

const DashHeader = ({ headerName }) => {

  const navigate = useNavigate();

  
  const [userNav, setUserNav] = useState(false);
  const [colorChange, setColorchange] = useState(false);
  
  const { id, isAdmin, name, status, avatar } = useAuth();



  let menuRef = useRef();


  useEffect(() => {
    let handle = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setUserNav(false);
      }
    };
    document.addEventListener("mousedown", handle);

    return () => {
      document.removeEventListener("mousedown", handle);
    };
  });

  const changeNavbarColor = () => {
    if (window.scrollY >= 1) {
      setColorchange(true);
    }
    else {
      setColorchange(false);
    }
  };

  const clickSettings = () => {
    navigate(`/dashboard/users/${id}`)
    setUserNav(!userNav)
  }




  window.addEventListener('scroll', changeNavbarColor);

  const classNav = colorChange ? 'border-b z-30 sticky top-0 w-full dark:border-b-slate-800 ease-in-out duration-300' : 'ease-in-out duration-300'


  const content = (
    <>
      <div className={`bg-white dark:bg-slate-900 sm:px-8 border flex ${classNav} h-24 sm:h-32  items-center justify-between px-4 right-0`}>

        <div className="flex items-center">
          <p className="flex">
              <span className="sr-only">Logo</span>
              <span className="inline-block text-gray-700 dark:text-gray-200 text-2xl  sm:text-4xl font-semibold">
                {headerName === `/dashboard`
                  ? `Dashboard`
                  : headerName === `/inventory`
                    ? `Inventory`
                    : headerName === `/dashboard/orders`
                      ? `Orders`
                      : headerName === `/pos`
                        ? `POS`
                        : `Settings`
                }
              </span>
          </p>
        </div>
        {/* Navbar here */}
        <div className={`flex flex-1 items-center justify-end `}>


          <nav
            aria-label="Site Nav"
            className="hidden lg:flex lg:gap-4 lg:text-xs lg:font-bold lg:uppercase lg:tracking-wide lg:text-gray-300"
          >
          </nav>

          <div className="ml-8 flex items-center">
            <div className="flex items-center divide-x divide-gray-100 border-gray-200 dark:border-l-gray-900 dark:border-r-gray-900">
              <span>
                <div className="flex gap-4">
                  <div
                    className="inline-flex bg-white dark:bg-slate-900 rounded-full "
                    ref={menuRef}
                  >
                    <div className="relative">
                      <button
                        onClick={() => setUserNav(!userNav)}
                        type="button"
                        className="group flex shrink-0 items-center rounded-lg transition"
                      >
                        <span className="sr-only">Menu</span>


                        <div className="mr-2 hidden   sm:flex flex-col tracking-wide gap-0 text-right">
                          <h1 className="font-medium text-md text-gray-800 dark:text-gray-200 capitalize">
                            {name}
                          </h1>

                          <p className="text-gray-500 font-normal text-sm"> {status} </p>
                        </div>


                        <img
                          alt="Profile"
                          src={avatar}
                          className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover border border-slate-300  dark:border-slate-600"
                        />
                       {isAdmin && <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`mx-2 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block ${userNav && "rotate-180"
                            }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>}
                      </button>

                      {isAdmin && userNav &&(
                        <div
                          className={` absolute right-0 z-50  origin-top-right bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 mt-2 w-48 rounded-md shadow-lg
`}
                        >
                          <div className="py-1">
                            <span
                              onClick={clickSettings}
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
              </span>
            </div>
          </div>
        </div>
      </div>

    </>
  )

  return content
}

export default DashHeader