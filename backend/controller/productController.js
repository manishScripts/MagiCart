import Product from "../models/productSchema.js";
import uploadToCloudinary from "../config/cloudinary.js";

export const addProduct = async (req, res) => {
    try {
        console.log("===== UPLOAD REQUEST RECEIVED =====");
        console.log("req.files exists:", !!req.files);
        console.log("req.files:", req.files);
        console.log("req.body:", req.body);
        console.log("=====================================");
        
        let {name, description, price, category, subcategory, bestseller, size, brand} = req.body;
        
        // Upload images to Cloudinary
        let image1 = null, image2 = null, image3 = null, image4 = null;
        
        if (req.files?.image1?.[0]) {
            console.log("Uploading image1:", req.files.image1[0].filename);
            image1 = await uploadToCloudinary(req.files.image1[0].path);
        }
        if (req.files?.image2?.[0]) {
            console.log("Uploading image2:", req.files.image2[0].filename);
            image2 = await uploadToCloudinary(req.files.image2[0].path);
        }
        if (req.files?.image3?.[0]) {
            console.log("Uploading image3:", req.files.image3[0].filename);
            image3 = await uploadToCloudinary(req.files.image3[0].path);
        }
        if (req.files?.image4?.[0]) {
            console.log("Uploading image4:", req.files.image4[0].filename);
            image4 = await uploadToCloudinary(req.files.image4[0].path);
        }

        // Match schema fields (images1..images4 are arrays)
        let productData = {
            name,
            description,
            price: Number(price),
            images1: image1 ? [image1] : [],
            images2: image2 ? [image2] : [],
            images3: image3 ? [image3] : [],
            images4: image4 ? [image4] : [],
            category,
            subcategory,
            bestseller: bestseller === "true" || bestseller === true,
            size: typeof size === 'string' ? JSON.parse(size) : size,
            brand,
            date: Date.now()
        };
        
        console.log("Images to save:", {
            images1: productData.images1.length,
            images2: productData.images2.length,
            images3: productData.images3.length,
            images4: productData.images4.length
        });
        const product = await Product.create(productData);
        
        return res.status(201).json({
            success: true,
            message: "Product added successfully",
            product
        }); 
    } catch (error) {
        console.log("ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Error adding product",
            error: error.message
        });
    }
}

export const listProduct = async (req,res) => {
    try{
        const products =  await Product.find({});
        return res.status(200).json({products});
    }catch(error){
        console.log(error);
        return res.status(500).json({message : "ERROR IN FETCHING PRODUCTS"});
    }
}

export const removeProduct = async (req,res) => {
    try{
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        return res.status(200).json({message : "Product removed successfully"});
    }catch(error){
        console.log(error);
        return res.status(500).json({message : "Error in removing product"});
    }   
}

