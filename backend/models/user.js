import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'] 
    },
    favourites: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Course", // Reference to Course
        }
    ],
    enrolledCourses: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Course", // Reference to courses the user is enrolled in
        }
    ],
}, 
{ timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
