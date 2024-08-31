import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import { SideMenu } from "./SideMenu";
import { useState } from "react";
import { Cart } from "../features/pos/Cart";


const DashLayout = () => {



  const [toggleSideMenu, setToggleSideMenu] = useState(true)
  const [toggleCart, setToggleCart] = useState(location.pathname == '/pos')
  const [headerName, setHeaderName] = useState(location.pathname)


  const classToggleSideMenu = toggleSideMenu ? `ml-16 sm:ml-44 ease-in-out duration-300` : `ml-16 ease-in-out duration-300`
  const classToggleCart = toggleCart ? 'mr-0 sm:mr-80  ease-in-out duration-300' : 'mr-0 ease-in-out duration-300'

  return (
    <>
      <div className="flex ">
        <SideMenu toggleSideMenu={toggleSideMenu} setToggleSideMenu={setToggleSideMenu} setHeaderName={setHeaderName} setToggleCart={setToggleCart} />
        <div aria-label="Site Header" className={`${classToggleSideMenu} ${classToggleCart} dark:border-gray-800 h-full w-full`}>
          <DashHeader toggleSideMenu={toggleSideMenu} headerName={headerName} toggleCart={toggleCart} />

          <Outlet />
        </div>
        {/* <Cart toggleCart={toggleCart} orderItems={orderItems} orderTransac={orderTransac} setOrdersItems={setOrdersItems}/> */}

        {/* <ToastContainer />
        <Cart toggleCart={toggleSideMenu} toggleCartMobile={toggleSideMenu} setToggleCartMobile={setToggleCartMobile} enableSaveOrder={enableSaveOrder} setEnableSaveOrder={setEnableSaveOrder} placeOrder={placeOrder} setPlaceOrder={setPlaceOrder} /> */}

      </div>
    </>
  )
};

export default DashLayout;
