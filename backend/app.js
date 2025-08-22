import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/dbConnect.js';
import allRoutes from './routes/allRoutes.js';


dotenv.config();
let app = express();
const port = process.env.PORT || 3000;

//datbase connection
connectDB();

//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api', allRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Hospital Management System API');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});