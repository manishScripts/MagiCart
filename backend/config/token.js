import jwt from 'jsonwebtoken';

export const gentoken = async (userId)=>{
    try{
        const token = jwt.sign({id : userId}, process.env.JWT_SECRET, {expiresIn : '7d'});
        return token;
    }catch(error){
        console.error("Error generating token", error);
        throw new Error("Token generation failed");
    }
}

export const gentoken1 = async (email)=>{
    try{
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn : '7d'});
        return token;
    }catch(error){
        console.error("Error generating token", error);
        throw new Error("Token generation failed");
    }
}