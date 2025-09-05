import React, { useContext, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const ImageUpscaling = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [upscaleWidth, setUpscaleWidth] = useState(2048);
  const [upscaleHeight, setUpscaleHeight] = useState(2048);
  const [originalDimensions, setOriginalDimensions] = useState(null);
  
  const fileInputRef = useRef(null);
  const { upscaleImage } = useContext(AppContext);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        // Get original dimensions
        const img = new Image();
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height });
          // Set default upscale dimensions (2x original)
          setUpscaleWidth(Math.min(img.width * 2, 4096));
          setUpscaleHeight(Math.min(img.height * 2, 4096));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
      setResultImage(null);
    }
  };

  const processImage = async () => {
    if (!selectedImage) return;
    
    setLoading(true);
    try {
      const result = await upscaleImage(selectedImage, upscaleWidth, upscaleHeight);
      if (result) {
        setResultImage(result);
      }
    } catch (error) {
      console.error('Error upscaling image:', error);
    } finally {
      setLoading(false);
    }
  };

  const presetSizes = [
    { name: '2X', multiplier: 2 },
    { name: '3X', multiplier: 3 },
    { name: '4X', multiplier: 4 },
    { name: 'HD', width: 1920, height: 1080 },
    { name: '4K', width: 3840, height: 2160 },
    { name: 'Custom', multiplier: 0 }
  ];

  const applyPreset = (preset) => {
    if (!originalDimensions) return;
    
    if (preset.multiplier > 0) {
      const newWidth = Math.min(originalDimensions.width * preset.multiplier, 4096);
      const newHeight = Math.min(originalDimensions.height * preset.multiplier, 4096);
      setUpscaleWidth(newWidth);
      setUpscaleHeight(newHeight);
    } else if (preset.width && preset.height) {
      setUpscaleWidth(preset.width);
      setUpscaleHeight(preset.height);
    }
  };

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
              AI Image Upscaling
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto"
            >
              Enhance your images with AI-powered upscaling. Increase resolution up to 4K 
              while preserving and improving quality, detail, and sharpness.
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
              <h2 className="text-2xl font-semibold mb-2 text-center">Watch the Enhancement</h2>
              <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                <video 
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted
                  poster="/path-to-your-poster.jpg"
                >
                  <source src="/img-upscaling.mp4" type="video/mp4" />
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
                <span className="text-2xl">📈</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Upload & Enhance</h2>
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
                  {originalDimensions && (
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {originalDimensions.width} × {originalDimensions.height}
                    </div>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(null);
                      setSelectedImage(null);
                      setResultImage(null);
                      setOriginalDimensions(null);
                    }}
                    className="absolute top-2 right-2 bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-purple-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-6xl mb-4">🖼️</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Click to upload your image</h3>
                  <p className="text-gray-500 mb-4">Supports JPG, PNG, WebP (max 30MB)</p>
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

            {/* Size Selection */}
            {originalDimensions && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Choose Target Size</h3>
                
                {/* Preset Sizes */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {presetSizes.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => applyPreset(preset)}
                      className="px-3 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium"
                    >
                      {preset.name}
                      {preset.multiplier > 0 && (
                        <div className="text-xs text-purple-600">
                          {Math.min(originalDimensions.width * preset.multiplier, 4096)} × {Math.min(originalDimensions.height * preset.multiplier, 4096)}
                        </div>
                      )}
                      {preset.width && preset.height && (
                        <div className="text-xs text-purple-600">
                          {preset.width} × {preset.height}
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Custom Size Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Width
                    </label>
                    <input
                      type="number"
                      value={upscaleWidth}
                      onChange={(e) => setUpscaleWidth(Math.max(1, Math.min(4096, parseInt(e.target.value) || 1)))}
                      min="1"
                      max="4096"
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Height
                    </label>
                    <input
                      type="number"
                      value={upscaleHeight}
                      onChange={(e) => setUpscaleHeight(Math.max(1, Math.min(4096, parseInt(e.target.value) || 1)))}
                      min="1"
                      max="4096"
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    />
                  </div>
                </div>

                {/* Size Comparison */}
                <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-700">
                    <strong>Original:</strong> {originalDimensions.width} × {originalDimensions.height}
                    <span className="mx-2">→</span>
                    <strong>Enhanced:</strong> {upscaleWidth} × {upscaleHeight}
                    <span className="ml-2 text-purple-600">
                      ({((upscaleWidth * upscaleHeight) / (originalDimensions.width * originalDimensions.height)).toFixed(1)}× larger)
                    </span>
                  </div>
                </div>
              </div>
            )}

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
                  <span>Enhancing Image...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                 
                  <span>Upscale Image</span>
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
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Enhanced Result</h2>
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
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">AI is enhancing your image</h3>
                    <p className="text-gray-500">Upscaling to {upscaleWidth} × {upscaleHeight} pixels...</p>
                    <div className="flex justify-center mt-4 space-x-1">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.1}s` }}
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
                    <div className="relative">
                      <img 
                        src={resultImage} 
                        alt="Enhanced Result" 
                        className="max-w-full max-h-80 mx-auto rounded-xl shadow-lg mb-4"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {upscaleWidth} × {upscaleHeight}
                      </div>
                    </div>
                    <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        🎉 Your image has been successfully enhanced to {upscaleWidth} × {upscaleHeight} resolution!
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => {
                          setResultImage(null);
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-full transition-colors"
                      >
                        Enhance Another
                      </button>
                      <a
                        href={resultImage}
                        download="upscaled-image.jpg"
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-full transition-colors inline-flex items-center space-x-2"
                      >
                        <span>💾</span>
                        <span>Download HD</span>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-500"
                  >
                    <div className="text-6xl mb-4">📏</div>
                    <h3 className="text-xl font-semibold mb-2">Your enhanced image will appear here</h3>
                    <p>Upload an image and choose your target resolution to get started!</p>
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

export default ImageUpscaling;