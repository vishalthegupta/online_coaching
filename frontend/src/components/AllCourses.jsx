import React, { useState, useEffect } from "react";
import CourseCard from "./Card.jsx";
import axios from 'axios';

const AllCourses = () => {
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/course/get-all-courses');
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetch();
  }, []);

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Courses to Upskill You!</h2>

        {/* Loading message while courses are being fetched */}
        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-lg font-semibold">Loading courses...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Check if there are courses available */}
            {courses.length > 0 ? (
              courses.map((course) => (
                <CourseCard
                  id={course.id}
                  key={course.id} 
                  image={course.image}
                  title={course.title}
                  price={course.price}
                  description={course.description}
                  instructor={course.instructor} 
                />
              ))
            ) : (
              <p className="text-center text-lg font-semibold">No courses available at the moment.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
