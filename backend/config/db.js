import mongoose from "mongoose";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env from the backend folder regardless of the process current working directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    console.log("Attempting to connect to MongoDB...");
    console.log("Connection string (masked):", process.env.MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//*****:*****@'));

    const options = {
      serverSelectionTimeoutMS: 30000, // Increased timeout
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4
      maxPoolSize: 10,
      minPoolSize: 2,
    };

    await mongoose.connect(process.env.MONGO_URI, options);
    
    console.log("✅ MongoDB connected successfully");
    console.log("📊 Database:", mongoose.connection.db.databaseName);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

export default connectDB;
