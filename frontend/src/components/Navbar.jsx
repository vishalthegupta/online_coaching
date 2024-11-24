import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../AuthProvider"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser, logout } = useAuth(); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white text-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/">CourseHub</a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Menu */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex space-x-6 absolute md:static bg-white w-full md:w-auto left-0 md:left-auto top-16 md:top-auto p-4 md:p-0`}
        >
          <li>
            <a href="/" className="block md:inline hover:text-gray-500 transition duration-300">Home</a>
          </li>
          <li>
            <a href="/all-courses" className="block md:inline hover:text-gray-500 transition duration-300">Courses</a>
          </li>
          <li>
            <a href="/about" className="block md:inline hover:text-gray-500 transition duration-300">About</a>
          </li>
          <li>
            <a href="/contact" className="block md:inline hover:text-gray-500 transition duration-300">Contact</a>
          </li>
        </ul>

        {/* Conditional Rendering of Buttons */}
        <div className="hidden md:flex">
          {!authUser ? (
            <a
              href="/login"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 hover:scale-105 transition duration-300"
            >
              Login
            </a>
          ) : (
            <>
              <a
                href="/profile"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 hover:scale-105 transition duration-300"
              >
                Enrolled Courses
              </a>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 hover:scale-105 transition duration-300 ml-4"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;