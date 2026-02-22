import express from 'express';
import { PlaceOrder, getUserOrders, getAllOrders, updateOrderStatus } from '../controller/orderController.js';
import { isAuth } from '../middleware/isAuth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRoutes = express.Router();

orderRoutes.post("/placeorder",isAuth,PlaceOrder);
orderRoutes.get("/userorders",isAuth,getUserOrders);

// Admin Routes
orderRoutes.get("/allorders",adminAuth,getAllOrders);
orderRoutes.post("/status/:orderId",adminAuth,updateOrderStatus);

export default orderRoutes;