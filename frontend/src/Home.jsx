import React from 'react'
import HeroSection from './components/HeroSection'
import TopCourses from './components/TopCourses'
import IndustryReadyCourse from './components/IndustryReadyCourses'

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <TopCourses></TopCourses>
      <IndustryReadyCourse />
    </div>
  )
}

export default Home
