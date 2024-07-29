import { Outlet } from "react-router-dom";
import DashHeader from "./DashHeader";
import { SideMenu } from "./SideMenu";


const DashLayout = () => {


  return (
    <>
      
        <div className="flex">
          <SideMenu />
          <DashHeader />
        </div>
    </>
  )
};

export default DashLayout;
