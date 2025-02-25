import express from 'express';
import authRoutes from './routes/auth.route.js'

const app = express();

app.use("/api/v1/auth", authRoutes);

app.listen(3010, () => {
    console.log('Server is running on port 3010');
}
)