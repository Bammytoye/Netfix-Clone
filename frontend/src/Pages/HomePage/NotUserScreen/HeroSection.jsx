import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router';

function HeroSection() {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/register?email=' + email)

        // console.log(email)
    }

    return (
        <div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'>
            <h1 className='text-4xl md:text-6xl font-bold mb-4'>
                Unlimited movies, TV shows, and more
            </h1>
            <p className='mb-4 text-lg'>Watch anywhere. Cancel anytime</p>
            <p className='mb-4'>Ready to watch? Enter your email to create or restart your membership</p>

            <form action=""
                onSubmit={handleSubmit}
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
                    <ChevronRight className='size-4 md:size-5' />
                </button>
            </form>
        </div>
    )
}

export default HeroSection