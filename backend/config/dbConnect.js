//conect databse
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const url = process.env.MONGO_URL;


const connectDB = async () => {
  try {
      await mongoose.connect(url);
    console.log('Database connected successfully');
    console.log(`database name ${mongoose.connection.name}`);
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process with failure
  }
}
export default connectDB;