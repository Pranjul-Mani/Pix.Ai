import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Pricing = () => {
  const { user } = useContext(AppContext)

  // Animation variants for cards
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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  // Check if plan is most popular (middle one or highest credits)
  const getMostPopularIndex = () => {
    if (plans.length === 3) return 1 // Middle plan
    return plans.findIndex(
      plan => plan.credits === Math.max(...plans.map(p => p.credits))
    )
  }

  const mostPopularIndex = getMostPopularIndex()

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className='min-h-[80vh] text-center pt-14  relative overflow-hidden'
    >
      {/* Background decorative elements */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl' />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl' />
      </div>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='mb-12'
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 px-6 py-3 rounded-full mb-6'
        >
          <span className='text-xl'>💎</span>
          <span className='font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            Our Plans
          </span>
        </motion.div>

        <h1 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent'>
          Choose Your Perfect Plan
        </h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Unlock your creative potential with our flexible pricing options.
          Start free and scale as you grow.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto px-4'
      >
        {plans.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className={`relative bg-white/80 backdrop-blur-lg border rounded-2xl p-8 text-gray-600 hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl ${
              index === mostPopularIndex
                ? 'ring-2 ring-gradient-to-r from-blue-500 to-purple-500 border-blue-200 transform lg:scale-110'
                : 'border-gray-200 hover:border-blue-200'
            }`}
            whileHover={{ y: -10 }}
          >
            {/* Most Popular Badge */}
            {index === mostPopularIndex && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className='absolute -top-4 left-1/2 transform -translate-x-1/2'
              >
                <div className='bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg'>
                  ⭐ Most Popular
                </div>
              </motion.div>
            )}

            {/* Glow effect for popular plan */}
            {index === mostPopularIndex && (
              <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl -z-10' />
            )}

            <div className='relative z-10'>
              {/* Logo with gradient background */}
              <div className='relative mb-6'>
                <div className='w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4'>
                  <img
                    width={32}
                    src={assets.logo_icon}
                    alt=''
                    className='relative z-10'
                  />
                </div>
                <div className='absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl blur-lg' />
              </div>

              {/* Plan Details */}
              <div className='mb-6'>
                <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                  {item.id}
                </h3>
                <p className='text-gray-600 leading-relaxed'>{item.desc}</p>
              </div>

              {/* Pricing */}
              <div className='mb-8'>
                <div className='flex items-baseline gap-1 mb-2'>
                  <span className='text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    ₹{item.price}
                  </span>
                  <span className='text-gray-500'>/ {item.credits} credits</span>
                </div>
                <div className='text-sm text-gray-500'>
                  ≈ ₹{(item.price / item.credits).toFixed(2)} per credit
                </div>
              </div>

              {/* Features List */}
              <div className='mb-8 space-y-3'>
                <div className='flex items-center gap-2 text-sm'>
                  <span className='text-green-500 font-bold'>✓</span>
                  <span>{item.credits} AI image generations</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <span className='text-green-500 font-bold'>✓</span>
                  <span>High-resolution outputs</span>
                </div>
                <div className='flex items-center gap-2 text-sm'>
                  <span className='text-green-500 font-bold'>✓</span>
                  <span>Commercial license</span>
                </div>
                {index === mostPopularIndex && (
                  <div className='flex items-center gap-2 text-sm'>
                    <span className='text-blue-500 font-bold'>⚡</span>
                    <span className='text-blue-600 font-medium'>
                      Priority support
                    </span>
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <motion.button
                className={`w-full mt-auto text-white font-semibold py-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                  index === mostPopularIndex
                    ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                    : 'bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 hover:shadow-lg'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className='relative z-10'>
                  {user ? 'Buy Credits' : 'Get Started'}
                </span>

                {/* Button shimmer effect */}
                <div className='absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-700' />
              </motion.button>

              {/* Money back guarantee for popular plan */}
              {index === mostPopularIndex && (
                <div className='text-center mt-3 text-xs text-gray-500'>
                  💰 30-day money-back guarantee
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className='mt-16 text-center'
      >
        
      </motion.div>
    </motion.div>
  )
}

export default Pricing
