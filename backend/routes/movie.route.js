import express from 'express'
import { getMoviesDetails, getMovieTrailers, getTrendingMovie } from '../controllers/movie.controller.js';

const router = express.Router()

router.get('/trending', getTrendingMovie)
router.get('/:id/trailers', getMovieTrailers)
router.get('/:id/details', getMoviesDetails)

export default router;