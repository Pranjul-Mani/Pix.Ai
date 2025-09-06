import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()



  return (
    <section className="relative py-20 text-center ">
      <div className="max-w-3xl mx-auto px-6">
       
        <p className="inline-block px-4 py-1 mb-6 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
          ✨ All-in-One AI Toolkit
        </p>

       
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Powerful AI Tools for Your Creativity
        </h1>

       
        <p className="text-lg text-gray-600 mb-8">
          From generating images to enhancing, editing, and transforming them —
          explore everything you need in one place.
        </p>

       
        <div className="grid grid-cols-3 gap-6 mt-12 max-w-md mx-auto">
          <div>
            <div className="text-2xl font-bold text-blue-600">50K+</div>
            <p className="text-sm text-gray-500">Creators</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">1M+</div>
            <p className="text-sm text-gray-500">Projects</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-600">4.9★</div>
            <p className="text-sm text-gray-500">Reviews</p>
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Trusted by creators worldwide</p>
          <div className="flex justify-center gap-6 text-gray-400 text-sm">
            <span>Horizon AI</span>
            <span>Avengers</span>
            <span>ChannelFlow</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GenerateBtn
