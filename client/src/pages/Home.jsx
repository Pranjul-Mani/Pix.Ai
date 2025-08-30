import React from 'react'
import Hero from '../components/Hero'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'

const Home = () => {
  return (
    <div>
      <Hero />
      <Steps />
      <Description />
      <Testimonials />
      <GenerateBtn />
    </div>
  )
}

export default Home;