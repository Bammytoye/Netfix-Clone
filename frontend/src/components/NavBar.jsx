import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/AuthUser'
import { Search, Menu, LogOut } from 'lucide-react'
import { useContentStore } from '../store/content'

function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout } = useAuthStore()
    const { setContentType, contentType } = useContentStore() // Get current content type
    const location = useLocation()

    const toggleOpen = () => setIsOpen(!isOpen)

    const isRoute = (path) => location.pathname.startsWith(path)

    return (
        <header className="text-white w-full shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4 h-20">
                <div className="flex items-center gap-6">
                    <Link to="/">
                        <img src="/netflix_logo.png" alt="Netflix Logo" className="w-16 md:w-32" />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden sm:flex gap-6 text-md font-medium">
                        <Link
                            to="/"
                            onClick={() => setContentType('movie')}
                            className={`transition duration-200 ${contentType === 'movie' && isRoute('/') ? 'text-red-500' : 'hover:text-red-500'}`}
                        >
                            Movies
                        </Link>
                        <Link
                            to="/"
                            onClick={() => setContentType('tv')}
                            className={`transition duration-200 ${contentType === 'tv' && isRoute('/') ? 'text-red-500' : 'hover:text-red-500'}`}
                        >
                            TV Shows
                        </Link>
                        <Link
                            to="/history"
                            className={`transition duration-200 ${isRoute('/history') ? 'text-red-500' : 'hover:text-red-500'}`}
                        >
                            Search History
                        </Link>
                    </nav>
                </div>

                <div className="flex items-center gap-5">
                    <Link to="/search">
                        <Search className={`size-6 cursor-pointer transition ${isRoute('/search') ? 'text-red-500' : 'hover:text-red-500'}`} />
                    </Link>

                    {user?.image && (
                        <img
                            src={user.image}
                            alt="Avatar"
                            className="h-8 w-8 rounded-full object-cover border border-gray-700 shadow-md"
                        />
                    )}

                    <LogOut
                        className="size-6 cursor-pointer hover:text-red-500 transition"
                        onClick={logout}
                        title="Logout"
                    />

                    {/* Mobile menu toggle */}
                    <div className="sm:hidden">
                        <Menu
                            className="size-6 cursor-pointer hover:text-red-500 transition"
                            onClick={toggleOpen}
                        />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="sm:hidden px-4 pb-4 animate-fade-in-down">
                    <div className="flex flex-col bg-gray-900 rounded-lg border border-gray-800 divide-y divide-gray-700 overflow-hidden">
                        <Link
                            to="/"
                            onClick={() => {
                                setContentType('movie')
                                toggleOpen()
                            }}
                            className={`px-4 py-3 transition ${contentType === 'movie' ? 'text-red-500' : 'hover:bg-gray-800'}`}
                        >
                            Movies
                        </Link>
                        <Link
                            to="/"
                            onClick={() => {
                                setContentType('tv')
                                toggleOpen()
                            }}
                            className={`px-4 py-3 transition ${contentType === 'tv' ? 'text-red-500' : 'hover:bg-gray-800'}`}
                        >
                            TV Shows
                        </Link>
                        <Link
                            to="/history"
                            onClick={toggleOpen}
                            className={`px-4 py-3 transition ${isRoute('/history') ? 'text-red-500' : 'hover:bg-gray-800'}`}
                        >
                            Search History
                        </Link>
                    </div>
                </div>
            )}
        </header>
    )
}

export default NavBar
