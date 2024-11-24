import mongoose from 'mongoose';

// Define the PDF Schema
const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  file_url: {
    type: String,
    required: true, // URL where the PDF file is stored
  },
  description: {
    type: String,
    default: '', 
  },
  upload_date: {
    type: Date,
    default: Date.now, 
  },
  file_size: {
    type: Number,
    required: true, // File size in bytes
  },
  access_level: {
    type: String,
    enum: ['public', 'private', 'restricted'],
    default: 'public', 
  },
  downloadable: {
    type: Boolean,
    default: false, // meaning the PDF can't be downloaded
  }
});

const Content = mongoose.model('Content', contentSchema);

export default Content;
