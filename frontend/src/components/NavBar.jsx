import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/AuthUser'
import { Search, Menu, LogOut } from 'lucide-react'
import { useContentStore } from '../store/content'

function NavBar() {
    const [ isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuthStore()
    const { setContentType } = useContentStore()

    // console.log(contentType)

    const toggleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
            <div className='flex items-center gap-10 z-50'>
                <Link to='/' >
                    <img src='/netflix_logo.png' alt='Netflix Logo' className='w-16 md:w-32' />
                </Link>

                    {/* desktop */}
                <div className='hidden sm:flex gap-4 items-center'>
                    <Link to='/' className='hover:underline' onClick={() => setContentType('movie')}>
                        Movies
                    </Link>

                    <Link to='/' className='hover:underline' onClick={() => setContentType('tv')}>
                        Tv Shows
                    </Link>

                    <Link to='/history' className='hover:underline'>
                        Search History
                    </Link>
                </div>
            </div>

            <div className='flex items-center gap-5 z-50'>
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