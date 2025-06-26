import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import contentManager from '../lib/contentManager';

const { FiImage, FiEdit, FiSave, FiX, FiUpload, FiLink, FiCopy, FiExternalLink, FiRefreshCw } = FiIcons;

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null);
  const [uploadMethod, setUploadMethod] = useState('url');
  const [tempSrc, setTempSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Define all images used across the site
  const siteImages = [
    {
      id: 'hero-main',
      key: 'hero.image',
      title: 'Hero Section - Main Image',
      page: 'Home',
      defaultSrc: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Main hero image on homepage'
    },
    {
      id: 'about-hero',
      key: 'about.hero.image',
      title: 'About Page - Coach Photo',
      page: 'About',
      defaultSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Coach Julian Beard professional photo'
    },
    {
      id: 'programs-bg',
      key: 'programs.hero.image',
      title: 'Programs Page - Background',
      page: 'Programs',
      defaultSrc: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Background image for programs section'
    },
    {
      id: 'testimonial-1',
      key: 'testimonials.image1',
      title: 'Testimonial - Marcus Johnson',
      page: 'Home',
      defaultSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      description: 'Player testimonial photo'
    },
    {
      id: 'testimonial-2',
      key: 'testimonials.image2',
      title: 'Testimonial - Sarah Williams',
      page: 'Home',
      defaultSrc: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      description: 'Player testimonial photo'
    },
    {
      id: 'testimonial-3',
      key: 'testimonials.image3',
      title: 'Testimonial - David Chen',
      page: 'Home',
      defaultSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      description: 'Player testimonial photo'
    },
    {
      id: 'training-1',
      key: 'gallery.training1',
      title: 'Training Session 1',
      page: 'Gallery',
      defaultSrc: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Basketball training session'
    },
    {
      id: 'training-2',
      key: 'gallery.training2',
      title: 'Training Session 2',
      page: 'Gallery',
      defaultSrc: 'https://images.unsplash.com/photo-1577212017184-7d6ca4cf8b2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Team training session'
    },
    {
      id: 'court-action',
      key: 'gallery.court',
      title: 'Court Action Shot',
      page: 'Gallery',
      defaultSrc: 'https://images.unsplash.com/photo-1559692048-79a3f837883d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Basketball court action'
    }
  ];

  useEffect(() => {
    loadAllImages();
  }, []);

  const loadAllImages = async () => {
    setIsLoading(true);
    const loadedImages = await Promise.all(
      siteImages.map(async (imageConfig) => {
        try {
          const savedSrc = await contentManager.getContentValue(imageConfig.key);
          return {
            ...imageConfig,
            currentSrc: savedSrc || imageConfig.defaultSrc,
            isCustom: !!savedSrc
          };
        } catch (error) {
          console.error(`Error loading image ${imageConfig.key}:`, error);
          return {
            ...imageConfig,
            currentSrc: imageConfig.defaultSrc,
            isCustom: false
          };
        }
      })
    );
    setImages(loadedImages);
    setIsLoading(false);
  };

  const handleEditImage = (image) => {
    setEditingImage(image);
    setTempSrc(image.currentSrc);
    setUploadMethod('url');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempSrc(event.target.result);
        setIsLoading(false);
      };
      reader.onerror = () => {
        alert('Error reading file');
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
      setIsLoading(false);
    }
  };

  const handleSaveImage = async () => {
    if (!editingImage) return;

    setIsLoading(true);
    try {
      await contentManager.updateContent(editingImage.key, tempSrc);
      
      // Update local state
      setImages(images.map(img => 
        img.id === editingImage.id 
          ? { ...img, currentSrc: tempSrc, isCustom: true }
          : img
      ));
      
      setEditingImage(null);
      showNotification('Image updated successfully!', 'success');
    } catch (error) {
      console.error('Error saving image:', error);
      showNotification('Failed to save image', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetImage = async (image) => {
    if (!window.confirm('Reset this image to default?')) return;

    setIsLoading(true);
    try {
      await contentManager.updateContent(image.key, image.defaultSrc);
      
      setImages(images.map(img => 
        img.id === image.id 
          ? { ...img, currentSrc: image.defaultSrc, isCustom: false }
          : img
      ));
      
      showNotification('Image reset to default', 'success');
    } catch (error) {
      console.error('Error resetting image:', error);
      showNotification('Failed to reset image', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showNotification('URL copied to clipboard!', 'success');
  };

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-6 px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce ${
      type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
    }`;
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          ${type === 'success' 
            ? '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>'
            : '<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>'
          }
        </svg>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  const filteredImages = images.filter(image =>
    image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">Image Gallery Manager</h1>
              <p className="text-gray-600 mt-2">Manage all images used across your website</p>
            </div>
            <button
              onClick={loadAllImages}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              <SafeIcon icon={FiRefreshCw} className={isLoading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <SafeIcon icon={FiImage} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiImage} className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{images.length}</div>
                <div className="text-sm text-gray-600">Total Images</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiEdit} className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {images.filter(img => img.isCustom).length}
                </div>
                <div className="text-sm text-gray-600">Custom Images</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiExternalLink} className="text-purple-600 text-xl" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {images.filter(img => !img.isCustom).length}
                </div>
                <div className="text-sm text-gray-600">Default Images</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Images Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredImages.map((image) => (
            <div key={image.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={image.currentSrc}
                  alt={image.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                  }}
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  {image.isCustom && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Custom
                    </span>
                  )}
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {image.page}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{image.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{image.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Key: {image.key}</span>
                  <button
                    onClick={() => copyToClipboard(image.currentSrc)}
                    className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
                  >
                    <SafeIcon icon={FiCopy} className="text-xs" />
                    <span>Copy URL</span>
                  </button>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditImage(image)}
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiEdit} className="text-sm" />
                    <span>Edit</span>
                  </button>
                  
                  {image.isCustom && (
                    <button
                      onClick={() => handleResetImage(image)}
                      className="bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center justify-center"
                    >
                      <SafeIcon icon={FiRefreshCw} className="text-sm" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Edit Modal */}
        {editingImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Edit: {editingImage.title}
                  </h3>
                  <button
                    onClick={() => setEditingImage(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <SafeIcon icon={FiX} className="text-xl" />
                  </button>
                </div>

                {/* Current Image Preview */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Image</label>
                  <img
                    src={tempSrc}
                    alt={editingImage.title}
                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                  />
                </div>

                {/* Upload Method Toggle */}
                <div className="mb-6">
                  <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setUploadMethod('url')}
                      className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                        uploadMethod === 'url'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <SafeIcon icon={FiLink} className="inline mr-1" />
                      Image URL
                    </button>
                    <button
                      onClick={() => setUploadMethod('file')}
                      className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                        uploadMethod === 'file'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <SafeIcon icon={FiUpload} className="inline mr-1" />
                      Upload File
                    </button>
                  </div>
                </div>

                {/* URL Input */}
                {uploadMethod === 'url' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                      type="url"
                      value={tempSrc}
                      onChange={(e) => setTempSrc(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="https://example.com/image.jpg"
                      disabled={isLoading}
                    />
                  </div>
                )}

                {/* File Upload */}
                {uploadMethod === 'file' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <SafeIcon icon={FiUpload} className="w-8 h-8 mb-4 text-gray-500" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span>
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={isLoading}
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quick Options</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setTempSrc('https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')}
                      className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200"
                    >
                      Basketball Player
                    </button>
                    <button
                      onClick={() => setTempSrc('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')}
                      className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200"
                    >
                      Court Action
                    </button>
                    <button
                      onClick={() => setTempSrc('https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')}
                      className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200"
                    >
                      Training Session
                    </button>
                    <button
                      onClick={() => setTempSrc(editingImage.defaultSrc)}
                      className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded hover:bg-gray-200"
                    >
                      Reset to Default
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setEditingImage(null)}
                    disabled={isLoading}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveImage}
                    disabled={isLoading}
                    className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
                  >
                    <SafeIcon icon={FiSave} className="text-sm" />
                    <span>{isLoading ? 'Saving...' : 'Save Image'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* No Results */}
        {filteredImages.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <SafeIcon icon={FiImage} className="text-gray-400 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;