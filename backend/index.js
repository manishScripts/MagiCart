import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';
import { isAuth } from './middleware/isAuth.js';
import productRoutes from './routes/productRoutes.js';
dotenv.config();
const port = process.env.PORT || 8000;
const app = express();

const allowedOrigins = [
    'http://localhost:5173', 
    'http://localhost:5174',
    process.env.FRONTEND_URL,
    process.env.ADMIN_URL
].filter(Boolean);

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use('/api/auth',authRoutes);
app.use('/api/user',isAuth,userRoutes);
app.use('/api/product',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/order',orderRoutes);
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