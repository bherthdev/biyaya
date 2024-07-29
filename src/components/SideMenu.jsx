
import { AiOutlineDashboard } from "react-icons/ai";
import biyayaLogo from "../../src/assets/biyaya_logo.png";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { MdOutlineInventory } from "react-icons/md";
import { IoReceiptOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


export const SideMenu = () => {
  const navigate = useNavigate();

  return (
    <>

      <div className="flex h-full fixed w-52 flex-col justify-between border-e bg-white z-30">
        <div className=" py-6">
          <div className=" mx-auto w-20  rounded-lg text-xs text-gray-600">
            <img src={biyayaLogo} className='' />
          </div>

          <ul className="mt-6  ">
            <li className={
            location.pathname === '/dash'
            ? `flex gap-5 items-center rounded border-r-[4px] border-r-gray-800 bg-gray-100 px-4 py-4 cursor-pointer`
            : `flex gap-5 items-center  border-r-gray-800  px-4 py-4 cursor-pointer hover:bg-gray-100`
            }>
             
              <div className="text-gray-500">
                <AiOutlineDashboard size={25} />
              </div>
              <div
                  onClick={() => navigate("/dash")}
                className="font-sans text-md font-medium tracking-wide text-gray-700 "
              >
                Dashboard
              </div>
            </li>

            <li className="flex gap-5 items-center  border-r-gray-800  px-4 py-4 cursor-pointer hover:bg-gray-100">
              <div className="text-gray-500">
                <BsFillMenuButtonWideFill size={25} />
              </div>
              <a
                href="#"
                className="font-sans text-md font-medium tracking-wide text-gray-700 "
              >
                POS
              </a>
            </li>

            <li className="flex gap-5 items-center  border-r-gray-800  px-4 py-4 cursor-pointer hover:bg-gray-100">
              <div className="text-gray-500">
                <MdOutlineInventory size={25} />
              </div>
              <a
                href="#"
                className="font-sans text-md font-medium tracking-wide text-gray-700 "
              >
                Inventory
              </a>
            </li>

            <li className="flex gap-5 items-center  border-r-gray-800  px-4 py-4 cursor-pointer hover:bg-gray-100">
              <div className="text-gray-500">
                <IoReceiptOutline size={25} />
              </div>
              <a
                href="#"
                className="font-sans text-md font-medium tracking-wide text-gray-700 "
              >
                Orders
              </a>
            </li>

         

            <li className={
              location.pathname === '/dash/users'
              ? `border-r-gray-800  px-4 py-4 cursor-pointer bg-gray-100 border-r-[4px] `
              : `border-r-gray-800  px-4 py-4 cursor-pointer hover:bg-gray-100`
              }>

              <details className="group [&_summary::-webkit-details-marker]:hidden ">

                <summary
                  className={ `flex  gap-5  cursor-pointer items-center  rounded-lg  text-gray-700 hover:bg-gray-100 hover:text-gray-700`
                 }
                  
                >
                  <div className="text-gray-500">
                    <IoSettingsOutline size={25} />
                  </div>
                  <span className="text-md font-medium "> Settings </span>

                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-9">
                  <li  onClick={() => navigate("/dash/users")}>
                    <div
                   
                      className="block rounded-lg px-4 py-2 cursor-pointer text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Users
                    </div>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    >
                      Categories
                    </a>
                  </li>
                </ul>
              </details>
            </li>



          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">Eric Frusciante</strong>

                <span> eric@frusciante.com </span>
              </p>
            </div>
          </a>
        </div>
      </div>

    </>
  )
}
