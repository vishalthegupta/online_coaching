import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Home';
import AllCourses from './components/AllCourses';
import About from './components/About';
import Contact from './components/Contact';
import CourseDetail from './CourseDetail';
import Login from './components/Login';
import Signup from './components/Signup';


const App = () => {
  return (
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/all-courses' element={<AllCourses />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path = '/course/:id' element={<CourseDetail />} />
        </Routes>
        <Footer />
        <Toaster />
        </>
  );
};

export default App;