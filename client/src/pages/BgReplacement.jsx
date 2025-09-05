import React, { useContext, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const BackgroundReplacement = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backgroundPrompt, setBackgroundPrompt] = useState('');
  
  const fileInputRef = useRef(null);
  const { replaceImageBackground } = useContext(AppContext);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
      setResultImage(null);
    }
  };

  const processImage = async () => {
    if (!selectedImage) return;
    
    setLoading(true);
    try {
      const result = await replaceImageBackground(selectedImage, backgroundPrompt);
      if (result) {
        setResultImage(result);
      }
    } catch (error) {
      console.error('Error replacing background:', error);
    } finally {
      setLoading(false);
    }
  };

  const promptSuggestions = [
    "tropical beach at sunset",
    "modern city skyline",
    "cozy coffee shop interior",
    "mountain landscape",
    "outer space with stars",
    "enchanted forest",
    "luxury office setting",
    "vintage library"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600">
      {/* Hero Section with Video */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              AI Background Replacement
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto"
            >
              Transform any photo by replacing the background with AI-generated scenes. 
              Perfect for product photography, portraits, and creative projects.
            </motion.p>
          </div>

          {/* Video Demo Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
              <h2 className="text-2xl font-semibold mb-2 text-center">See the Magic in Action</h2>
              <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                <video 
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted
                  poster="/path-to-your-poster.jpg"
                >
                  <source src="/replace-bg.mp4" type="video/mp4" />
                </video>
              </div>
              
              
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <span className="text-2xl">🖼️</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Upload & Customize</h2>
            </div>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-3 border-dashed border-purple-300 rounded-2xl p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 mb-6"
            >
              {previewImage ? (
                <div className="relative">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="max-w-full max-h-64 mx-auto rounded-xl shadow-lg"
                  />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(null);
                      setSelectedImage(null);
                      setResultImage(null);
                    }}
                    className="absolute top-2 right-2 bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-purple-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-6xl mb-4">📷</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Click to upload your photo</h3>
                  <p className="text-gray-500 mb-4">Best results with clear subjects</p>
                  <div className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-8 rounded-full inline-block transition-colors">
                    Choose Image
                  </div>
                </div>
              )}
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Background Prompt Section */}
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Describe Your Dream Background
              </label>
              <textarea
                value={backgroundPrompt}
                onChange={(e) => setBackgroundPrompt(e.target.value)}
                placeholder="Describe the background you want... (e.g., 'tropical beach at sunset with palm trees')"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all h-24 resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">💡 Leave blank for auto-generated background</p>
            </div>

            {/* Prompt Suggestions */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-700 mb-3">Quick Ideas:</h4>
              <div className="flex flex-wrap gap-2">
                {promptSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setBackgroundPrompt(suggestion)}
                    className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={processImage}
              disabled={!selectedImage || loading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 shadow-lg disabled:cursor-not-allowed"
              whileHover={!loading && selectedImage ? { scale: 1.02 } : {}}
              whileTap={!loading && selectedImage ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Magic...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                 
                  <span>Replace Background</span>
                </div>
              )}
            </motion.button>
          </motion.div>

          {/* Result Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Transformed Image</h2>
            </div>
            
            <div className="border-2 border-gray-200 rounded-2xl p-8 min-h-96 flex items-center justify-center bg-gray-50">
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="relative mb-6">
                      <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin border-t-purple-500 mx-auto"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">AI is creating your scene</h3>
                    <p className="text-gray-500">Replacing background with: "{backgroundPrompt || 'auto-generated scene'}"</p>
                    <div className="flex justify-center mt-4 space-x-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }}
                        ></div>
                      ))}
                    </div>
                  </motion.div>
                ) : resultImage ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full text-center"
                  >
                    <img 
                      src={resultImage} 
                      alt="Result" 
                      className="max-w-full max-h-80 mx-auto rounded-xl shadow-lg mb-6"
                    />
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => {
                          setResultImage(null);
                          setBackgroundPrompt('');
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-full transition-colors"
                      >
                        Try Different Scene
                      </button>
                      <a
                        href={resultImage}
                        download="background-replaced-image.png"
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-full transition-colors inline-flex items-center space-x-2"
                      >
                        <span>💾</span>
                        <span>Download</span>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-500"
                  >
                    <div className="text-6xl mb-4">🎭</div>
                    <h3 className="text-xl font-semibold mb-2">Your transformed image will appear here</h3>
                    <p>Upload a photo and describe your dream background!</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundReplacement;