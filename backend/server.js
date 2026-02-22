import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import { isAuth } from './middleware/isAuth.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
dotenv.config();
let port = 8000;
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: ['http://localhost:5173', 'http://localhost:5174'], credentials: true}));

app.use('/api/auth',authRoutes);
app.use('/api/user',isAuth,userRoutes);
app.use('/api/product',productRoutes);
app.use('/api/cart',isAuth,cartRoutes);
app.use('/api/order',isAuth,orderRoutes);
app.get('/',(req,res)=>{
    res.send('Server is running');
})

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
