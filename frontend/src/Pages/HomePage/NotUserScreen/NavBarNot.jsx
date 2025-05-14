import React from 'react'
import { Link } from 'react-router-dom'

function NavBarNot() {
    return (
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
            <img src="/netflix_logo.png" alt="Background Image" className='w-16 md:w-32' />
            <Link
                to={'/login'}
                className='text-white bg-red-600 hover:bg-red-700 py-1 px-2 rounded'
            >
                Log in
            </Link>
        </header>
    )
}

export default NavBarNot