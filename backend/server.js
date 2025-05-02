import express from 'express'
import authRoutes from './routes/auth.route.js'
import moviesRoutes from './routes/movie.route.js'
import { ENV_VARS } from './config/envVars.js'
import { connectDB } from './config/database.js'

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json()); //... for req.body 

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', moviesRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
    connectDB()
})