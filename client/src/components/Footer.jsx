import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black mt-20 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
    
      </div>

      {/* Main Footer Content */}
      <div className="relative px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

            {/* Logo and Stats */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="mb-4">
                <img src="/logo8.png" alt="logo" className="w-32 mb-4 brightness-0 invert" />
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">50K+</div>
                  <div className="text-xs text-gray-400">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">1M+</div>
                  <div className="text-xs text-gray-400">Images</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-pink-400">4.9★</div>
                  <div className="text-xs text-gray-400">Rating</div>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-lg font-bold text-white mb-4 relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </h3>
              <div className="space-y-2">
                {[
                  { name: "About Us", href: "/" },
                  { name: "How it Works", href: "/" },
                  { name: "Pricing", href: "/pricing" },
                  { name: "Gallery", href: "/" },
                  { name: "API Docs", href: "/" }
                ].map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1 group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Support */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h3 className="text-lg font-bold text-white mb-4 relative">
                Support
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              </h3>
              <div className="space-y-3">
                <div className="group">
                  <div className="text-gray-400 text-sm mb-1">Email</div>
                  <a href="mailto:support@pixai.com" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span className="text-blue-400">📧</span>
                    support@pixai.com
                  </a>
                </div>
                <div className="group">
                  <div className="text-gray-400 text-sm mb-1">Phone</div>
                  <a href="tel:+919876543210" className="text-gray-300 hover:text-green-400 transition-colors flex items-center gap-2">
                    <span className="text-green-400">📞</span>
                    +91 98765 XXXXX
                  </a>
                </div>
                <div className="group">
                  <div className="text-gray-400 text-sm mb-1">Address</div>
                  <p className="text-gray-300 flex items-start gap-2">
                    <span className="text-red-400 mt-1">📍</span>
                    GT Road Abunagar, Fatehpur, India 
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Media and Newsletter */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-4 relative">
                  Connect
                  <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"></div>
                </h3>
                
                {/* Social Icons */}
                <div className="flex gap-3 mb-4">
                  {[
                    { name: "Facebook", icon: assets.facebook_icon, href: "https://facebook.com", color: "hover:bg-blue-600" },
                    { name: "Twitter", icon: assets.twitter_icon, href: "https://twitter.com", color: "hover:bg-sky-500" },
                    { name: "Instagram", icon: assets.instagram_icon, href: "https://instagram.com", color: "hover:bg-pink-600" }
                  ].map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full bg-gray-800 ${social.color} transition-all duration-300 group`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img src={social.icon} alt={social.name} className="w-4 h-4 brightness-0 invert group-hover:brightness-100 group-hover:invert-0" />
                    </motion.a>
                  ))}
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-3 border border-gray-600">
                  <h4 className="text-white font-semibold mb-1 text-sm">Stay Updated</h4>
                  <p className="text-gray-300 text-xs mb-2">Get latest updates</p>
                  <div className="flex gap-1">
                    <input 
                      type="email" 
                      placeholder="Email"
                      className="flex-1 px-2 py-1.5 bg-gray-900 border border-gray-600 rounded-md text-white text-xs placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                    <motion.button 
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md text-xs font-medium whitespace-nowrap"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Join
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="max-w-7xl mx-auto mt-4 pt-6 border-t border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>&copy; {currentYear} Pix.Ai. All rights reserved.</span>
              <div className="flex gap-4">
                <a href="/" className="hover:text-white transition-colors">Terms</a>
                <a href="/" className="hover:text-white transition-colors">Privacy</a>
                <a href="/" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
            
            {/* Made with love */}
            {/* <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <motion.span 
                className="text-red-400 text-base"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              <span>for creators worldwide</span>
            </div> */}
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        className="absolute bottom-6 right-6 p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg opacity-70 hover:opacity-100 transition-all duration-300"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-lg">↑</span>
      </motion.button>
    </motion.footer>
  );
};

export default Footer;