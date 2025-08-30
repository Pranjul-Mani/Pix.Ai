import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Wand2, Image, Download, ChevronRight, Zap } from 'lucide-react'

// Sample steps data - replace with your actual stepsData
const stepsData = [
  {
    icon: <Wand2 className="w-8 h-8" />,
    title: "Describe Your Vision",
    description: "Simply type what you want to see. Be creative with your words and watch magic happen.",
    details: "Our AI understands complex prompts, artistic styles, and creative concepts to bring your imagination to life.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "AI Processing Magic",
    description: "Our advanced AI transforms your words into stunning visual concepts in seconds.",
    details: "Powered by cutting-edge machine learning algorithms that understand context, style, and artistic composition.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Image className="w-8 h-8" />,
    title: "Generate & Refine",
    description: "Watch as multiple unique images are created. Choose your favorite or generate more variations.",
    details: "Get multiple options, adjust parameters, and fine-tune until you get the perfect image that matches your vision.",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: <Download className="w-8 h-8" />,
    title: "Download & Share",
    description: "Save your masterpiece in high quality and share it with the world.",
    details: "Export in various formats and resolutions. Perfect for social media, print, or professional use.",
    color: "from-orange-500 to-red-500"
  }
]

const Steps = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [expandedCard, setExpandedCard] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1,
      rotateX: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  const iconVariants = {
    hover: {
      scale: 1,
      rotate: 10,
      transition: { duration: 0.3 }
    }
  }

  const glowVariants = {
    hover: {
      opacity: 0.8,
      scale: 1,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.div  
      initial={{ opacity: 0.2, y: 100 }} 
      transition={{ duration: 1 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-32 px-4'
    >
      {/* Header Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full text-purple-600 text-sm font-medium mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Zap className="w-4 h-4" />
          Simple Process
        </motion.div>
        
        <h1 className='text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
          How It Works
        </h1>

        <p className='text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
          Transform your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">words into stunning images</span> with just a few simple steps
        </p>
      </motion.div>

      {/* Steps Cards - Horizontal Layout */}
      <motion.div 
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl'
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stepsData.map((item, index) => (
          <motion.div 
            key={index}
            variants={cardVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            className='relative group cursor-pointer'
          >
            {/* Glow Effect */}
            <motion.div
              className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-10 group-hover:opacity-20 transition-all duration-300`}
              variants={glowVariants}
            />
            
            {/* Main Card */}
            <div className='relative flex flex-col items-center text-center gap-4 p-6 bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 h-full'>
              
              {/* Step Number */}
              <div className="flex flex-col items-center">
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-sm`}
                  variants={iconVariants}
                >
                  {item.icon}
                </motion.div>
                
                <span className="text-xs font-semibold text-gray-400 mt-2">
                  Step {index + 1}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h2 className='text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors'>
                  {item.title}
                </h2>
                
                <p className='text-sm text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed flex-1'>
                  {item.description}
                </p>

              </div>

              {/* Click indicator */}
              <motion.div
                className="absolute top-3 right-3"
                animate={{ 
                  scale: expandedCard === index ? 1.2 : 1,
                  rotate: expandedCard === index ? 180 : 0
                }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-3 h-3 text-gray-400" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

   
    </motion.div>
  )
}

export default Steps