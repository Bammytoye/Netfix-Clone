import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/AuthUser';

function SignUp() {
    const {searchParams} = new URL(document.location)
    const emailValue = searchParams.get('email')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState(emailValue || '')
    const [password, setPassword] = useState('')

    const { signup, isSigningUp } = useAuthStore()


    const handleSubmit = (e) => {
        e.preventDefault()
        signup({firstName, lastName, userName, email, password})
    }

    return (
        <div className='hero-bg h-screen bg-cover bg-center bg-no-repeat w-full'>
            <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
                <Link to={'/'}>
                    <img src="/netflix_logo.png" alt="Netflix Logo" className='w-28 md:w-32' />
                </Link>
            </header>

            <div className='flex justify-center items-center px-4 sm:px-6 md:px-10 py-4'>
                <div className='w-full max-w-md sm:max-w-lg md:max-w-[950px] p-6 sm:p-8 space-y-6 bg-black/70 rounded-lg shadow-md'>
                    <h1 className='text-center text-white text-2xl font-semibold'>
                        Register
                    </h1>

                    <form action="" className='space-y-4' onSubmit={handleSubmit}>
                        {/* Form Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className='text-sm font-medium text-gray-300 block'>
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id='firstName'
                                    placeholder='Bammy'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-lg bg-transparent text-white focus:outline-none focus:ring'
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className='text-sm font-medium text-gray-300 block'>
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id='lastName'
                                    placeholder='Toye'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-lg bg-transparent text-white focus:outline-none focus:ring'
                                />
                            </div>

                            <div>
                                <label htmlFor="userName" className='text-sm font-medium text-gray-300 block'>
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id='userName'
                                    placeholder='zeke123'
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-lg bg-transparent text-white focus:outline-none focus:ring'
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className='text-sm font-medium text-gray-300 block'>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id='email'
                                    placeholder='zeke@example.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-lg bg-transparent text-white focus:outline-none focus:ring'
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="password" className='text-sm font-medium text-gray-300 block'>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id='password'
                                    placeholder='*******'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-lg bg-transparent text-white focus:outline-none focus:ring'
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                        disabled={isSigningUp}
                        className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors'>
                            { isSigningUp ? 'Loading...' : 'Register'}
                        </button>
                    </form>

                    <div className='text-center text-gray-400'>
                        Already a member?{' '}
                        <Link to="/login" className='text-red-600 hover:underline'>
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
