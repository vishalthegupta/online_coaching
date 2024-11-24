import React from "react";
import { Link } from "react-router-dom";

const Card = ({ image, title, price, description, instructor, id, hasAccess }) => {
  // console.log(id);
  return (
    <Link
      to={`/course/${id}`}
      className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 duration-300 w-full max-w-sm mx-auto"
    >
      <div className="w-full h-36">
        {/* Course Image */}
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        {/* Course Title */}
        <h3 className="text-md font-semibold mb-1">{title}</h3>

        {/* Instructor Name */}
        <p className="text-gray-600 text-xs mb-1">Instructor: {instructor}</p>

        {/* Course Price */}
        <p className="text-gray-500 text-sm font-medium mb-2">${price}</p>

        {/* Course Description */}
        <p className="text-gray-700 text-xs mb-3">{description}</p>

        {/* Enroll Now Button or Access Status */}
        <div className="mt-4">
          {hasAccess ? (
            <p className="text-green-600 text-sm font-bold">You have access</p>
          ) : (
            <button className="bg-zinc-900 text-white text-sm py-1 px-4 rounded-lg w-full text-center">
              Enroll Now
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
