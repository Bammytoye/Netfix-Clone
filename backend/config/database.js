import mongoose from 'mongoose';
import { ENV_VARS } from './envVars.js';


export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(ENV_VARS.MONGODB_URL)
        console.log('Connect to Mongoose database ' + connection.connection.host);
    } catch (error) {
        console.error( 'Error Connecting to Mongoose ' + error.message);
        process.exit(1); //1 means there is an error, 0 means success
    }
}
