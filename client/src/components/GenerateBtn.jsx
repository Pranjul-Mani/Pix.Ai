import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {
    const { user, setShowLogin } = useContext(AppContext)
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true)
        }
    }

    const floatingVariants = {
        animate: {
            y: [-8, 8, -8],
            transition: {
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className='relative pb-16 text-center overflow-hidden'
        >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 opacity-70" />
                
                {/* Floating decorative elements */}
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-10 left-1/4 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-sm"
                />
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: '2s' }}
                    className="absolute top-20 right-1/4 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-sm"
                />
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: '1s' }}
                    className="absolute bottom-10 left-1/3 w-20 h-20 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full opacity-15 blur-sm"
                />
            </div>

            {/* Main CTA Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-4xl mx-auto px-4"
            >
                {/* Premium badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 px-4 py-2 rounded-full mb-6"
                >
                    <span className="text-2xl">✨</span>
                    <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Join 50,000+ Happy Creators
                    </span>
                </motion.div>

                {/* Enhanced glass card */}
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/40 shadow-xl relative overflow-hidden">
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl" />
                    
                    <div className="relative">
                        {/* Main heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight'
                        >
                            See the Magic. Try Now
                        </motion.h1>

                        {/* Enhanced description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
                        >
                            Experience the magic of AI-powered image generation and see why our users love creating with us. 
                            Transform your ideas into stunning visuals in seconds.
                        </motion.p>

                        {/* Stats section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="grid grid-cols-3 gap-6 mb-8 max-w-md mx-auto"
                        >
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">50K+</div>
                                <div className="text-sm text-gray-500">Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">1M+</div>
                                <div className="text-sm text-gray-500">Images Created</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-pink-600">4.9★</div>
                                <div className="text-sm text-gray-500">Rating</div>
                            </div>
                        </motion.div>

                        {/* Enhanced button with multiple states */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            className="space-y-4"
                        >
                            <motion.button
                                onClick={onClickHandler}
                                className='group relative inline-flex items-center gap-3 px-8 md:px-12 py-4 md:py-5 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold text-lg md:text-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 overflow-hidden'
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)"
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {/* Button glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <span className="relative z-10">
                                    {user ? 'Create Images Now' : 'Start Your Creative Journey'}
                                </span>
                                
                                <motion.img 
                                    src={assets.star_group} 
                                    alt='' 
                                    className='h-6 md:h-7 relative z-10' 
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                                
                                {/* Shimmer effect */}
                                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                            </motion.button>

                            {/* Secondary info */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="flex flex-wrap justify-center gap-4 text-sm text-gray-500"
                            >
                                <div className="flex items-center gap-1">
                                    <span className="text-green-500">✓</span>
                                    No Credit Card Required
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-green-500">✓</span>
                                    Free Forever
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="text-green-500">✓</span>
                                    Instant Results
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Trust indicators */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className="mt-8 pt-6 border-t border-gray-200"
                        >
                            <p className="text-sm text-gray-500 mb-4">Trusted by creators worldwide</p>
                            <div className="flex justify-center items-center gap-4 opacity-60">
                                {/* You can replace these with actual company logos */}
                                <div className="w-20 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                    Horizon AI
                                </div>
                                <div className="w-20 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                    Avengers 
                                </div>
                                <div className="w-20 h-8 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                                    ChannelFlow
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default GenerateBtn