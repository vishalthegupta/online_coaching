import User from '../models/user.js'; 
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticateToken } from './userAuth.js';

const router = express.Router();


// Sign-Up
router.post('/sign-up', async (req, res) => {
  try {
      const { username, email, password } = req.body;

      // Check username length is more than 4
      if (username.length < 4) {
          return res.status(400).json({ message: "Username length should be greater than 3" });
      } 

      // Check username already exists
      const existingUserName = await User.findOne({ username });
      if (existingUserName) {
          return res.status(400).json({ message: "Username Already Exists" });
      }

      // Check email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
          return res.status(400).json({ message: "Email Already Exists" });
      }

      // Check password length is more than 4
      if (password.length < 4) {
          return res.status(400).json({ message: "Password length should be greater than 3" });
      }

      // Hash the password
      const hashPass = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({
          username,
          email,
          password: hashPass,
      });

      // Save the user
      await newUser.save();
      return res.status(200).json({ message: "Signup Successful" });

  } catch (error) {
      // console.error(error);  printing the error
      return res.status(500).json({ message: "Internal Server Error" }); // Return a generic error message
  }
});


// Sign-in
router.post('/sign-in', async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });

      // Checking if user exists
      if (!existingUser) {
        return res.status(400).json({ message: `Invalid Credentials` });
      }

      await bcrypt.compare(password, existingUser.password, (err, data) => {
        if (data) {
            const authClaims = [
                { name: existingUser.username },
                { role: existingUser.role },
            ];

        const token = jwt.sign({ authClaims }, "coursehub123", {expiresIn: "7d",});

            return res.status(200).json({ id: existingUser._id, role: existingUser.role, message : "Login Successful" , token , username : existingUser.username });
        } else {
            return res.status(400).json({ message: `Invalid Credentials` });
        }
      });
    } catch (error) {
       return res.status(500).json({ message: `${error}` });
    }
});


//get user information
router.get('/get-user-information' , authenticateToken , async (req , res) => {
    try {
       const { id } = req.headers;
       const data = await User.findById(id).select('-password');
       return res.status(200).json(data);
    } catch (error) {
       return res.status(500).json({message : "Internal Server Error"});
   }
})




export default router; 