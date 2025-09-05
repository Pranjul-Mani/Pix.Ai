import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { ChevronDown } from 'lucide-react'

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  const profileRef = useRef(null);
  const featuresRef = useRef(null);


  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);

  // first letter of user name
  const userInitial = user ? user.name.charAt(0).toUpperCase() : "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (featuresRef.current && !featuresRef.current.contains(event.target)) {
        setShowFeaturesMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // Handle feature click
  const handleFeatureClick = (path) => {
    if (!user) {
      setShowLogin(true); // open login modal
    } else {
      navigate(path); // go to feature page
    }
    setShowFeaturesMenu(false);
  };

  return (
    <div className=" flex items-center justify-between py-2 px-4 sm:px-6 lg:px-10 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-sm sticky top-0 z-50 w-full">
      {/* Logo */}
      <Link to="/" className="transition-transform hover:scale-100 duration-200">
        <img src="/logo8.png" alt="logo" className="w-20 sm:w-24 lg:w-28 drop-shadow-sm" />
      </Link>

      <div className="flex items-center gap-6">
        {/* Left Navigation */}
        <div className="hidden sm:flex items-center gap-6 text-gray-700 font-medium">
          {/* Credits visible only after login */}
          {user && (
            <button
              onClick={() => navigate('/pricing')}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200/50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <img className="w-4 sm:w-5" src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-semibold text-blue-700">Credits left: {credit}</p>
            </button>
          )}

          <Link to="/" className="hover:text-gray-900 transition-colors duration-200">Home</Link>

          {/* Features dropdown */}
          <div className="relative" ref={featuresRef}>
            <button
              onClick={() => setShowFeaturesMenu(!showFeaturesMenu)}
              className="hover:text-gray-900 transition-colors duration-200 flex items-center gap-0.5"
            >
              Features
              <span className="w-4 h-4">
                <ChevronDown />
              </span>
            </button>

            {showFeaturesMenu && (
              <div className="absolute mt-2 bg-white shadow-lg border rounded-lg py-2 w-52 z-20">
                <p onClick={() => handleFeatureClick('/generateimage')} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">AI Text to Image</p>
                <p onClick={() => handleFeatureClick('/textremoval')} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">AI Text Removal</p>
                <p onClick={() => handleFeatureClick('/bgreplacement')} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">AI Bg Replacement</p>
                <p onClick={() => handleFeatureClick('/imgupscaling')} className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">AI Image Upscaling</p>
              </div>
            )}
          </div>

          <p
            onClick={() => navigate('/pricing')}
            className="cursor-pointer hover:text-gray-900 transition-colors duration-200"
          >
            Pricing
          </p>
        </div>

        {/* Right Side */}
        {user ? (
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Profile circle */}
            <div className="relative" ref={profileRef}>
              <div
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold cursor-pointer hover:scale-105 transition-transform"
              >
                {userInitial}
              </div>

              {/* Profile dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-lg w-36 py-2 z-20">
                  <div className="px-4 pb-2 border-b">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
