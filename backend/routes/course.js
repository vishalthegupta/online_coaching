import Course from '../models/course.js';
import { Router } from 'express';
import { authenticateToken } from './userAuth.js';
const router = Router();
import Content from '../models/Content.js'; 
import cloudinary from 'cloudinary';



// Add Course - Admin
router.post('/add-course', async (req, res) => {
    try {
      const {
        image,
        title,
        price,
        description,
        hasAccess,
        fullDescription,
      } = req.body;
  
      // Validating required fields
      if (!image || !title || !description || !fullDescription) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
    
      const newCourse = new Course({
        image,
        title,
        price,
        description,
        hasAccess,
        fullDescription,
        contents: [],  
      });
  
      // Save the course to the database
      await newCourse.save();
  
      res.status(201).json({
        message: 'Course added successfully',
        course: newCourse,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error adding course',
        error: error.message,
      });
    }
  });
  
  
// Update Course
router.put('/update-course', authenticateToken, async (req, res) => {
    try {
      // Extracting courseid from the headers
      const { courseid } = req.headers;
  
      // Validating courseid
      if (!courseid) {
        return res.status(400).json({ message: 'Course ID is required' });
      }
  
      
      const updateData = {
        image: req.body.image,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        hasAccess: req.body.hasAccess,
        fullDescription: req.body.fullDescription,
        contents: req.body.contents,  
      };
  
      
      const updatedCourse = await Course.findByIdAndUpdate(courseid, updateData, { new: true });
  
      // If no course is found
      if (!updatedCourse) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Return success response
      res.status(200).json({
        message: 'Course updated successfully',
        course: updatedCourse,  // Optionally return the updated course object
      });
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  });

// Delete a Course
router.delete('/delete-course', authenticateToken, async (req, res) => {
    try {
      const { courseid } = req.headers;
  
      // Validate that courseid is provided
      if (!courseid) {
        return res.status(400).json({ message: 'Course ID is required' });
      }
  
      // Find the course by ID
      const courseToDelete = await Course.findById(courseid);
  
      // If course not found, return a 404 error
      if (!courseToDelete) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Delete associated content (files) from Cloudinary
      for (let contentId of courseToDelete.contents) {
        const content = await Content.findById(contentId);
        if (content) {
          // Delete file from Cloudinary if it's present
          await cloudinary.v2.uploader.destroy(content.file_url, { resource_type: 'auto' });
          
          // Delete the content document from MongoDB
          await Content.findByIdAndDelete(contentId);
        }
      }
  
      // Now delete the course itself
      await Course.findByIdAndDelete(courseid);
  
      // Return success response
      res.status(200).json({ message: 'Course and associated content deleted successfully' });
  
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  });
  

// Get all courses
router.get('/get-all-courses', async (req, res) => {
    try {
      const courses = await Course.find(); // Find all courses in the database
  
      if (!courses || courses.length === 0) {
        return res.status(404).json({ message: 'No courses found' });
      }
  
      res.json({ status: 'success', data: courses });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Get Recently Added Courses (Limit to 4)
router.get('/get-recent-courses', async (req, res) => {
    try {
      const courses = await Course.find()  // Find all courses
        .sort({ createdAt: -1 })  // Sort by creation date, most recent first
        .limit(4);  // Limit the results to 4 courses
  
      if (!courses || courses.length === 0) {
        return res.status(404).json({ message: 'No courses found' });
      }
  
      res.json({ status: 'success', data: courses });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
  


// Get a single course by ID
router.get('/get-course/:id', async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      res.json({ status: 'success', data: course });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
  


export default router;
