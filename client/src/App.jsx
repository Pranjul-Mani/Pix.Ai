import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import Result from './pages/Result'
import Pricing from './pages/Pricing'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'

const App = () => {

  const { showLogin } = useContext(AppContext)

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-cyan-50'>
      <ToastContainer position='bottom-right' />
      <Navbar />
      {showLogin && <Login />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/pricing' element={<Pricing />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App