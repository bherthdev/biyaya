import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import { SideMenu } from "./SideMenu";
import { useState } from "react";


const DashLayout = () => {

  const [toggleSideMenu, setToggleSideMenu] = useState(true)
  const [headerName, setHeaderName] = useState(location.pathname)

 
  const classToggleSideMenu = toggleSideMenu ? `ml-44 ease-in-out duration-300` : `ml-16 ease-in-out duration-300`

  return (
    <>
      <div className="flex">
        <SideMenu toggleSideMenu={toggleSideMenu} setToggleSideMenu={setToggleSideMenu} setHeaderName={setHeaderName} />
        <div aria-label="Site Header" className={`${classToggleSideMenu} border-b dark:border-gray-800 bg-gray-100 h-full w-full`}>
           <DashHeader toggleSideMenu={toggleSideMenu} headerName={headerName} />
            
          <Outlet />
        </div>
      </div>
    </>
  )
};

export default DashLayout;
