import React, { useEffect, useState } from "react";
import Course from "./Card.jsx"; 
import axios from "axios"; 
import Loader from "./Loader.jsx";
const TopCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/course/get-recent-courses'); 
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };
    getCourses();
  }, []);


  return (
    <div className="bg-gray-100 py-10">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Industry Ready Courses</h2>
     {(courses.length == 0) ?
      
      <div className="flex items-center justify-center h-30">
      <div className="text-center">
        <Loader /> 
        <p className="text-gray-600 mt-4 mr-10">Loading courses...</p>
      </div>
    </div>
     :
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {courses.map((course) => (
                <Course
                  key={course.id || `${course.title}-${course.price}`} 
                  id={course.id}
                  image={course.image || '/default-image.jpg'}  // in case image does not load
                  title={course.title}
                  price={course.price}
                  description={course.description}
                  instructor={course.instructor}  
                />
              ))}
            </div> 
}
      </div>
    </div>
  );
};

export default TopCourses;
