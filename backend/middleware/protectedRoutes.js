import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import { ENV_VARS } from '../config/envVars.js'


export const protectedRoutes = async ( req, res, next ) => {
    try {
        const token = req.cookies['netflixToken']

        if(!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized - No Token Provided'})  
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({success: false, message: 'Unauthorized - Invalid Token' })
        }

        const user = await User.findById(decoded.userId).select('-password')

        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized - User Not Found' })
        }

        req.user = user

        next() // if we get to this point, we know the user is authenticated

    } catch (error) {
        console.log('Error in protectedRoute Middleware: ' + error.message)
        return res.status(500).json({ success: false, message: 'Server Error' })
    } 
}