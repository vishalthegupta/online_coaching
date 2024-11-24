import User from '../models/user.js';
import { authenticateToken } from './userAuth.js';
import { Router } from 'express';

const router = Router();



// Get All Enrolled Courses of a Particular User
router.get('/get-enrolled-courses' , authenticateToken , async (req , res) => {
    try {
       const { id } = req.headers;
       const userData = await User.findById(id).populate('enrolledCourses');
       const  enrolledCourses = userData.enrolledCourses;
       return res.json({
          status : "Success",
          data :  enrolledCourses,
       });
    } catch (error) {
       return res.status(500).json({message : "Internal Server Error"});
    }
 })



export default router;