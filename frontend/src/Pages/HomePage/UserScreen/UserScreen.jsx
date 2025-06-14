import React, { useState } from 'react'
import NavBar from '../../../components/NavBar';
import { Link } from 'react-router-dom';
import { Info, Play } from 'lucide-react';
import useFetchTrending from '../../../hooks/useFetchTrending';
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from '../../../utils/constant';
import MovieSlider from '../../../components/MovieSlider';
import { useContentStore } from '../../../store/content';
import TvSlider from '../../../components/TvSlider';

function UserScreen() {
    const { trendingContent } = useFetchTrending();
    const { contentType } = useContentStore()
    const [imgLoading, setImgLoading] = useState(true)


    if (!trendingContent) return (
        <div className='h-screen text-white relative'>
            <NavBar />

            <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center -z-10 shimmer' />
        </div>
    )

    return (
        <>
            <div className='relative h-screen text-white'>
                <NavBar />

                {imgLoading && (
                    <div className='absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center -z-10 shimmer' />
                )}

                <img src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path} alt="Hero Image"
                    className='absolute top-0 left-0 w-full h-full object-cover -z-50'
                    onLoad={() => { setImgLoading(false) }}
                />

                <div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50' aria-hidden='true' />

                <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
                    <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute top-0 left-0 w-full h-full -z-10' />

                    <div className='max-w-2xl'>
                        <h1 className='mt-4 text-7xl font-extrabold text-balance'>
                            {trendingContent?.title || trendingContent?.name}
                        </h1>

                        <p className='mt-4 text-xl'>
                            {
                                trendingContent?.release_date?.split('-')[0] ||
                                trendingContent?.first_air_date?.split('-')[0]
                            }{' '}| {trendingContent?.adult ? '18+' : 'PG-13'}
                        </p>

                        <p className='mt-4 text-lg line-clamp-3'>
                            {/* {trendingContent?.overview.length > 200 ?
                            trendingContent.overview.slice(0, 200) + '...' :
                            trendingContent.overview
                            } */} {trendingContent?.overview}
                        </p>
                    </div>

                    <div className='flex mt-4'>
                        <Link to={`/watch/${trendingContent?.id}`}
                            className='bg-white hover:bg-white/80 text-black px-4 py-2 mr-4 rounded-lg flex items-center gap-2'
                        >
                            <Play className='size-6 inline-block mr-2 fill-black' />
                            Play
                        </Link>

                        <Link to={`/watch/${trendingContent?.id}`}
                            className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded-lg flex items-center'
                        >
                            <Info className='size-6 inline-block mr-2' />
                            More Info
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-10 bg-black py-10">
                {contentType === "movie"
                    ? MOVIE_CATEGORIES.map((category) => (
                        <MovieSlider key={category} category={category} />
                    ))
                    : TV_CATEGORIES.map((category) => (
                        <TvSlider key={category} category={category} />
                    ))}
            </div>

        </>
    )
}

export default UserScreen;
