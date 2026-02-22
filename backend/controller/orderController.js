import Order from "../models/order.js";
import User from "../models/userSchema.js";
export const PlaceOrder = async (req,res)=>{
    try {
        const {items,amount,address,paymentMethod} = req.body;
        const userId = req.user._id;

        // Validate required fields
        if (!items || !amount || !address || !paymentMethod) {
            return res.status(400).json({message:"Missing required fields: items, amount, address, paymentMethod"});
        }

        const newOrder = new Order({
            items,
            amount,
            address,
            userId,
            paymentMethod,
            payment:false,
            date:Date.now()
        });

        await newOrder.save();
        console.log("Order saved successfully:", newOrder);

        await User.findByIdAndUpdate(userId,{cartData:{}});
        return res.status(201).json({message:"Order Placed Successfully",order:newOrder});
    } catch (error) {
        console.error("Order placement error:", error);
        res.status(500).json({message:error.message});
    }
}

export const getUserOrders = async (req,res)=>{
    try{
        const userId = req.user._id;
        const orders = await Order.find({userId}).sort({createdAt:-1});
        return res.status(200).json({orders});
    }catch(error){
        console.error("Error fetching user orders:", error);
        res.status(500).json({message:error.message});
    }
}

export const getAllOrders = async (req,res)=>{
    try {
        const orders = await Order.find().sort({createdAt:-1});
        return res.status(200).json({orders});
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({message:error.message});
    }
}
export const updateOrderStatus = async (req,res)=>{
    try{
        const {orderId} = req.params;
        const {status} = req.body;
        
        if (!orderId || !status) {
            return res.status(400).json({message:"orderId and status are required"});
        }
        
        const order = await Order.findByIdAndUpdate(orderId, {status}, {new:true});
        
        if (!order) {
            return res.status(404).json({message:"Order not found"});
        }
        
        return res.status(200).json({success:true, order});
    }catch (error){
        console.error("Error updating order status:", error);
        res.status(500).json({message:error.message});
    }
}