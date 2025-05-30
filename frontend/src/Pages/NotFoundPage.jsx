import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gray-700 flex items-center justify-center px-4 py-10">
            <div className="text-center max-w-xl">
                <img
                    src="/404.png"
                    alt="404 Illustration"
                    className="mx-auto mb-8 w-64 h-auto"
                />

                <h2 className="text-2xl font-semibold text-white mt-4">Page Not Found</h2>
                <p className="text-gray-400 mt-2">
                    Oops! The page you are looking for does not exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="mt-6 inline-block px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage
