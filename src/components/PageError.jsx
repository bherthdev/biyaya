import React from 'react'
import { MdErrorOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PageError = ({error}) => {
    return (
        <div className="w-full  flex flex-col items-center justify-start mt-20">
            <div className=" overflow-x-auto border-gray-400  dark:border-gray-800  rounded-2xl overflow-hidden">
                <div className="flex flex-col items-center px-10 py-8 sm:py-10 sm:px-28">

                <div className="flex  text-sm flex-col gap-3  dark:bg-gray-900 text-red-700 dark:text-gray-400">
                    <div className="flex flex-col  m-auto ">
                      <div className="m-auto">
                        <MdErrorOutline size={30} />
                      </div>
                    </div>
                    <div className='m-auto text-center'>{error}</div>
                    <Link to="/">
                        <p className="mt-6 text-xs px-4 text-center py-2 text-white border dark:text-gray-300 font-normal border-gray-200 dark:border-slate-600 bg-black dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-slate-800 rounded-full duration-150">
                            Please Login Again</p>
                    </Link>
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

export default PageError