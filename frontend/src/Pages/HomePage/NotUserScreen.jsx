import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

function NotUserScreen() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(email)
    }

    return (
        <div className='hero-bg relative bg-cover bg-center bg-no-repeat w-full'>
            {/* Navbar */}
            <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
                <img src="/netflix_logo.png" alt="Background Image" className='w-16 md:w-32' />
                <Link
                    to={'/login'}
                    className='text-white bg-red-600 hover:bg-red-700 py-1 px-2 rounded'
                >
                    Log in
                </Link>
            </header>

            {/* hero section */}
            <div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'>
                <h1 className='text-4xl md:text-6xl font-bold mb-4'>
                    Unlimited movies, TV shows, and more
                </h1>
                <p className='mb-4 text-lg'>Watch anywhere. Cancel anytime</p>
                <p className='mb-4'>Ready to watch? Enter your email to create or restart your membership</p>

                <form action=""
                    onClick={handleSubmit}
                    className='flex flex-col md:flex-row gap-4 w-1/2'
                >
                    <input
                        type="email"
                        id='email'
                        placeholder='Email Address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='p-2 border flex-1 border-gray-700 rounded text-white bg-black/80 outline-none'
                    />

                    <button className='bg-red-600 hover:bg-red-700 text-xl lg:text-xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center gap-1'>
                        Get Started
                        <ChevronRight className='size-4 md:size-5'/>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default NotUserScreen