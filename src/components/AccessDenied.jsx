import React from 'react'

const AccessDenied = () => {
    return (
        <>
            <div className="grid h-full place-content-center  px-4">
                <div className="text-center mt-10">
                    <h1 className="text-9xl font-black text-gray-400">403</h1>

                    <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">Access Denied</p>

                    <p className="mt-4 text-gray-500">You don't have permission to access requested page.</p>

                    <a
                        href="/"
                        className="mt-6 inline-block rounded bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring"
                    >
                        Go Back Home
                    </a>
                </div>
            </div>
        </>
    )
}

export default AccessDenied