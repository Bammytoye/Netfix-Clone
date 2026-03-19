import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import cors from 'cors'

import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]); //... for dns

import authRoutes from './routes/auth.route.js'
import moviesRoutes from './routes/movie.route.js'
import tvRoutes from './routes/tv.route.js'
import searchRoutes from './routes/search.route.js'

import { ENV_VARS } from './config/envVars.js'
import { connectDB } from './config/database.js'
import { protectedRoutes } from './middleware/protectedRoutes.js'

const app = express();
const PORT = ENV_VARS.PORT || 3010;
const __dirname = path.resolve(); 

app.use(cors({
    origin: ENV_VARS.NODE_ENV === 'production' ? 'https://netfix-clone-liard.vercel.app/' : 'http://localhost:5173',
    credentials: true,  // needed for cookies/JWT
}));

app.use(express.json()); //... for req.body 
app.use(cookieParser()); //....middleware

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectedRoutes, moviesRoutes);
app.use('/api/v1/tv', protectedRoutes, tvRoutes);
app.use('/api/v1/search', protectedRoutes, searchRoutes);

if(ENV_VARS.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    });
}

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
    connectDB()
})