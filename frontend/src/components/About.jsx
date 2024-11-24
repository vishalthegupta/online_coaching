import React from 'react';
import Misson_img from '../assets/Misson_img.jpg'
import Service_img from '../assets/Services_img.png'
import Values_img from '../assets/Values_img.jpg'
import Hero_img from '../assets/Hero_img.jpg'

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">

        {/* About Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
          <p className="text-gray-600">Learn more about our mission, services, and the values that drive us.</p>
        </header>

        {/* Our Business Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-center bg-white p-8 rounded-lg shadow-lg">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img src={Hero_img} alt="Business Overview" className="w-full h-auto rounded-lg shadow-md" />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Business</h2>
              <p className="text-gray-700">
                At CourseHub, we revolutionize learning with a diverse range of high-quality courses. Our platform combines cutting-edge technology with expert instructors to deliver effective and engaging educational experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Sections in a Single Row */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Section 1: Our Mission */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <img src={Misson_img} alt="Our Mission" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">Our Mission</h2>
              <p className="text-gray-700">
                Empowering individuals with high-quality education to achieve their goals.
              </p>
            </div>

            {/* Section 2: Our Services */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <img src={Service_img} alt="Our Services" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">Our Services</h2>
              <p className="text-gray-700">
                Offering online courses, personalized paths, and expert guidance for diverse learning needs.
              </p>
            </div>

            {/* Section 3: Our Values */}
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
              <img src={Values_img} alt="Our Values" className="w-full h-48 object-cover rounded-lg mb-4" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">Our Values</h2>
              <p className="text-gray-700">
                Integrity, excellence, and innovation in every aspect of our work.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
