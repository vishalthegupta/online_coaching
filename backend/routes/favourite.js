import User from '../models/user.js';
import { authenticateToken } from './userAuth.js';
import { Router } from 'express';

const router = Router();


//add book to favourite
router.put('/add-course-to-favourite' , authenticateToken , async (req , res) => {
     try {
        const { courseid , id } = req.headers;
        const userData = await User.findById(id);
        const isCourseFavourite = userData.favourites.includes(courseid);
        if(isCourseFavourite) {
            return res.status(200).json({message : "Course is already in favourites"});
        }
        await User.findByIdAndUpdate(id , { $push : {favourites : courseid} });
        return res.status(200).json({message  : "Course added to Favourites"})
     } catch (error) {
        return res.status(500).json({message : "Internal Server Error"});
     }
})


//Delete book from favourite  - This we do need atleast now
router.put('/remove-course-from-favourite' , authenticateToken , async (req , res) => {
    try {
       const { courseid , id } = req.headers;
       const userData = await User.findById(id);
       const isCourseFavourite = userData.favourites.includes(courseid);
       if(isCourseFavourite) {
        await User.findByIdAndUpdate(id , { $pull : {favourites : courseid} });
       }
       return res.status(200).json({message  : "Course Removed From Favourites"})
    } catch (error) {
       return res.status(500).json({message : "Internal Server Error"});
    }
})


// Get All Favourite Book of a Particular User
router.get('/get-favourite-courses' , authenticateToken , async (req , res) => {
    try {
       const { id } = req.headers;
       const userData = await User.findById(id).populate('favourites');
       const favouriteCourses = userData.favourites;
       return res.json({
          status : "Success",
          data : favouriteCourses,
       });
    } catch (error) {
       return res.status(500).json({message : "Internal Server Error"});
    }
 })
 

 export default router; 