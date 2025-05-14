import React from 'react'

function FourSection() {
    return (
        <div className='py-10 bg-black text-white'>
            <div className='flex max-w-6xl mx-auto items-center gap-4 justify-center md:flex-row-reverse flex-col px-4 md:px-2'>
                {/* left side */}
                <div className='flex-1 text-center md:text-left'>
                    <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                        Create profile for kids 
                    </h1>

                    <p className='text-md md:text-lg text-gray-400'>
                        Send kids on adventures with their favorites characters in a space made just for them - free
                        with your membership.
                    </p>
                </div>

                {/* right side */}
                <div className='flex-1'>
                    <img src="/kid.png" alt="tv image" className='mt-4 w-full '/>
                </div>
            </div>
        </div>
    )
}

export default FourSection