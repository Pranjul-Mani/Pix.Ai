"use client"

import { useContext } from "react"
import { assets } from "../assets/assets"
import { motion } from "framer-motion"
import { AppContext } from "../context/AppContext"

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext)

 const onClickHandler = () => {
  if (user) {
    const element = document.getElementById("explore-tools");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    setShowLogin(true);
  }
};


  return (
    <motion.header
      onClick={onClickHandler}
      initial={{ opacity: 0.2, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="relative mx-auto max-w-7xl px-4 pt-14 pb-8 sm:pt-24 sm:pb-12"
    >
      <div className="flex items-center justify-between gap-8 lg:gap-12">
        
        {/* Left Content */}
        <div className="flex-1 max-w-2xl">
          {/* Tagline */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-3 py-1 text-neutral-700"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            aria-label="Product tagline"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <span className="text-sm">All-in-One AI Image Toolkit</span>
            <img src={assets.star_icon || "/placeholder.svg"} alt="" className="h-4 w-4" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-balance mt-6 text-4xl font-semibold leading-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2 }}
          >
            Create, Enhance & Transform Images with AI
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="mt-4 text-base leading-6 text-neutral-600 sm:text-lg sm:leading-7"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            From <span className="font-medium text-blue-600">text-to-image generation </span> 
            to <span className="font-medium text-blue-600">background replacement</span>, 
            <span className="font-medium text-blue-600"> image upscaling</span>, and 
            <span className="font-medium text-blue-600"> text removal</span> — our 
            AI tools give you everything you need to bring your ideas to life.
          </motion.p>

          {/* CTA */}
          <motion.div
            className="mt-8 flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              onClick={onClickHandler}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore AI Features
              <img className="h-5" src={assets.star_group || "/placeholder.svg"} alt="" />
            </motion.button>
          </motion.div>
        </div>

        {/* Right side - floating images remain unchanged */}
        <div className="relative hidden md:block flex-shrink-0 w-96 h-[28rem]">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-0"
            initial={{ opacity: 0, x: 20, rotate: -6 }}
            animate={{ opacity: 1, x: 0, rotate: -6, y: [-6, 6, -6] }}
            transition={{
              duration: 0.8,
              y: { duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", ease: "easeInOut" },
            }}
          >
            <div className="rounded-2xl border border-white/30 bg-white/60 p-2 shadow-md backdrop-blur-md">
              <img
                src="/main1.jpg"
                alt=""
                onError={(e) => { e.currentTarget.src = assets.sample_img_1 }}
                className="h-80 w-56 rounded-xl object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-16 left-0"
            initial={{ opacity: 0, x: -20, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 6, y: [6, -6, 6] }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              y: { duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "mirror", ease: "easeInOut", delay: 3 },
            }}
          >
            <div className="rounded-2xl border border-white/30 bg-white/60 p-2 shadow-md backdrop-blur-md">
              <img
                src="/main2.jpg"
                alt=""
                onError={(e) => { e.currentTarget.src = assets.sample_img_2 }}
                className="h-80 w-56 rounded-xl object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
