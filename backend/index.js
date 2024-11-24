import express from 'express';
const app = express();   
import cloudinary from 'cloudinary'
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();



// Middleware
app.use(express.urlencoded({ extended: true }));  // This is for Parsing of Data  with URL payload - form submission
app.use(express.json());   // Enables to use req.body , also used for parsing data with JSON payload - req.body
app.use(cors());


// Configuring CLoudinary for handling file uploads
cloudinary.v2.config({
  cloud_name : process.env.Cloudinary_Cloud_Name,
  api_key : process.env.Cloudinary_Api,
  api_secret : process.env.Cloudinary_Secret,
});



import './conn/conn.js';


// These files contains all the APIs
import User from './routes/user.js';
import Course from './routes/course.js';
import Favourites from './routes/favourite.js';
// One import left


// Routes
app.use('/api/user', User);
app.use('/api/course', Course);
app.use('/api/favourites', Favourites);




// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
