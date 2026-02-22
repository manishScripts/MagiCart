import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { gentoken , gentoken1} from "../config/token.js";
import dotenv from "dotenv";
dotenv.config();

export const registration = async (req,res) => {
    try {
        const {name ,email ,password} = req.body;
        const existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({message : "User already exist"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Enter valid email address"})
        }
        if(password.length < 8){
            return res.status(400).json({message : "Password must be at least 8 characters long"})
        }

        let hashedPassword = await bcrypt.hash(password,10);
        const user =await User.create({name,email,password:hashedPassword});

        // token generation and setting cookie(store token)
        let token = await gentoken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(201).json({message : "User registered successfully", user})
    } catch (error) {
        console.error("Error in user registration", error);
        return res.status(500).json({message : "Internal server error"})
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body;
    try{
        const existUser = await User.findOne({email});
        if(!existUser){
            return res.status(400).json({message : "Invalid email or password"})
        }
        const isPasswordMatch = await bcrypt.compare(password,existUser.password);
        if(!isPasswordMatch){
            return res.status(400).json({message : "Invalid email or password"})
        }
        //  user create nhi karenge its alredy exist bus token generate karenge

        let token = await gentoken(existUser._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(200).json({message : "Login successful", user: existUser})
    }   catch(error){
        console.error("Error in user login", error);
        return res.status(500).json({message : "Internal server error"});
        }

    }

export const logout = async(req,res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({message : "Logout successful"});
    } catch (error) {
        console.error("Error in user logout", error);
        return res.status(500).json({message : "Internal server error"});
    }
}

export const googleSignUp = async (req,res) =>
{
    try {
        const {name ,email} = req.body;
        let user = await User.findOne({email});
        const isNewUser = !user;
        
        // If user doesn't exist, create new user
        if(!user){
            user = await User.create({name, email});
        }
        
        // Generate token for both new and existing users
        let token = await gentoken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        
        const message = isNewUser ? "User registered successfully" : "Login successful";
        return res.status(200).json({message, user})
    } catch (error) {
        console.error("Error in Google sign-up", error);
        return res.status(500).json({message : "Internal server error"})
    }   
}

export const adminLogin = async (req,res) => {
    const {email,password} = req.body;
    try{
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if(email !== adminEmail || password !== adminPassword){
            return res.status(400).json({message : "Invalid email or password"})
        }
        let token = await gentoken1(email);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        return res.status(200).json({message : "Admin login successful"})
    } catch (error) {
        console.error("Error in admin login", error);
        return res.status(500).json({message : "Internal server error"});
    }
}