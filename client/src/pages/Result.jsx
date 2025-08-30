import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { motion, AnimatePresence } from 'framer-motion'
import { AppContext } from '../context/AppContext'

const Result = () => {

  const [image, setImage] = useState(assets.puppy)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')

  const { generateImage } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (input) {
      const image = await generateImage(input)
      if (image) {
        setIsImageLoaded(true)
        setImage(image)
      }
    }
    setLoading(false)
  }

  // Enhanced Loader Component
  const LoaderComponent = () => (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded flex flex-col items-center justify-center z-10">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-16 h-16 border-4 border-blue-200/30 rounded-full animate-spin border-t-blue-500"></div>

        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>

        {/* Orbiting dots */}
        <div className="absolute inset-0 animate-spin">
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 animate-ping"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDelay: '0.5s', animationDirection: 'reverse' }}>
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 animate-ping"></div>
        </div>
      </div>

      {/* Loading text with typewriter effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 text-white font-medium"
      >
        <div className="flex items-center space-x-1">
          <span>Generating your image</span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ...
          </motion.span>
        </div>
      </motion.div>

      {/* Progress indicators */}
      <div className="flex space-x-1 mt-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-blue-400 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
    </div>
  )

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className='flex flex-col min-h-[90vh] justify-center items-center p-4'
    >
      {/* Enhanced Image Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className='relative group'>
          <motion.img
            src={image}
            alt=""
            className='max-w-sm w-full h-auto rounded-xl shadow-2xl transition-all duration-300 group-hover:shadow-3xl'
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          />

          {/* Enhanced Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200/20 rounded-b-xl overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{
                width: loading ? '100%' : '0%',
              }}
              transition={{
                duration: loading ? 10 : 0.3,
                ease: loading ? "linear" : "easeInOut"
              }}
            />
          </div>

          {/* Overlay Loader */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LoaderComponent />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Shimmer effect during loading */}
          {loading && (
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Input Section - Always visible now */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className='flex w-full max-w-xl mb-6'
      >
        <div className='flex w-full bg-gradient-to-r from-neutral-800 to-neutral-700 backdrop-blur-sm text-white text-sm p-1 rounded-full shadow-xl border border-neutral-600/50'>
          <input
            onChange={e => setInput(e.target.value)}
            value={input}
            disabled={loading}
            type="text"
            placeholder='Describe what you want to generate...'
            className='flex-1 bg-transparent outline-none ml-6 max-sm:ml-4 placeholder-neutral-400 disabled:opacity-50 transition-opacity'
          />
          <motion.button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-blue-400 disabled:to-blue-300 px-8 sm:px-12 py-3 rounded-full font-medium transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!loading && input.trim() ? { scale: 1.02 } : {}}
            whileTap={!loading && input.trim() ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Generating</span>
              </div>
            ) : (
              'Generate'
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Action Buttons - Enhanced */}
      <AnimatePresence>
        {isImageLoaded && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='flex gap-4 flex-wrap justify-center text-sm'
          >
            <motion.button
              onClick={() => { 
                setIsImageLoaded(false)
                setInput('') // Clear the input field
                setImage(assets.puppy) // Reset to default image
              }}
              className='bg-transparent border-2 border-zinc-800 hover:border-zinc-700 text-zinc-800 hover:text-zinc-700 hover:bg-zinc-50 px-8 py-3 rounded-full cursor-pointer font-medium transition-all duration-200 shadow-lg'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Generate Another
            </motion.button>

            <motion.a
              href={image}
              download
              className='bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 text-white px-10 py-3 rounded-full cursor-pointer font-medium transition-all duration-200 shadow-xl flex items-center space-x-2'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  )
}

export default Result