import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './components/Loader';
import { useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";

const CourseDetail = () => {
  const { id } = useParams(); // Course ID from URL
  const [Data, setData] = useState(null); // Course Data
  const [user, setUser] = useState(null); // Logged-in User Data
  const [isEnrolled, setIsEnrolled] = useState(false); // Track if user is already enrolled

  // Fetch course details
  useEffect(() => {
    const getCourse = async () => {
      if (!id) return; // Check if the id exists before making the request
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/course/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    getCourse();
  }, [id]);

  // Fetch logged-in user data and check enrollment status
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/user/me'); // Get logged-in user
        setUser(response.data);
        
        // Check if user is already enrolled in this course
        const enrolledResponse = await axios.get(`http://localhost:1000/api/course/enrollment-status/${id}`, {
          headers: {
            id: response.data._id // Send user ID in the headers
          }
        });

        const isUserEnrolled = enrolledResponse.data.isEnrolled;
        setIsEnrolled(isUserEnrolled);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUser();
  }, [id]);

  // Handle course enrollment
  const handleEnroll = async () => {
    if (isEnrolled) {
      alert("You are already enrolled in this course!");
      return;
    }

    try {
      await axios.put(`http://localhost:1000/api/v1/user/enroll`, {
        courseId: id,
      });
      setIsEnrolled(true); // Set enrollment state to true
      alert("You have successfully enrolled in the course!");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("An error occurred while enrolling. Please try again.");
    }
  };

  if (!Data) {
    return <div className='h-screen bg-slate-50 flex items-center justify-center'><Loader /></div>;
  }

  return (
    <div className='px-4 lg:px-12 py-8 bg-slate-50 flex flex-col md:flex-row gap-8'>
      <div className='bg-slate-100 rounded p-4 h-[70vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-center'>
        <img src={Data.image} alt={Data.title} className='h-[50vh] lg:h-[70vh] rounded' />
      </div>
      <div className='p-4 w-full lg:w-3/6'>
        <h2 className='text-black text-4xl font-semibold'>{Data.title}</h2>
        <p className='text-zinc-500 mt-4 text-xl'>{Data.description}</p>

        {/* Full Description */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Full Description:</h3>
          <p className="text-zinc-600 mt-2">{Data.fullDescription}</p>
        </div>

        <p className='flex mt-4 items-center justify-start text-zinc-400'>
          <GrLanguage /> <span className='px-3'>English</span>
        </p>
        <p className='mt-4 text-black text-3xl font-semibold'>
          Price: ${Data.price}
        </p>
        
        {/* Enroll Button */}
        <button 
          className='bg-black font-semibold px-3 py-2 mt-5 text-white rounded cursor-pointer hover:bg-blue-600' 
          onClick={handleEnroll}
          disabled={isEnrolled}
        >
          {isEnrolled ? "Already Enrolled" : "Enroll Now"}
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;
