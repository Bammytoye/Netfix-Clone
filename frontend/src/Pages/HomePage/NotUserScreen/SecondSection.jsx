import React from 'react'

function SecondSection() {
    return (
        <div className='py-10 bg-black text-white'>
            <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row-reverse flex-col px-4 md:px-2'>
                {/* left side */}
                <div className='flex-1 text-center md:text-left'>
                    <h1 className='text-4xl md:text-5xl font-bold mb-4'>
                        Download your shows to watch offline
                    </h1>

                    <p className='text-md md:text-lg text-gray-400'>
                        Save your favorites easily and always have something to watch.
                    </p>
                </div>

                {/* right side */}
                <div className='flex-1 relative'>
                    <img src="/tv1.png" alt="tv image" className='mt-4'/>

                    <video className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10'
                        playsInline
                        autoPlay={true}
                        muted
                        loop
                    >
                        <source src='/tv.mp4' type='video/mp4'/>
                    </video>
                </div>
            </div>
        </div>
    )
}

export default SecondSection