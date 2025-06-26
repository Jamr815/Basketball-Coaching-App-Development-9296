import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiUsers, FiStar } = FiIcons;

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    image: '',
    featured: false
  });

  useEffect(() => {
    // Load testimonials from localStorage
    const savedTestimonials = localStorage.getItem('playerTestimonials');
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    } else {
      // Initialize with sample testimonials
      const sampleTestimonials = [
        {
          id: 1,
          name: 'Marcus Johnson',
          role: 'High School Player',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
          content: 'Coach Beard transformed my shooting mechanics. My field goal percentage improved by 25% in just 3 months.',
          rating: 5,
          featured: true,
          dateAdded: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Sarah Williams',
          role: 'College Recruit',
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
          content: 'The personalized training approach helped me develop court vision I never knew I had. Now I lead my team in assists.',
          rating: 5,
          featured: true,
          dateAdded: new Date().toISOString()
        }
      ];
      setTestimonials(sampleTestimonials);
      localStorage.setItem('playerTestimonials', JSON.stringify(sampleTestimonials));
    }
  }, []);

  const saveTestimonials = (updatedTestimonials) => {
    setTestimonials(updatedTestimonials);
    localStorage.setItem('playerTestimonials', JSON.stringify(updatedTestimonials));
  };

  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.content) {
      alert('Please fill in required fields');
      return;
    }

    const testimonial = {
      ...newTestimonial,
      id: Date.now(),
      dateAdded: new Date().toISOString()
    };

    const updatedTestimonials = [...testimonials, testimonial];
    saveTestimonials(updatedTestimonials);
    resetForm();
  };

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
    setNewTestimonial(testimonial);
    setShowAddForm(true);
  };

  const handleUpdateTestimonial = () => {
    const updatedTestimonials = testimonials.map(testimonial => 
      testimonial.id === editingTestimonial.id ? newTestimonial : testimonial
    );
    saveTestimonials(updatedTestimonials);
    resetForm();
  };

  const handleDeleteTestimonial = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      const updatedTestimonials = testimonials.filter(testimonial => testimonial.id !== id);
      saveTestimonials(updatedTestimonials);
    }
  };

  const resetForm = () => {
    setNewTestimonial({
      name: '',
      role: '',
      content: '',
      rating: 5,
      image: '',
      featured: false
    });
    setEditingTestimonial(null);
    setShowAddForm(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <SafeIcon 
        key={i} 
        icon={FiStar} 
        className={`text-sm ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Testimonial Manager</h2>
          <p className="text-gray-600">Manage player testimonials and reviews</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Add/Edit Testimonial Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
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
                Player Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newTestimonial.name}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter player name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role/Position</label>
              <input
                type="text"
                value={newTestimonial.role}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., High School Player, College Recruit"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <select
                value={newTestimonial.rating}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
              <input
                type="url"
                value={newTestimonial.image}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="https://example.com/photo.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonial Content <span className="text-red-500">*</span>
              </label>
              <textarea
                value={newTestimonial.content}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter the testimonial content..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newTestimonial.featured}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, featured: e.target.checked })}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Mark as Featured Testimonial</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={editingTestimonial ? handleUpdateTestimonial : handleAddTestimonial}
              className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiSave} />
              <span>{editingTestimonial ? 'Update' : 'Save'} Testimonial</span>
            </button>
          </div>
        </div>
      )}

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiUsers} className="text-gray-500" />
                  </div>
                )}
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleEditTestimonial(testimonial)}
                  className="text-gray-500 hover:text-primary-600"
                >
                  <SafeIcon icon={FiEdit} className="text-sm" />
                </button>
                <button
                  onClick={() => handleDeleteTestimonial(testimonial.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <SafeIcon icon={FiTrash2} className="text-sm" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-1 mb-3">
              {renderStars(testimonial.rating)}
              {testimonial.featured && (
                <span className="ml-2 bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>

            <p className="text-gray-700 italic">"{testimonial.content}"</p>

            {testimonial.dateAdded && (
              <div className="mt-3 text-xs text-gray-500">
                Added {new Date(testimonial.dateAdded).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <SafeIcon icon={FiUsers} className="text-gray-400 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No testimonials yet</h3>
          <p className="text-gray-600 mb-4">Start collecting player feedback and testimonials</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Add Your First Testimonial
          </button>
        </div>
      )}
    </div>
  );
};

export default TestimonialManager;