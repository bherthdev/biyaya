import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import { SideMenu } from "./SideMenu";
import { useState } from "react";


const DashLayout = () => {

  const [toggleSideMenu, setToggleSideMenu ] = useState(false)
  const [headerName, setHeaderName] = useState(location.pathname)


  return (
    <>
      
        <div className="flex">
          <SideMenu toggleSideMenu={toggleSideMenu} setToggleSideMenu={setToggleSideMenu} setHeaderName= {setHeaderName}/>
          <DashHeader toggleSideMenu={toggleSideMenu} headerName={headerName} />
        </div>
    </>
  )
};

export default DashLayout;
