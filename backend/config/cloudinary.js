import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary once at startup
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

async function uploadToCloudinary(filepath) {
  try {
    if(!filepath){
      return null;
    }

    const uploadedResponse = await cloudinary.uploader.upload(filepath);
    fs.unlinkSync(filepath);
    return uploadedResponse.secure_url;
  } catch (error) {
    if(filepath && fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    console.log("Cloudinary Error:", error);
    throw error;
  }
}

export default uploadToCloudinary;