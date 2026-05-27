import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    console.log("Attempting to connect to MongoDB...");

    const options = {
      serverSelectionTimeoutMS: 5000,
    };

    await mongoose.connect(mongoUri, options);
    
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Log helpful hint for common connection string errors
    if (error.message.includes("is not a valid port") || error.message.includes("expected") || error.message.includes("@")) {
      console.error("HINT: Your MONGO_URI might contain special characters in the password (like @, #, ?). These MUST be URL-encoded.");
    }
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
