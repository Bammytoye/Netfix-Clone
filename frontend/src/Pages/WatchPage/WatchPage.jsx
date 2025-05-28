import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContentStore } from '../../store/content';
import axios from 'axios';
import NavBar from '../../components/NavBar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../../utils/constant';
import { formatReleaseDate } from '../../utils/dateFunction';
import WatchSkeleton from '../../components/Skeletons/WatchSkeleton';

function WatchPage() {
    const { id } = useParams();
    const { contentType } = useContentStore();

    const [trailers, setTrailers] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({});
    const scrollRef = useRef(null);
    const [showArrow, setShowArrow] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [trailersRes, detailsRes, similarRes] = await Promise.all([
                    axios.get(`/api/v1/${contentType}/${id}/trailers`),
                    axios.get(`/api/v1/${contentType}/${id}/details`),
                    axios.get(`/api/v1/${contentType}/${id}/similar`),
                ]);

                setTrailers(trailersRes.data.trailers || []);
                setContent(detailsRes.data.details);
                setSimilar(similarRes.data.similar || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [contentType, id]);

    useEffect(() => {
        const ref = scrollRef.current;
        const checkScroll = () => {
            if (!ref) return;
            setShowArrow(ref.scrollWidth > ref.clientWidth);
        };
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [similar]);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    };

    const handleNext = () => {
        if (currentTrailerIndex < trailers.length - 1) {
            setCurrentTrailerIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentTrailerIndex > 0) {
            setCurrentTrailerIndex(prev => prev - 1);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-black p-10">
            <WatchSkeleton />
        </div>;
    }

    return (
        <div className="bg-black min-h-screen text-white">
            <div className='mx-auto container px-4 pb-8 h-full'>
                <NavBar />

                {trailers.length > 0 && (
                    <div className='flex justify-between items-center mt-4 mb-3'>
                        <button
                            className={`bg-gray-500/70 hover:bg-gray-700 text-white py-2 px-4 rounded-lg ${currentTrailerIndex === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                            onClick={handlePrev}
                            disabled={currentTrailerIndex === 0}
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            className={`bg-gray-500/70 hover:bg-gray-700 text-white py-2 px-4 rounded-lg ${currentTrailerIndex === trailers.length - 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                            onClick={handleNext}
                            disabled={currentTrailerIndex === trailers.length - 1}
                        >
                            <ChevronRight size={24} />
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
                            )}
                        </p>
                        <p className='mt-4 text-lg text-justify line-clamp-5'>{content?.overview}</p>
                    </div>

                    <img src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
                        alt='Poster Image'
                        className='max-h-[600px] rounded-lg'
                    />
                </div>

                {similar.length > 0 && (
                    <div className='mt-10 max-w-5xl mx-auto relative'>
                        <h2 className='text-3xl font-bold mb-4'>
                            Similar Movies/Tv Shows
                        </h2>

                        <div className='flex overflow-x-scroll gap-4 pb-4 group scrollbar-hide scroll-smooth'
                            ref={scrollRef}>
                            {similar.map((item) => (
                                <Link to={`/watch/${item.id}`} key={item.id} className='w-52 flex-none'>
                                    <img src={SMALL_IMG_BASE_URL + item.poster_path}
                                        alt={item.title || item.name}
                                        className='w-full h-auto rounded-lg object-cover'
                                    />
                                    <h4 className='mt-2 text-lg font-semibold'>
                                        {item.title || item.name}
                                    </h4>
                                </Link>
                            ))}
                        </div>

                        {showArrow && (
                            <>
                                <button
                                    onClick={scrollLeft}
                                    className="absolute top-1/2 -translate-y-1/2 left-2 md:left-0 flex items-center justify-center size-10 md:size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                <button
                                    onClick={scrollRight}
                                    className="absolute top-1/2 -translate-y-1/2 right-2 md:right-0 flex items-center justify-center size-10 md:size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WatchPage;
