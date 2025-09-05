import React, { useContext, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const ImageEditor = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState('remove-text');
  const [backgroundPrompt, setBackgroundPrompt] = useState('');
  const [upscaleWidth, setUpscaleWidth] = useState(1024);
  const [upscaleHeight, setUpscaleHeight] = useState(1024);
  
  const fileInputRef = useRef(null);
  const { removeTextFromImage, replaceImageBackground, upscaleImage } = useContext(AppContext);

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
    let result;
    
    try {
      switch (activeFeature) {
        case 'remove-text':
          result = await removeTextFromImage(selectedImage);
          break;
        case 'replace-background':
          result = await replaceImageBackground(selectedImage, backgroundPrompt);
          break;
        case 'upscale':
          result = await upscaleImage(selectedImage, upscaleWidth, upscaleHeight);
          break;
        default:
          break;
      }
      
      if (result) {
        setResultImage(result);
      }
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { id: 'remove-text', name: 'Remove Text', icon: '🗑️' },
    { id: 'replace-background', name: 'Replace Background', icon: '🌟' },
    { id: 'upscale', name: 'Upscale Image', icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-gray-800 mb-8"
        >
          AI Image Editor
        </motion.h1>

        {/* Feature Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-full p-2 shadow-lg">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`px-6 py-3 mx-1 rounded-full font-medium transition-all duration-200 ${
                  activeFeature === feature.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{feature.icon}</span>
                {feature.name}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Upload Image</h2>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="max-w-full max-h-64 mx-auto rounded" />
              ) : (
                <div>
                  <div className="text-4xl mb-4">📸</div>
                  <p className="text-gray-600">Click to upload an image</p>
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

            {/* Feature-specific controls */}
            <div className="mt-6">
              {activeFeature === 'replace-background' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Description (optional)
                  </label>
                  <input
                    type="text"
                    value={backgroundPrompt}
                    onChange={(e) => setBackgroundPrompt(e.target.value)}
                    placeholder="Describe the new background..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
              
              {activeFeature === 'upscale' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Width
                    </label>
                    <input
                      type="number"
                      value={upscaleWidth}
                      onChange={(e) => setUpscaleWidth(parseInt(e.target.value) || 1024)}
                      min="1"
                      max="4096"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Height
                    </label>
                    <input
                      type="number"
                      value={upscaleHeight}
                      onChange={(e) => setUpscaleHeight(parseInt(e.target.value) || 1024)}
                      min="1"
                      max="4096"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={processImage}
              disabled={!selectedImage || loading}
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Processing...' : `Apply ${features.find(f => f.id === activeFeature)?.name}`}
            </button>
          </motion.div>

          {/* Result Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Result</h2>
            
            <div className="border-2 border-gray-200 rounded-lg p-4 min-h-64 flex items-center justify-center">
              {loading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Processing your image...</p>
                </div>
              ) : resultImage ? (
                <img src={resultImage} alt="Result" className="max-w-full max-h-96 rounded" />
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">🖼️</div>
                  <p>Processed image will appear here</p>
                </div>
              )}
            </div>

            {resultImage && !loading && (
              <div className="mt-4 flex justify-center">
                <a
                  href={resultImage}
                  download="processed-image.png"
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Download Result
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;