import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCalendar, FiEdit, FiTrash2, FiSave, FiX, FiPlus, FiDollarSign, FiClock } = FiIcons;

const BookingManager = () => {
  const [packages, setPackages] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [newPackage, setNewPackage] = useState({
    id: '',
    name: '',
    duration: '',
    price: '',
    originalPrice: '',
    description: '',
    features: [''],
    popular: false,
    discount: false
  });

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = () => {
    const savedPackages = localStorage.getItem('bookingPackages');
    if (savedPackages) {
      setPackages(JSON.parse(savedPackages));
    } else {
      const defaultPackages = [
        {
          id: 'fundamentals',
          name: 'Fundamentals Package',
          duration: '1 Hour',
          price: 25,
          description: 'Perfect for beginners focusing on basic skills',
          features: [
            'Ball Handling Basics',
            'Shooting Form',
            'Defensive Stance',
            'Court Awareness'
          ],
          popular: false
        },
        {
          id: 'standard',
          name: 'Standard Training',
          duration: '1.5 Hours',
          price: 30,
          description: 'Comprehensive training for skill development',
          features: [
            'Advanced Techniques',
            'Game Situations',
            'Skill Combinations',
            'Performance Analysis'
          ],
          popular: true
        },
        {
          id: 'elite',
          name: 'Elite Package',
          duration: '1.5 Hours',
          price: 25,
          originalPrice: 30,
          description: 'Discounted premium training package',
          features: [
            'All 20 Skill Modules',
            'Personalized Program',
            'Video Analysis',
            'Progress Tracking'
          ],
          popular: false,
          discount: true
        }
      ];
      setPackages(defaultPackages);
      localStorage.setItem('bookingPackages', JSON.stringify(defaultPackages));
    }
  };

  const savePackages = (updatedPackages) => {
    setPackages(updatedPackages);
    localStorage.setItem('bookingPackages', JSON.stringify(updatedPackages));
  };

  const handleAddPackage = () => {
    if (!newPackage.name || !newPackage.price) {
      alert('Please fill in required fields');
      return;
    }

    const packageToAdd = {
      ...newPackage,
      id: newPackage.id || newPackage.name.toLowerCase().replace(/\s+/g, '-'),
      price: parseFloat(newPackage.price),
      originalPrice: newPackage.originalPrice ? parseFloat(newPackage.originalPrice) : null,
      features: newPackage.features.filter(f => f.trim() !== '')
    };

    const updatedPackages = [...packages, packageToAdd];
    savePackages(updatedPackages);
    resetForm();
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setNewPackage({
      ...pkg,
      price: pkg.price.toString(),
      originalPrice: pkg.originalPrice ? pkg.originalPrice.toString() : ''
    });
    setShowAddForm(true);
  };

  const handleUpdatePackage = () => {
    const updatedPackages = packages.map(pkg =>
      pkg.id === editingPackage.id
        ? {
            ...newPackage,
            price: parseFloat(newPackage.price),
            originalPrice: newPackage.originalPrice ? parseFloat(newPackage.originalPrice) : null,
            features: newPackage.features.filter(f => f.trim() !== '')
          }
        : pkg
    );
    savePackages(updatedPackages);
    resetForm();
  };

  const handleDeletePackage = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      const updatedPackages = packages.filter(pkg => pkg.id !== id);
      savePackages(updatedPackages);
    }
  };

  const resetForm = () => {
    setNewPackage({
      id: '',
      name: '',
      duration: '',
      price: '',
      originalPrice: '',
      description: '',
      features: [''],
      popular: false,
      discount: false
    });
    setEditingPackage(null);
    setShowAddForm(false);
  };

  const addFeature = () => {
    setNewPackage({ ...newPackage, features: [...newPackage.features, ''] });
  };

  const updateFeature = (index, value) => {
    const updatedFeatures = [...newPackage.features];
    updatedFeatures[index] = value;
    setNewPackage({ ...newPackage, features: updatedFeatures });
  };

  const removeFeature = (index) => {
    const updatedFeatures = newPackage.features.filter((_, i) => i !== index);
    setNewPackage({ ...newPackage, features: updatedFeatures });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Training Packages Manager</h2>
          <p className="text-gray-600">Manage training packages and pricing for the booking page</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} />
          <span>Add Package</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {editingPackage ? 'Edit Package' : 'Add New Package'}
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
                Package Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newPackage.name}
                onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter package name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={newPackage.duration}
                onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., 1 Hour, 1.5 Hours"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={newPackage.price}
                onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="25"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (optional)</label>
              <input
                type="number"
                value={newPackage.originalPrice}
                onChange={(e) => setNewPackage({ ...newPackage, originalPrice: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="30"
                step="0.01"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newPackage.description}
                onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter package description"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              <div className="space-y-2">
                {newPackage.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 w-8">{index + 1}.</span>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter feature"
                    />
                    {newPackage.features.length > 1 && (
                      <button
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <SafeIcon icon={FiX} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addFeature}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  + Add Feature
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newPackage.popular}
                    onChange={(e) => setNewPackage({ ...newPackage, popular: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Mark as Popular</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newPackage.discount}
                    onChange={(e) => setNewPackage({ ...newPackage, discount: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Show as Discounted</span>
                </label>
              </div>
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
              onClick={editingPackage ? handleUpdatePackage : handleAddPackage}
              className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiSave} />
              <span>{editingPackage ? 'Update' : 'Save'} Package</span>
            </button>
          </div>
        </div>
      )}

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                  {pkg.popular && (
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                  {pkg.discount && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Discount
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleEditPackage(pkg)}
                  className="text-gray-500 hover:text-primary-600"
                >
                  <SafeIcon icon={FiEdit} className="text-sm" />
                </button>
                <button
                  onClick={() => handleDeletePackage(pkg.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <SafeIcon icon={FiTrash2} className="text-sm" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiClock} />
                <span>{pkg.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiDollarSign} />
                <span className="font-bold text-gray-900">${pkg.price}</span>
                {pkg.originalPrice && (
                  <span className="line-through text-gray-400">${pkg.originalPrice}</span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-medium text-gray-900 text-sm">Features:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {pkg.features.slice(0, 3).map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
                {pkg.features.length > 3 && (
                  <li className="text-gray-500">+ {pkg.features.length - 3} more features</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {packages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <SafeIcon icon={FiCalendar} className="text-gray-400 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first training package</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Add Your First Package
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingManager;