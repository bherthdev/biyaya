import React from 'react'
import Spenner from './Spenner'

const pageLoader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen p-5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-400 min-w-screen">
            <div className="flex space-x-2">
                <Spenner />
                <div className='m-auto'>Loading ...</div>
            </div>
        </div>
    )
}

export default pageLoader