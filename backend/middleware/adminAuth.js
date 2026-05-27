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
    if(!verifytoken || verifytoken.email !== process.env.ADMIN_EMAIL){
      return res.status(401).json({message : "Unauthorized: Invalid or insufficient permissions"});
    }
    req.AdminEmail = verifytoken.email;
    next();
  }
  catch(error){
    return res.status(401).json({message : "Unauthorized: Invalid token"});
  }
}

export default adminAuth;