import User from '../models/userSchema.js';
export const currUser = async (req,res) => {
    try{
        const userId = req.userId;
        const user = await User.findById(userId).select("-password -__v");
        if(!user){
            return  res.status(404).json({message : "User not found"});
        }
        console.log("Current user fetched:", user);
        return res.status(200).json({user});
    }catch(error){
console.error("Error in fetching current user", error);
    }
}

export const adminProfile = async (req,res) => {
  try{
    const adminEmail = req.AdminEmail;
    if(adminEmail !== process.env.ADMIN_EMAIL){
      return res.status(401).json({message : "Unauthorized: You are not authorized to access this resource"});
    }
    return res.status(200).json({
        email : adminEmail,
        role : "admin"
    });
        }catch(error){
      console.error("Error in fetching admin profile", error);
      return res.status(500).json({message : "Internal server error"});
    }
  }
