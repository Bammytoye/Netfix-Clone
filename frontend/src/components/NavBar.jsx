import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/AuthUser'
import { Search, Menu, LogOut } from 'lucide-react'

function NavBar() {
    const [ isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuthStore()

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
            <div className='flex items-center ga-10 z-50'>
                <Link to='/' >
                    <img src='/netflix_logo.png' alt='Netflix Logo' className='w-16 md:w-32' />
                </Link>

                    {/* desktop */}
                <div className='hidden sm:flex gap-2 items-center'>
                    <Link to='/' className='hover:underline'>
                        Movies
                    </Link>

                    <Link to='/' className='hover:underline'>
                        Tv Shows
                    </Link>

                    <Link to='/history' className='hover:underline'>
                        Search History
                    </Link>
                </div>
            </div>

            <div className='flex items-center gap-2 z-50'>
                <Link to='search' >
                    <Search  className='size-6 cursor-pointer'/>
                </Link>

                <img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer'/>
                <LogOut className='size-6 cursor-pointer'  onClick={logout}/>

                <div className='sm:hidden'>
                    <Menu className='size-6 cursor-pointer' onClick={toggleOpen}/>
                </div>
            </div>    

            {/* mobile screen */}
            {
                isOpen && (
                    <div className='w-full sm:hidden mt-4 z-50 bg-black rounded border-gray-800'>
                        <Link to={'/'}
                            className='block hover:underline p-2'
                            onClick={toggleOpen}
                        >
                            Movies
                        </Link>

                        <Link to={'/'}
                            className='block hover:underline p-2'
                            onClick={toggleOpen}
                        >
                            Tv Shows
                        </Link>

                        <Link to={'/search'}
                            className='block hover:underline p-2'
                            onClick={toggleOpen}
                        >
                            Search History
                        </Link>
                    </div>
                )
            }
        </header>
    )
}

export default NavBar