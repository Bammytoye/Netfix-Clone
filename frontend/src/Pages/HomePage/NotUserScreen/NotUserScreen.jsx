import React from 'react'
import NavBarNot from './NavBarNot'
import HeroSection from './HeroSection'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'
import FourSection from './FourSection'

function NotUserScreen() {


    return (
        <div className='hero-bg relative bg-cover bg-center bg-no-repeat w-full'>
            <NavBarNot />
            <HeroSection />

            <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

            <FirstSection />

            <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

            <SecondSection />

            <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

            <ThirdSection />

            <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

            <FourSection />
        </div>
    )
}

export default NotUserScreen