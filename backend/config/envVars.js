import dotenv from 'dotenv';

dotenv.config();  

export const ENV_VARS = {
    PORT: process.env.PORT || 3010, 
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
};