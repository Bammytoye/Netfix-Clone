import React from 'react'
import { useState } from 'react'
import { useContentStore } from '../../store/content';
import NavBar from '../../components/NavBar';
import { SearchCheck } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { ORIGINAL_IMG_BASE_URL } from '../../utils/constant';

function Search() {
    const [activeTab, setActiveTab] = useState('movie');
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const { setContentType } = useContentStore();
    const [inputError, setInputError] = useState('');

    const handleTabClick = (tab) => {
        setActiveTab(tab)
        tab === 'movie' ? setContentType('movie') : setContentType('tv')
        setResults([]);
    }

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchTerm || searchTerm.trim() === '') {
            setInputError('Search field cannot be empty');
            setTimeout(() => {
                setInputError('');
            }, 3000); // clear after 3 seconds
            return;
        } else {
            setInputError('');
        }

        try {
            const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
            setResults(res.data.content);
        } catch (error) {
            if (error.response?.status === 400) {
                toast.error('Nothing found, make sure you are searching under the right category');
            } else {
                toast.error('Something went wrong, please try again later');
            }
        }
    }

    console.log('results:', results)

    return (
        <div className='bg-black min-h-screen text-white'>
            <NavBar />

            <div className='container mx-auto px-4 py-8'>
                <div className='flex justify-center gap-3 mb-4'>
                    <button className={`py-2 px-4 rounded ${activeTab === 'movie' ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-700`}
                        onClick={() => handleTabClick('movie')}
                    >
                        Movies
                    </button>

                    <button
                        className={`py-2 px-4 rounded ${activeTab === 'tv' ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-700`}
                        onClick={() => handleTabClick('tv')}
                    >
                        Tv Shows
                    </button>

                    <button
                        className={`py-2 px-4 rounded ${activeTab === 'person' ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-700`}
                        onClick={() => handleTabClick('person')}
                    >
                        Person
                    </button>
                </div>

                <form className='flex gap-2 items-stretch mb-6 max-w-2xl mx-auto'
                    onSubmit={handleSearch}
                >
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={'Search for a ' + activeTab}
                        className='w-full p-2 rounded-lg bg-gray-800 text-white'
                    />

                    <button className='bg-red-600 hover:bg-red-800 text-white p-2 rounded-lg'>
                        <SearchCheck className='w-6 h-6' />
                    </button>
                </form>

                {inputError && (
                    <p className="text-red-500 text-sm -mt-4 flex justify-center mx-auto ">{inputError}</p>
                )}

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {
                        results.map((result) => {
                                if (!result.poster_path && !result.profile_path) return null;

                                return activeTab === 'person' ? (
                                    <div
                                        key={result.id}
                                        className='flex flex-col items-center'
                                    >
                                        <img
                                            src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                                            alt={result.name}
                                            className='max-h-96 rounded-lg mx-auto'
                                        />
                                        <h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
                                    </div>
                                ) : (
                                    <Link
                                        key={result.id}
                                        to={'/watch/' + result.id}
                                        onClick={() => {setContentType(activeTab)}}
                                        className='flex flex-col'
                                    >
                                        <img
                                            src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                                            alt={result.title || result.name}
                                            className='w-full h-auto rounded-lg'
                                        />
                                        <h2 className='mt-2 text-xl font-bold'>
                                            {result.title || result.name}
                                        </h2>
                                    </Link>
                                );
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Search