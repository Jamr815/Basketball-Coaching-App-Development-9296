import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiImage, FiUpload, FiTrash2, FiEdit, FiSave, FiX, FiCopy, FiExternalLink } = FiIcons;

const PhotoManager = () => {
  const [photos, setPhotos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [newPhoto, setNewPhoto] = useState({
    name: '',
    url: '',
    category: 'general',
    description: '',
    usedIn: []
  });

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'hero', label: 'Hero Section' },
    { value: 'about', label: 'About Page' },
    { value: 'testimonials', label: 'Testimonials' },
    { value: 'programs', label: 'Programs' },
    { value: 'drills', label: 'Drills' }
  ];

  const stockPhotos = [
    {
      name: 'Basketball Player Dribbling',
      url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'general'
    },
    {
      name: 'Basketball Court Action',
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      category: 'general'
    },
    {
      name: 'Basketball Training',
      url: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'programs'
    },
    {
      name: 'Player Portrait 1',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      category: 'testimonials'
    },
    {
      name: 'Player Portrait 2',
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      category: 'testimonials'
    },
    {
      name: 'Player Portrait 3',
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      category: 'testimonials'
    },
    {
      name: 'Basketball Hoop',
      url: 'https://images.unsplash.com/photo-1559692048-79a3f837883d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'general'
    },
    {
      name: 'Team Training',
      url: 'https://images.unsplash.com/photo-1577212017184-7d6ca4cf8b2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'programs'
    }
  ];

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = () => {
    const savedPhotos = localStorage.getItem('photoLibrary');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    } else {
      // Initialize with stock photos
      const initialPhotos = stockPhotos.map((photo, index) => ({
        id: index + 1,
        ...photo,
        description: `Stock photo: ${photo.name}`,
        usedIn: [],
        dateAdded: new Date().toISOString()
      }));
      setPhotos(initialPhotos);
      localStorage.setItem('photoLibrary', JSON.stringify(initialPhotos));
    }
  };

  const savePhotos = (updatedPhotos) => {
    setPhotos(updatedPhotos);
    localStorage.setItem('photoLibrary', JSON.stringify(updatedPhotos));
  };

  const handleAddPhoto = () => {
    if (!newPhoto.name || !newPhoto.url) {
      alert('Please fill in required fields');
      return;
    }

    const photo = {
      ...newPhoto,
      id: Date.now(),
      dateAdded: new Date().toISOString()
    };

    const updatedPhotos = [...photos, photo];
    savePhotos(updatedPhotos);
    resetForm();
  };

  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo);
    setNewPhoto(photo);
    setShowAddForm(true);
  };

  const handleUpdatePhoto = () => {
    const updatedPhotos = photos.map(photo =>
      photo.id === editingPhoto.id ? newPhoto : photo
    );
    savePhotos(updatedPhotos);
    resetForm();
  };

  const handleDeletePhoto = (id) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      const updatedPhotos = photos.filter(photo => photo.id !== id);
      savePhotos(updatedPhotos);
    }
  };

  const resetForm = () => {
    setNewPhoto({
      name: '',
      url: '',
      category: 'general',
      description: '',
      usedIn: []
    });
    setEditingPhoto(null);
    setShowAddForm(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('URL copied to clipboard!');
  };

  const addStockPhoto = (stockPhoto) => {
    const photo = {
      ...stockPhoto,
      id: Date.now(),
      description: `Stock photo: ${stockPhoto.name}`,
      usedIn: [],
      dateAdded: new Date().toISOString()
    };

    const updatedPhotos = [...photos, photo];
    savePhotos(updatedPhotos);
  };

  const filteredPhotos = photos.filter(photo => 
    newPhoto.category === 'all' || photo.category === newPhoto.category
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Photo Manager</h2>
          <p className="text-gray-600">Manage and organize all site images</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiUpload} />
          <span>Add Photo</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setNewPhoto({ ...newPhoto, category: 'all' })}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            newPhoto.category === 'all' || !newPhoto.category
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Photos
        </button>
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setNewPhoto({ ...newPhoto, category: cat.value })}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              newPhoto.category === cat.value
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {editingPhoto ? 'Edit Photo' : 'Add New Photo'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <SafeIcon icon={FiX} className="text-xl" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photo Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newPhoto.name}
                onChange={(e) => setNewPhoto({ ...newPhoto, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter photo name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={newPhoto.category}
                onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={newPhoto.url}
                onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Use Unsplash, your own hosting, or any direct image URL
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newPhoto.description}
                onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter photo description"
              />
            </div>

            {/* Preview */}
            {newPhoto.url && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Preview</label>
                <img
                  src={newPhoto.url}
                  alt="Preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg border border-gray-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={editingPhoto ? handleUpdatePhoto : handleAddPhoto}
              className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiSave} />
              <span>{editingPhoto ? 'Update' : 'Save'} Photo</span>
            </button>
          </div>
        </div>
      )}

      {/* Stock Photos Section */}
      {!editingPhoto && (
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Add Stock Photos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {stockPhotos.slice(0, 6).map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => addStockPhoto(photo)}
                    className="bg-white text-gray-900 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
                  >
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => (
          <div key={photo.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={photo.url}
                alt={photo.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                }}
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => handleEditPhoto(photo)}
                  className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
                >
                  <SafeIcon icon={FiEdit} className="text-gray-700 text-sm" />
                </button>
                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
                >
                  <SafeIcon icon={FiTrash2} className="text-red-600 text-sm" />
                </button>
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2">{photo.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{photo.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full capitalize">
                  {photo.category}
                </span>
                <button
                  onClick={() => copyToClipboard(photo.url)}
                  className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
                >
                  <SafeIcon icon={FiCopy} className="text-xs" />
                  <span>Copy URL</span>
                </button>
              </div>

              {photo.usedIn && photo.usedIn.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500">Used in:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {photo.usedIn.map((location, index) => (
                      <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredPhotos.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <SafeIcon icon={FiImage} className="text-gray-400 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No photos in this category</h3>
          <p className="text-gray-600 mb-4">Add some photos to get started</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Add Your First Photo
          </button>
        </div>
      )}
    </div>
  );
};

export default PhotoManager;