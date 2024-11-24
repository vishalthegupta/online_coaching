import React from 'react';

const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Contact Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-gray-600">We'd love to hear from you! Please fill out the form below or reach out to us directly.</p>
        </header>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="mb-6">
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                id="message"
                rows="4"
                placeholder="Your Message"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Details */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Details</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300">
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Email:</span> contact@coursewebsite.com
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Phone:</span> (123) 456-7890
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Address:</span> 123 Course St, Education City, ED 12345
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
