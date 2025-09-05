import React, { useState, useEffect } from 'react'
import { assets, testimonialsData } from '../assets/assets'
import { motion, AnimatePresence } from 'framer-motion'

const Testimonials = () => {
    const [activeCard, setActiveCard] = useState(null)
    const [currentSlide, setCurrentSlide] = useState(0)

    // Auto-rotate featured testimonial
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonialsData.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                duration: 0.6
            }
        }
    }

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 60,
            scale: 0.8
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    }

    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }} 
            transition={{ duration: 1 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className='relative flex flex-col items-center justify-center my-20 py-12 px-4 overflow-hidden'
        >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10">
                {/* Animated background gradient */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-60" /> */}
                
                {/* Floating shapes */}
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20"
                />
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: '2s' }}
                    className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20"
                />
                <motion.div
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: '4s' }}
                    className="absolute bottom-40 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-20"
                />
            </div>

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 mb-6">
                    <span className="text-2xl">💬</span>
                    <span className="text-sm font-medium text-gray-700">Real Stories, Real Results</span>
                </div>
                
                <h1 className='text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                    Customer Testimonials
                </h1>
                <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                    Discover how our AI image generator has transformed creativity for thousands of users worldwide
                </p>
            </motion.div>


            {/* Testimonials Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full'
            >
                {testimonialsData.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        variants={cardVariants}
                        className={`group relative bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-white/40 ${
                            activeCard === index ? 'scale-105' : ''
                        }`}
                        onMouseEnter={() => setActiveCard(index)}
                        onMouseLeave={() => setActiveCard(null)}
                        whileHover={{ 
                            y: -8,
                            transition: { duration: 0.3 }
                        }}
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                        
                        {/* Quote mark */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                            "
                        </div>
                        
                        <div className='flex flex-col items-center text-center'>
                            {/* Profile section */}
                            <div className="relative mb-6">
                                <motion.img 
                                    src={testimonial.image} 
                                    alt={testimonial.name}
                                    className='w-16 h-16 rounded-full border-4 border-white shadow-lg'
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                {/* Status indicator */}
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                    <span className="text-white text-xs">✓</span>
                                </div>
                            </div>
                            
                            <h2 className='text-xl font-bold text-gray-800 mb-1'>{testimonial.name}</h2>
                            <p className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-semibold mb-4'>
                                {testimonial.role}
                            </p>

                            {/* Animated stars */}
                            <div className='flex mb-6 gap-1'>
                                {Array(testimonial.stars).fill().map((_, starIndex) => (
                                    <motion.img 
                                        key={starIndex}
                                        src={assets.rating_star} 
                                        alt='star'
                                        className="w-5 h-5"
                                        whileHover={{ 
                                            scale: 1.2, 
                                            rotate: 360,
                                            transition: { duration: 0.3 }
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Testimonial text */}
                            <p className='text-gray-700 leading-relaxed text-sm relative'>
                                <span className="text-blue-500 text-4xl absolute -top-2 -left-2 opacity-20">"</span>
                                {testimonial.text}
                                <span className="text-blue-500 text-4xl absolute -bottom-6 -right-2 opacity-20">"</span>
                            </p>

                            {/* Like button */}
                            <motion.button
                                className="mt-6 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>❤️</span>
                                Helpful
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            
        </motion.div>
    )
}

export default Testimonials