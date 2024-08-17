import { AiOutlineDashboard } from "react-icons/ai";
import biyayaLogo from "../../src/assets/biyaya_logo.png";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { MdOutlineInventory } from "react-icons/md";
import { IoReceiptOutline, IoSettingsOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";
import Spinner from "./Spenner";
import PageError from "./PageError";
import MenuItem from "./MenuItem";
import { IoIosLogOut } from "react-icons/io";

export const SideMenu = ({ toggleSideMenu, setToggleSideMenu, setHeaderName, setToggleCart }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [sendLogout, { isLoading, isError, error }] = useSendLogoutMutation();

  const navigateMenu = (menuName) => {
    navigate(menuName);
    setHeaderName(menuName);
    setToggleCart(menuName === "/pos");
  };

  const logOutUser = async () => {
    const logout = await sendLogout();
    if (logout?.data) navigate("/");
  };

  if (isError) return <PageError error={error?.data?.message} />;

  const classToggleSideMenu = toggleSideMenu ? "w-16 sm:w-44" : "w-16";

  return (
    <div className={`z-40 flex h-full fixed ${classToggleSideMenu} flex-col justify-between border-e bg-white ease-in-out duration-300`}>
      <div className={`${toggleSideMenu ? "py-7 sm:py-6" : "py-12"} ease-in-out duration-300`}>
        <div
          className={`cursor-pointer mx-auto w-10 ${toggleSideMenu ? "sm:w-20" : ""} rounded-lg text-xs text-gray-600`}
          onClick={() => setToggleSideMenu(!toggleSideMenu)}
        >
          <img src={biyayaLogo} alt="Logo" />
        </div>

        <ul className={`${toggleSideMenu ? "mt-10 sm:mt-6" : "mt-10"} ease-in-out duration-300`}>
          <MenuItem
            icon={AiOutlineDashboard}
            label="Dashboard"
            path="/dashboard"
            toggleSideMenu={toggleSideMenu}
            isActive={location.pathname === "/dashboard"}
            onClick={() => navigateMenu("/dashboard")}
          />
          <MenuItem
            icon={BsFillMenuButtonWideFill}
            label="POS"
            path="/pos"
            toggleSideMenu={toggleSideMenu}
            isActive={location.pathname === "/pos"}
            onClick={() => navigateMenu("/pos")}
          />
          {isAdmin && (
            <>
              <MenuItem
                icon={MdOutlineInventory}
                label="Inventory"
                path="/inventory"
                toggleSideMenu={toggleSideMenu}
                isActive={
                  location.pathname.startsWith("/inventory") || location.pathname === "/inventory/new"
                }
                onClick={() => navigateMenu("/inventory")}
              />
              <MenuItem
                icon={IoReceiptOutline}
                label="Orders"
                path="/orders"
                toggleSideMenu={toggleSideMenu}
                isActive={location.pathname.startsWith("/orders") || location.pathname === "/orders/new"}
                onClick={() => navigateMenu("/orders")}
              />
              <MenuItem
                icon={IoSettingsOutline}
                label="Settings"
                path="/settings"
                toggleSideMenu={toggleSideMenu}
                isActive={location.pathname.startsWith("/settings") || location.pathname === "/settings/new"}
                onClick={() => navigateMenu("/settings")}
              />
            </>
          )}
        </ul>
      </div>
      <div
        className={`border-r-gray-800  cursor-pointer hover:bg-gray-100 font-sans font-medium text-gray-700 sticky inset-x-0 bottom-0 border-t border-gray-100`}
        onClick={logOutUser}
      >
        {isLoading ? (
          <div className="flex text-gray-500 justify-center py-4 font-normal dark:text-gray-300 text-xs h-full w-full items-center p-2">
            <Spinner />
            <p className="hidden sm:flex">Logging Out...</p>
          </div>
        ) : (
          <MenuItem
            icon={IoIosLogOut}
            label="Logout"
            toggleSideMenu={toggleSideMenu}
            isActive={false}
          />
        )}
      </div>
    </div>
  );
};
