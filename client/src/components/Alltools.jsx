import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { ImageIcon, ZoomIn, Scissors, Type } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'   

const toolsData = [
  {
    icon: <Type className="w-10 h-10" />,
    title: "AI Text to Image",
    description: "Turn your words into stunning visuals using AI-powered text-to-image generation.",
    link: "/generateimage",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <ZoomIn className="w-10 h-10" />,
    title: "AI Image Upscaling",
    description: "Enhance and upscale your images without losing quality using advanced AI models.",
    link: "/imgupscaling",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <ImageIcon className="w-10 h-10" />,
    title: "AI Background Replacement",
    description: "Easily remove and replace backgrounds with smart AI-based background editing.",
    link: "/bgreplacement",
    color: "from-emerald-500 to-teal-500"
  },
  {
    icon: <Scissors className="w-10 h-10" />,
    title: "AI Text Removal",
    description: "Remove unwanted text from your images seamlessly while keeping details intact.",
    link: "/textremoval",
    color: "from-orange-500 to-red-500"
  }
]

const Steps = () => {
  const navigate = useNavigate()
  const { user, setShowLogin } = useContext(AppContext)   

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { y: -8, transition: { duration: 0.3, ease: "easeInOut" } }
  }

  // ✅ Handle feature click
  const handleToolClick = (link) => {
    if (!user) {
      setShowLogin(true)   
    } else {
      navigate(link)       
    }
  }

  return (
    <motion.div
      id="explore-tools"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-32 px-4"
    >
      {/* Header Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Explore Our AI Tools
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Powerful AI tools to edit, generate, and enhance your images instantly
        </p>
      </motion.div>

      {/* Tools Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {toolsData.map((tool, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            onClick={() => handleToolClick(tool.link)}   
            className="relative group cursor-pointer"
          >
            {/* Glow Effect */}
            <motion.div
              className={`absolute -inset-0.5 bg-gradient-to-r ${tool.color} rounded-2xl blur opacity-10 group-hover:opacity-20 transition-all duration-300`}
            />

            {/* Main Card */}
            <div className="relative flex flex-col items-center text-center gap-4 p-6 bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 h-full">
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.color} flex items-center justify-center text-white shadow-sm`}
              >
                {tool.icon}
              </div>

              {/* Content */}
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                {tool.title}
              </h2>
              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed flex-1">
                {tool.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Steps
