import React from 'react';
import { courses } from "../assets/assets.js";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* First Part */}
        <div className='ml-14'>
          <h3 className='font-semibold text-xl'>CourseHub</h3>
          <p className="text-gray-600 pt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            inventore, repudianda
          </p>
        </div>

        {/* Second Part */}
        <div className='ml-24'>
          <p className="text-xl font-semibold mb-4">COMPANY</p>
          <ul className="space-y-3">
            <li className="hover:text-gray-900 cursor-pointer"><a href="/">Home</a></li>
            <li className="hover:text-gray-900 cursor-pointer"><a href="/about">About Us</a></li>
            <li className="hover:text-gray-900 cursor-pointer"><a href="/contact">Contact</a></li>
            <li className="hover:text-gray-900 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Third Part */}
        <div>
          <p className="text-xl font-semibold mb-4">GET IN TOUCH</p>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer">
              <i className="fas fa-phone-alt mr-3"></i> +91 1234567890
            </li>
            <li className="flex items-center text-gray-600 hover:text-gray-900 cursor-pointer">
              <i className="fas fa-envelope mr-3"></i> coursehub.support@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Fourth Part */}
      <div className="w-full bg-gray-100 text-center mt-8 py-2">
        <p className="text-sm text-gray-500">
          © All Rights Reserved 2024. Made with Passion by a Tech Enthusiast
        </p>
      </div>
    </footer>
  );
};

export default Footer;
