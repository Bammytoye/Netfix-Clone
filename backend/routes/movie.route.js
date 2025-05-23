import express from 'express'
import { getMoviesByCategory, getMoviesDetails, getMovieTrailers, getSimilarMovies, getTrendingMovie } from '../controllers/movie.controller.js';

const router = express.Router()

router.get('/trending', getTrendingMovie)
router.get('/:id/trailers', getMovieTrailers)
router.get('/:id/details', getMoviesDetails)
router.get('/:id/similar', getSimilarMovies)
router.get('/:category', getMoviesByCategory)

export default router;