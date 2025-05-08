import express from 'express'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.route.js'
import moviesRoutes from './routes/movie.route.js'
import tvRoutes from './routes/tv.route.js'
import searchRoutes from './routes/search.route.js'

import { ENV_VARS } from './config/envVars.js'
import { connectDB } from './config/database.js'
import { protectedRoutes } from './middleware/protectedRoutes.js'

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); //... for req.body 
app.use(cookieParser()); //....middleware

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectedRoutes, moviesRoutes);
app.use('/api/v1/tv', protectedRoutes, tvRoutes);
app.use('/api/v1/search', protectedRoutes, searchRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
    connectDB()
})