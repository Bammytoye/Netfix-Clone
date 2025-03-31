import { User } from "../models/user.model";

export async function Signup (req, res, next) {
    try {
        const {email, firstName, lastName, password, userName} = req.body;

        if(!email || !firstName || !lastName || !password || !userName ) {
            return res.status(400).json({success:false, message: 'All fields are required'})
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({success:false, message: 'Invalid Email, Please try again!'})
        }

        if(password.length < 4) {
            return res.status(400).json({success:false, message: 'Password must be at least 4 characters long'})
        }

        const existingUserByEmail = await User.findOne({email:email});

        if (existingUserByEmail) {
            return res.status(400).json({success:false, message: 'Email already exists'})
        }

        const existingUserByUserName = await User.findOne({userName:userName});

        if (existingUserByUserName) {
            return res.status(400).json({success:false, message: 'Username already exists'})
        }

        const Profile_Pics = ['/avatarOne.jpg', '/avatarTwo.jpg', '/AvatarThree.png']

        const image = Profile_Pics[Math.floor(Math.random() * Profile_Pics.length)];

        const newUser = new User({
            email,
            password,
            userName,
            firstName,
            lastName,
            image,
        }) 

        await newUser.save() // Save the user to the database

        return res.status(201).json({ success: true, message: "User registered successfully", user: newUser });

    } catch (error) {
        console.log('Error in controller signup', error.message)
        res.status(500).json({success:false, message: 'Server Error'})
    }   
}


export async function Login (req, res, next) {
    res.send('Welcome to the Login')
}


export async function Logout (req, res, next) {
    res.send('Welcome to the LogOut')
}