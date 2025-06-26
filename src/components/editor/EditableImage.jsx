import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import contentManager from '../../lib/contentManager';

const { FiImage, FiSave, FiX, FiUpload, FiLink } = FiIcons;

const EditableImage = ({ src, alt, contentKey, editMode, className = '', ...props }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [tempSrc, setTempSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState('url');

  useEffect(() => {
    if (contentKey) {
      loadImage();
    }
  }, [contentKey]);

  const loadImage = async () => {
    try {
      const savedSrc = await contentManager.getContentValue(contentKey);
      if (savedSrc) {
        setCurrentSrc(savedSrc);
        setTempSrc(savedSrc);
      } else {
        setCurrentSrc(src);
        setTempSrc(src);
      }
    } catch (error) {
      console.error('Error loading image:', error);
      setCurrentSrc(src);
      setTempSrc(src);
    }
  };

  const handleClick = (e) => {
    if (editMode && !isEditing && contentKey) {
      e.preventDefault();
      e.stopPropagation();
      setIsEditing(true);
      setTempSrc(currentSrc);
    }
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
      reader.onload = async (event) => {
        const base64String = event.target.result;
        setTempSrc(base64String);
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

  const handleSave = async () => {
    if (!contentKey) return;

    setIsLoading(true);
    try {
      await contentManager.updateContent(contentKey, tempSrc);
      setCurrentSrc(tempSrc);
      setIsEditing(false);
      showSaveNotification(true);
    } catch (error) {
      console.error('Error saving image:', error);
      showSaveNotification(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTempSrc(currentSrc);
    setIsEditing(false);
    setUploadMethod('url');
  };

  const showSaveNotification = (success) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-6 px-4 py-2 rounded-lg shadow-lg z-50 animate-bounce ${
      success ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
    }`;
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          ${success 
            ? '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>'
            : '<path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>'
          }
        </svg>
        <span>${success ? 'Image Saved!' : 'Save Failed'}</span>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  if (isEditing) {
    return (
      <div className="relative">
        <img
          src={tempSrc || currentSrc}
          alt={alt}
          className={`${className} border-4 border-green-500 rounded-lg`}
          {...props}
        />
        
        {/* Edit Controls - Positioned better for visibility */}
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl border-2 border-green-500 p-6 z-[9999] min-w-[400px] max-w-[90vw]">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Edit Image</h3>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <SafeIcon icon={FiX} className="text-xl" />
              </button>
            </div>

            {/* Current Image Preview */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
              <img
                src={tempSrc}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg border border-gray-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
              />
            </div>

            {/* Upload Method Toggle */}
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

            {/* URL Input */}
            {uploadMethod === 'url' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={tempSrc}
                  onChange={(e) => setTempSrc(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="https://example.com/image.jpg"
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use Unsplash, your own hosting, or any direct image URL
                </p>
              </div>
            )}

            {/* File Upload */}
            {uploadMethod === 'file' && (
              <div>
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
            <div className="border-t pt-3">
              <p className="text-xs text-gray-500 mb-2">Quick Options:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setTempSrc('https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                >
                  Basketball Player
                </button>
                <button
                  onClick={() => setTempSrc('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                >
                  Court Action
                </button>
                <button
                  onClick={() => setTempSrc('https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200"
                >
                  Training Session
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2 pt-4">
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center space-x-1 bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 disabled:opacity-50 flex-1 justify-center"
              >
                <SafeIcon icon={FiSave} className="text-sm" />
                <span>{isLoading ? 'Saving...' : 'Save Image'}</span>
              </button>
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="flex items-center space-x-1 bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 disabled:opacity-50"
              >
                <SafeIcon icon={FiX} className="text-sm" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
          onClick={handleCancel}
        ></div>
      </div>
    );
  }

  return (
    <div
      className={`${editMode && contentKey ? 'relative group cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <img
        src={currentSrc || src}
        alt={alt}
        className={className}
        {...props}
      />
      
      {/* Edit Indicator */}
      {editMode && contentKey && (
        <div className="absolute inset-0 bg-blue-50 bg-opacity-0 group-hover:bg-opacity-90 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-lg">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg">
            <SafeIcon icon={FiImage} />
            <span className="text-sm font-medium">Click to change image</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableImage;