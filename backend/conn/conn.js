import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const conn = async () => {
    try {
       const connection =  await mongoose.connect(process.env.MongoDB_URI);
       console.log('Connected to DB');
    } catch (error) {
        console.log(error)
    }
}

conn();
