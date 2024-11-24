import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
    required: true
  },
  hasAccess: {
    type: Boolean,
    required: true,
    default: true
  },
  fullDescription: {
    type: String,
    required: true
  },
  contents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
  }]  
},
{ timestamps : true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
