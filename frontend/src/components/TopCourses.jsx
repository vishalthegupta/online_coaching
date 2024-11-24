import React, { useEffect, useState } from "react";
import Course from "./Card.jsx"; 
import axios from 'axios';

const TopCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/course/get-all-courses'); // Update the endpoint if needed
        const allCourses = response.data.data; 
        const reversedCourses = allCourses.reverse(); // Reverse the order to get the latest courses first
        setCourses(reversedCourses.slice(0, 4)); // Get the first 4 courses after reversing
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getCourse();
  }, []); 

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Top Courses</h2>
        
        {/* Checking if courses are available */}
        {courses.length === 0 ? (
          <p className="text-center text-gray-600">Loading courses...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Course
                key={course._id} // Use _id instead of id for MongoDB object IDs
                id={course._id} // Pass _id as the course ID
                image={course.image}
                title={course.title}
                price={course.price}
                description={course.description}
                fullDescription={course.fullDescription} // Include fullDescription if needed
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopCourses;
