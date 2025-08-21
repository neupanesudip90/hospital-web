import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB:", url);
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
    console.log(`Database name: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("Database connection failed!");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    process.exit(1);
  }
};

export default connectDB;
