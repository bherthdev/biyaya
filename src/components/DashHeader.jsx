/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsArrowLeftShort } from 'react-icons/bs';
import { Link, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { SideMenu } from './SideMenu';

const DashHeader = () => {

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  nav ? document.body.classList.add("overflow-hidden") : document.body.classList.remove("overflow-hidden")

  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 1) {
      setColorchange(true);
    }
    else {
      setColorchange(false);
    }
  };
  window.addEventListener('scroll', changeNavbarColor);

  const classNav = colorChange ? 'z-0 border-b sticky top-0 w-full border-b-slate-300 dark:border-b-slate-800 shadow-gray-300 dark:shadow-gray-900 shadow-md dark:shadow-xl ease-in-out duration-300' : 'ease-in-out duration-300'

  console.log(location.pathname)

  const content = (
    <>

      <header aria-label="Site Header" className="border-b dark:border-gray-800 w-full ml-52">
        <div
        className={`bg-white dark:bg-slate-900 sm:px-8 border flex ${classNav} h-32  items-center justify-between px-4 right-0`}
      >
      
        <div className="flex items-center">
     
          <button onClick={handleNav} type="button" className="pr-2 sm:mr-4 lg:hidden dark:text-gray-400">
            <AiOutlineMenu size={25} /> 
          </button>
      
          
          <p className="flex">
            <Link to={'/dash'} >
              <span className="sr-only">Logo</span>
              <span className="inline-block text-gray-700 dark:text-gray-200  text-2xl font-semibold">
              { location.pathname === '/dash'
              ? 'Dashboard'
              :  'Settings'
              }
              </span>
            </Link>
          </p>

        </div>

        <div>
          <Navbar />
        </div>
      </div>
        

      <Outlet />

      
    
      </header>

      {/* <ul className={nav ? 'fixed z-40 left-0 top-0 w-full h-full bg-white dark:bg-slate-900 ease-in-out duration-300 text-md font-medium' : 'z-20 top-0 w-full h-full ease-in-out duration-300 fixed left-[-100%]'}>
          <div className='flex w-full  p-4  text-gray-700 dark:text-gray-300 font-bold justify-between border-b border-b-gray-300 dark:border-b-gray-800'>

            <p onClick={handleNav} className='cursor-pointer  flex items-center'>
              {<BsArrowLeftShort size={30} />}
            </p>
            <Link to='/dash'>
              <h1 onClick={handleNav} className='text-xl mr-4 cursor-pointer'>HR</h1>
            </Link>
          </div>


          <Link to='/dash'>
            <li onClick={handleNav} className='p-4 flex justify-center cursor-pointer text-slate-700 dark:text-slate-300 border-b border-b-gray-200 dark:border-b-gray-800'>
              Dashboard
            </li>
          </Link>



          <Link to='/dash/users'>
            <li onClick={handleNav} className='p-4 flex justify-center  cursor-pointer text-slate-700 dark:text-slate-300 border-b border-b-gray-300 dark:border-b-gray-800'>
              Employees
            </li>
          </Link>

          <Link to='/dash/notes'>
            <li onClick={handleNav} className='p-4 flex justify-center  cursor-pointer text-slate-700 dark:text-slate-300 border-b border-b-gray-300 dark:border-b-gray-800'>
              Task List
            </li>
          </Link>

        </ul> */}

     
    </>
  )

  return content
}

export default DashHeader