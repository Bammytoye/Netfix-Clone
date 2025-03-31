import dotenv from 'dotenv';

dotenv.config();  

export const ENV_VARS = {
    PORT: process.env.PORT || 3010, 
    MONGODB_URL: process.env.MONGODB_URL
};