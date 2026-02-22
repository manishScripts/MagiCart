import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();    
export const isAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try{
        const verifytoken = jwt.verify(token, process.env.JWT_SECRET);
        if(!verifytoken){
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        req.user = { _id: verifytoken.id };
        req.userId = verifytoken.id;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}