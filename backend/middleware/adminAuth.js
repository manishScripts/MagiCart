import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const adminAuth = (req,res,next) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({message : "Unauthorized: No token provided"});
  }
  try{
    const verifytoken = jwt.verify(token, process.env.JWT_SECRET);
    if(!verifytoken){
      return res.status(401).json({message : "Unauthorized: Invalid token"});
    }
    console.log(req);
    req.AdminEmail = process.env.ADMIN_EMAIL;
    next();
  }
  catch(error){
    return res.status(401).json({message : "Unauthorized: Invalid token"});
  }
}

export default adminAuth;