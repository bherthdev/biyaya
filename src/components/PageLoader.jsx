import React from 'react'
import Spenner from './Spenner'
import biyayaLogo from "../assets/biyaya_logo.png";

const pageLoader = () => {
    return (
        //     <div className="flex items-center justify-center h-screen p-5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-400 w-screen">
        //         <div className="flex space-x-2">
        //             <Spenner />
        //             <div className='m-auto'>Loading ...</div>
        //         </div>
        //     </div>
        // 

        <div className="w-full  flex flex-col items-center justify-start mt-20">
            <div className=" overflow-x-auto border-gray-400  dark:border-gray-800  rounded-2xl overflow-hidden">
                <div className="flex flex-col items-center px-10 py-8 sm:py-10 sm:px-28">

                    <img src={biyayaLogo} className='animate-bounce  h-[80px] xl:h-[110px] mx-auto ' />
                    <div className="flex space-x-2 animate-pulse">
                        {/* <span className='mr-3 border-t-transparent border-solid animate-spin  rounded-full border-gray-500 border-2 h-6 w-6'></span> */}

                        <div className='m-auto text-sm sm:text-lg text-gray-700'>Loading ...</div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center text-center items-center gap-2 mt-16">
                        <p className="text-xs font-thin text-gray-400 dark:text-gray-400">Designed and developed by: </p>

                        <a href='https://www.tyingknotworks.com/'
                            target='_blank' rel='noreferrer noopener'
                            className=" font-normal text-xs text-gray-400"
                        >
                            TyingKnot Works
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default pageLoader