import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
        expiresIn: "7d"
    }
    )

    res.cookie("netflixToken", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
        httpOnly: true,                  // can't be accessed via JavaScript (protects against XSS)
        sameSite: "strict",              // only sent in first-party requests (CSRF protection)
        secure: process.env.NODE_ENV !== "development" // ensures HTTPS in production
    })


    return token
}