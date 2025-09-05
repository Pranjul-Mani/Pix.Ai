import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
// import Result from './pages/GenerateImg'
import Pricing from './pages/Pricing'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import ImageEditor from './pages/ImageEditor';
import TextRemoval from './pages/TextRemoval';
import GenerateImage from './pages/GenerateImg';
import BackgroundReplacement from './pages/BgReplacement';
import ImageUpscaling from './pages/ImgUpscaling';
import ScrollToTop from './components/Scrolltop';

import { AppContext } from './context/AppContext'

const App = () => {

  const { showLogin } = useContext(AppContext)

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-cyan-50'>
      <ToastContainer position='bottom-right' />
      <Navbar />
        <ScrollToTop />
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/textremoval" element={<TextRemoval />} />
        <Route path="/bgreplacement" element={<BackgroundReplacement />} />
        <Route path='/generateimage' element={<GenerateImage />} />
        <Route path='/imgupscaling' element={<ImageUpscaling />} />
        <Route path='/pricing' element={<Pricing />} />
      </Routes>
     

    </div>
  )
}

export default App