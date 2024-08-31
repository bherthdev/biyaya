import React from 'react'

const MenuItem = ({ icon: Icon, label, path, toggleSideMenu, isActive, onClick }) => {
    return (
        <div
            className={`${isActive && "border-r-[4px] border-r-black bg-gray-200" 
                } px-4 py-4 cursor-pointer font-sans font-medium text-gray-700 hover:bg-gray-200`}
            onClick={onClick}
        >
            <div className={`flex gap-5 ${!toggleSideMenu && "group relative"} items-center`}>
                <div className="text-gray-500">
                    <Icon size={25} />
                </div>
                <div className={`${toggleSideMenu ? "hidden sm:flex" : "text-[0px]"} text-md tracking-wide ease-in-out duration-300`}>
                    {label}
                </div>
                {!toggleSideMenu && (
                    <span className="invisible absolute start-full top-[48%] ms-2 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                        {label}
                    </span>
                )}
            </div>
        </div>
    )
}

export default MenuItem