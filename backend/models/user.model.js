import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    
    firstName: {
        type: String,
        required: true,
    },
    
    lastName: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        default: '',
    },

    searchHistory: {
        type: [String],
        default: [],
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);