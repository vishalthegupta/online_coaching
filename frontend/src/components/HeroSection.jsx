import React from "react";
import Hero_img from '../assets/Hero_img.jpg'
const HeroSection = () => {
  return (
    <div className="bg-white text-black">
      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
        {/* Left Section - Text */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Learn Anytime, Anywhere
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Discover thousands of online courses from the best instructors.
            Upskill yourself at your own pace.
          </p>
          <a
            href="#"
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300"
          >
            Get Started
          </a>
        </div>

        {/* Right Section - Image */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={Hero_img}
            alt="Hero Section"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
