import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContentStore } from '../../store/content';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player';
import { ORIGINAL_IMG_BASE_URL } from '../../utils/constant';

function formatReleaseDate(date) {
    return new Date(date).toLocaleDateString('em-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

function WatchPage() {
    const { id } = useParams();
    const { contentType } = useContentStore();

    const [trailers, setTrailers] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({});

    useEffect(() => {
        const getTrailers = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
                setTrailers(res.data.trailers || []);
            } catch (error) {
                if (error.message.includes('404')) {
                    setTrailers([])
                }
            } finally {
                setLoading(false);
            }
        };

        const getDetails = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
                console.log(res.data)
                setContent(res.data.details);
            } catch (error) {
                if (error.message.includes('404')) {
                    setContent(null);
                }
            }
        };

        const getSimilar = async () => {
            try {
                const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
                setSimilar(res.data.similar || []);
            } catch (error) {
                if (error.message.includes('404')) {
                    setTrailers([])
                }
            } finally {
                setLoading(false);
            }
        };

        const fetchAll = async () => {
            setLoading(true);
            await Promise.all([getTrailers(), getDetails(), getSimilar()]);
            setLoading(false);
        };

        fetchAll();
    }, [contentType, id]);

    const handleNext = () => {
        if (currentTrailerIndex < trailers.length - 1) {
            setCurrentTrailerIndex((prev) => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentTrailerIndex > 0) {
            setCurrentTrailerIndex((prev) => prev - 1)
        }
    }

    if (loading) {
        return <div className="text-white p-10">Loading...</div>;
    }

    return (
        <div className="bg-black min-h-screen text-white">
            <div className='mx-auto container px-4 pb-8 h-full'>
                <NavBar />

                {trailers.length > 0 && (
                    <div className='flex justify-between items-center mt-4 mb-3'>
                        {/* Left (Previous) Button */}
                        <button
                            className={`bg-gray-500/70 hover:bg-gray-700 text-white py-2 px-4 rounded-lg ${currentTrailerIndex === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                            onClick={() => setCurrentTrailerIndex((prev) => Math.max(prev - 1, 0))}
                            disabled={currentTrailerIndex === 0}
                        >
                            <ChevronLeft size={24}
                                onClick={handlePrev}
                            />
                        </button>

                        {/* Right (Next) Button */}
                        <button
                            className={`bg-gray-500/70 hover:bg-gray-700 text-white py-2 px-4 rounded-lg ${currentTrailerIndex === trailers.length - 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                            onClick={() => setCurrentTrailerIndex((prev) => Math.min(prev + 1, trailers.length - 1))}
                            disabled={currentTrailerIndex === trailers.length - 1}
                        >
                            <ChevronRight size={24}
                                onClick={handleNext}
                            />
                        </button>
                    </div>
                )}

                <div className='aspect-video mb-1 p-2 sm:px-10 md:px-32'>
                    {trailers.length > 0 ? (
                        <ReactPlayer
                            controls={true}
                            width={'100%'}
                            height={'70vh'}
                            className='mx-auto overflow-hidden rounded-lg'
                            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex]?.key}`}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-[70vh] text-center text-gray-400 text-xl">
                            <h2>
                                No trailers available for&nbsp;
                                <span className="font-bold text-red-600">
                                    {content?.title || content?.name}
                                </span> 😷
                            </h2>
                        </div>

                    )}
                </div>

                <div className='flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto'>
                    <div className='mb-4 md:mb-0'>
                        <h2 className='text-5xl font-bold text-balance'>
                            {content?.title || content?.name}
                        </h2>

                        <p className='mt-2 text-lg'>
                            {formatReleaseDate(content?.release_date || content?.first_air_date)} | {' '}
                            {content?.adult ? (
                                <span className='text-red-600'>18+</span>
                            ) : (
                                <span className='text-green-600'>PG +13</span>
                            )} {' '}
                        </p>
                        <p className='mt-4 text-lg text-justify line-clamp-5'>{content?.overview}</p>
                    </div>

                    <img src={ORIGINAL_IMG_BASE_URL + content.poster_path}
                        alt='Poster Image'
                        className='max-h-[600px] rounded-lg'
                    />
                </div>
            </div>
        </div>
    );
}

export default WatchPage;
