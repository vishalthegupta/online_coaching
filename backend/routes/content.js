import Course from '../models/course.js';
import { Router } from 'express';
import { authenticateToken } from './userAuth.js';
import Content from '../models/Content.js'; 
import cloudinary from 'cloudinary';
import { upload } from '../middleware/multer.js';
import mongoose from 'mongoose';

const router = Router();

// Add PDF to Course
router.post('/add-pdf/:courseId', authenticateToken, upload, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, file_size, access_level, downloadable } = req.body;

    // Validate required fields
    if (!title || !req.file || !file_size || req.file.size !== Number(file_size)) {
      return res.status(400).json({ message: 'Missing required fields or file size mismatch' });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Upload the PDF file to Cloudinary
    const uploadedFile = await cloudinary.v2.uploader.upload_stream(
      { resource_type: 'raw',
        public_id: `courses/${courseId}/${req.file.originalname}` 
      },
      
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: 'Error uploading file to Cloudinary', error: error.message });
        }

        // Create and save the new Content
        const newContent = new Content({
          title,
          file_url: result.secure_url,  // Cloudinary URL of the uploaded PDF
          description,
          file_size: req.file.size,     // File size from the uploaded file
          access_level,
          downloadable,
        });

        await newContent.save();

        // Add the new content to the course's contents array
        course.contents.push(newContent._id);
        await course.save();

        res.status(201).json({
          message: 'PDF added to course successfully',
          content: newContent,
        });
      }
    );

    // Stream the file into Cloudinary
    req.file.stream.pipe(uploadedFile);

  } catch (error) {
    console.error('Error adding PDF to course:', error);
    res.status(500).json({ message: 'Error adding PDF to course', error: error.message });
  }
});


// Delete PDF from Course
router.delete('/remove-pdf/:courseId/:contentId', authenticateToken, async (req, res) => {
  try {
    const { courseId, contentId } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid course ID format' });
    }

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return res.status(400).json({ message: 'Invalid content ID format' });
    }

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the content (PDF) exists
    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: 'Content (PDF) not found' });
    }

    // Remove the content (PDF) ID from the course's contents array
    course.contents = course.contents.filter((id) => !id.equals(contentId));
    await course.save();

    // Delete the content (PDF) document from the Content collection
    await Content.findByIdAndDelete(contentId);

    // Extract public ID and delete from Cloudinary
    const filePublicId = content.file_url.split('/').pop().split('.')[0];
    await cloudinary.v2.uploader.destroy(filePublicId, { resource_type: 'raw' });

    res.status(200).json({ message: 'PDF removed from course and deleted from Cloudinary' });

  } catch (error) {
    console.error('Error removing PDF from course:', error);
    res.status(500).json({ message: 'Error removing PDF from course', error: error.message });
  }
});

export default router;
