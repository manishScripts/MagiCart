import User from '../models/userSchema.js';

export const addTocart = async (req, res) => {
    try {
        const {itemId, size} = req.body;
        const trimmedSize = size != null ? String(size).trim() : '';
        if (!trimmedSize) {
            return res.status(400).json({message:"Please select a size before adding to cart."});
        }
        const userData = await User.findById(req.userId);
        if(!userData){
            return res.status(404).json({message:"User not found"});
        }
        let cartData = userData.cartData || {};

        if(cartData[itemId]){
            if(cartData[itemId][trimmedSize]){
                cartData[itemId][trimmedSize] += 1;
            } else {
                cartData[itemId][trimmedSize] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][trimmedSize] = 1;
        }

        await User.findByIdAndUpdate(req.userId,{cartData});

        res.json({message:"Item added to cart",cartData});

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({message:"Internal server error"});
    }


}

export const updateCart = async (req,res) => {
    try{
        const {itemId,size,quantity} = req.body;
        const userData = await User.findById(req.userId);
        let cartData = userData.cartData || {}; 

        cartData[itemId][size] = quantity;
        await User.findByIdAndUpdate(req.userId,{cartData});
     return res.json({message:"Cart updated",cartData});
    }catch(error){
        console.error("Error updating cart:", error);
        res.status(500).json({message:"Internal server error"});
    }
}

// export const getCartCount = async (req,res) => {
//     try {
        
//     } catch (error) {
        
//     }
// }

export const getUserCart = async (req,res) => {
    try {
        const userData = await User.findById(req.userId);
        let cartData = userData.cartData || {};
        return res.json({cartData});
    } catch (error) {
        console.error("Error getting user cart:", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const removeFromCart = async (req,res) => {
    try {
        const {itemId, size} = req.body;
        const userData = await User.findById(req.userId);
        if(!userData){
            return res.status(404).json({message:"User not found"});
        }
        let cartData = userData.cartData || {};
        
        if(cartData[itemId]){
            delete cartData[itemId][size];
            // If no sizes left for this item, remove the item entirely
            if(Object.keys(cartData[itemId]).length === 0){
                delete cartData[itemId];
            }
        }
        
        await User.findByIdAndUpdate(req.userId,{cartData});
        return res.json({message:"Item removed from cart",cartData});
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({message:"Internal server error"});
    }
}