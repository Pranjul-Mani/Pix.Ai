import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Description = () => {
  const [hoveredCard, setHoveredCard] = useState(null)

  // Gallery data with text prompts and corresponding images
  const galleryItems = [
    {
      id: 1,
      prompt: "A majestic dragon soaring through stormy clouds",
      image: "/dragon.avif",
      category: "Fantasy"
    },
    {
      id: 2,
      prompt: "Beautiful Baghdad princess",
      image: "/girl2.webp",
      category: "Sci-Fi"
    },
    {
      id: 3,
      prompt: "Peaceful mountain lake at sunset",
      image: "/lake.jpg",
      category: "Nature"
    },
    {
      id: 4,
      prompt: "A cute tiger roaming in the forest with dense trees around",
      image:"/tiger.png",
      category: "Cartoon"
    },
    {
      id: 5,
      prompt: "Vintage steam locomotive in a forest",
      image: "/img6.webp",
      category: "Vintage"
    },
    {
      id: 6,
      prompt: "Solar system with all the 8 planets revolving around sun",
      image:"ss.jpg",
      category: "Space"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-24 p-6 md:px-28'
    >
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className='text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          Create AI Images
        </h1>
        <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
          Turn your imagination into visuals with our advanced AI technology
        </p>
        
        {/* Feature highlights */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            ⚡ Instant Generation
          </div>
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            🎨 High Quality
          </div>
          {/* <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
            🆓 Completely Free
          </div> */}
          <div className="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
            🚀 No Limits
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16 w-full max-w-7xl"
      >
        {galleryItems.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
            whileHover={{ y: -8 }}
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={item.image}
                alt={item.prompt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  {item.category}
                </span>
              </div>

              {/* Overlay */}
              <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                hoveredCard === item.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-3">
                    <p className="text-white text-sm leading-relaxed">
                      "{item.prompt}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <p className="text-gray-700 text-sm line-clamp-2">
                {item.prompt}
              </p>
              
              {/* Generate Similar Button */}
              {/* <motion.button
                className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg opacity-0 group-hover:opacity-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Generate Similar
              </motion.button> */}
            </div>
          </motion.div>
        ))}
      </motion.div>

    </motion.div>
  )
}

export default Description