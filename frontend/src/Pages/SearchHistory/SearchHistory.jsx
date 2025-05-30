import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import { SMALL_IMG_BASE_URL } from '../../utils/constant'
import { Trash } from 'lucide-react'
import toast from 'react-hot-toast'

function formatDate(dateString) {
    const date = new Date(dateString)
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const month = monthNames[date.getUTCMonth()]
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()

    return `${month} ${day}, ${year}`
}

function SearchHistory() {
    const [searchHistory, setSearchHistory] = useState([])

    const fetchSearchHistory = async () => {
        try {
            const res = await axios.get(`/api/v1/search/history`)
            setSearchHistory(res.data.content || [])
        } catch (error) {
            console.error('Failed to fetch search history:', error)
            setSearchHistory([])
        }
    }

    const handleDelete = async (entry) => {
        try {
            await axios.delete(`/api/v1/search/history/${entry.id}`)
            setSearchHistory((prev) => prev.filter((item) => item.id !== entry.id))
            toast.success('Search entry deleted')
        } catch (error) {
            console.error('Delete error:', error)
            toast.error('Failed to delete search history')
        }
    }

    useEffect(() => {
        fetchSearchHistory()
    }, [])

    return (
        <div className='bg-black min-h-screen text-white'>
            <NavBar />

            <div className='max-w-6xl mx-auto px-4 py-8'>
                <h1 className='text-3xl font-bold mb-8'>Search History</h1>

                {searchHistory.length === 0 ? (
                    <div className='flex justify-center items-center h-96'>
                        <p className='text-xl text-gray-300'>No search history</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchHistory.map((entry) => (
                            <div
                                key={entry.id}
                                className="bg-gray-900 rounded-xl p-4 flex items-center space-x-4 shadow hover:shadow-lg transition-shadow duration-300"
                            >
                                <img
                                    src={SMALL_IMG_BASE_URL + entry.image}
                                    alt="History"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
                                />

                                <div className="flex flex-col flex-grow">
                                    <span className="text-white font-semibold text-lg truncate">{entry.title}</span>
                                    <span className="text-gray-400 text-sm">{formatDate(entry.createdAt)}</span>
                                </div>

                                <span
                                    className={`py-1 px-3 rounded-full text-sm font-medium text-white ml-4 whitespace-nowrap ${
                                        entry.searchType === 'movie'
                                            ? 'bg-red-600'
                                            : entry.searchType === 'tv'
                                            ? 'bg-blue-600'
                                            : 'bg-green-600'
                                    }`}
                                >
                                    {entry.searchType.charAt(0).toUpperCase() + entry.searchType.slice(1)}
                                </span>

                                <Trash
                                    className="size-5 ml-4 cursor-pointer hover:text-red-500 transition"
                                    onClick={() => handleDelete(entry)}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchHistory
