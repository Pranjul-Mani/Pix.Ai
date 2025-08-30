import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between py-1 sm:py-2 px-4 sm:px-6 lg:px-8 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-sm sticky top-0 z-50 w-full'>
      <Link to='/' className='transition-transform hover:scale-100 duration-200'>
        <img src="/logo8.png" alt='logo' className='w-20 sm:w-24 lg:w-28 drop-shadow-sm' />
      </Link>

      <div>
        {/* checking user is login or logout */}
        {
          user ?
            <div className='flex items-center gap-2 sm:gap-3'>
              <button
                onClick={() => navigate('/pricing')}
                className='flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200/50 px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:scale-100 transition-all duration-300 shadow-sm hover:shadow-md'
              >
                <img className='w-4 sm:w-5' src={assets.credit_star} alt='' />
                <p className='text-xs sm:text-sm font-semibold text-blue-700'>Credits left: {credit}</p>
              </button>

              <p className='max-sm:hidden pl-4 text-gray-700 font-medium'>Hi, {user.name}</p>

              <div className='relative group'>
                <div className='p-1 rounded-full bg-white/60 hover:bg-white/80 transition-all duration-200 shadow-sm hover:shadow-md'>
                  <img src={assets.profile_icon} className='w-8 sm:w-10 drop-shadow-sm' alt="" />
                </div>

                <div className='absolute hidden group-hover:block top-0 right-0 z-10 rounded pt-12'>
                  <ul className='list-none m-0 p-0 bg-white/95 backdrop-blur-md rounded-lg border border-gray-200/50 shadow-lg text-sm overflow-hidden'>
                    <li
                      onClick={logout}
                      className='py-3 px-4 cursor-pointer text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 font-medium min-w-[100px]'
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            :
            <div className='flex items-center gap-3 sm:gap-5'>
              <p
                onClick={() => navigate('/buy')}
                className='cursor-pointer text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 hover:scale-105 transform'
              >
                Pricing
              </p>

              <button
                onClick={() => setShowLogin(true)}
                className='bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-6 py-2.5 sm:px-10 sm:py-3 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl'
              >
                Login
              </button>
            </div>
        }
      </div>
    </div>
  )
}

export default Navbar