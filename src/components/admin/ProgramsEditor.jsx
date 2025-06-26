import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiTarget, FiClock, FiUsers, FiZap, FiShield, FiEye } = FiIcons;

const ProgramsEditor = () => {
  const [programs, setPrograms] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [newProgram, setNewProgram] = useState({
    title: '',
    category: 'fundamentals',
    description: '',
    duration: '',
    level: 'All Levels',
    features: [''],
    icon: 'FiTarget'
  });

  const categories = [
    { value: 'fundamentals', label: 'Fundamentals', icon: FiTarget },
    { value: 'offense', label: 'Offensive', icon: FiZap },
    { value: 'defense', label: 'Defensive', icon: FiShield },
    { value: 'mental', label: 'Mental Game', icon: FiEye },
    { value: 'conditioning', label: 'Conditioning', icon: FiClock }
  ];

  const levels = [
    'All Levels',
    'Beginner',
    'Intermediate', 
    'Advanced',
    'Beginner to Advanced',
    'Intermediate to Advanced'
  ];

  const iconOptions = [
    { value: 'FiTarget', label: 'Target', icon: FiTarget },
    { value: 'FiZap', label: 'Lightning', icon: FiZap },
    { value: 'FiShield', label: 'Shield', icon: FiShield },
    { value: 'FiEye', label: 'Eye', icon: FiEye },
    { value: 'FiUsers', label: 'Users', icon: FiUsers },
    { value: 'FiClock', label: 'Clock', icon: FiClock }
  ];

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = () => {
    const savedPrograms = localStorage.getItem('skillModules');
    if (savedPrograms) {
      setPrograms(JSON.parse(savedPrograms));
    } else {
      // Initialize with default programs
      const defaultPrograms = [
        {
          id: 1,
          title: 'Ball Handling Mastery',
          category: 'fundamentals',
          description: 'Master dribbling techniques, hand-eye coordination, and ball control under pressure.',
          duration: '45 min',
          level: 'Beginner to Advanced',
          icon: 'FiTarget',
          features: [
            'Two-ball dribbling combinations',
            'Stationary and moving drills',
            'Hand-eye coordination exercises',
            'Pressure situation training'
          ]
        },
        {
          id: 2,
          title: 'Shooting Mechanics & Accuracy',
          category: 'offense',
          description: 'Perfect your shooting form, consistency, and accuracy from all positions.',
          duration: '60 min',
          level: 'All Levels',
          icon: 'FiTarget',
          features: [
            'Form shooting progression',
            'Catch and shoot techniques',
            'Off-the-dribble shooting',
            'Range extension drills'
          ]
        },
        {
          id: 3,
          title: 'Finishing at the Rim',
          category: 'offense',
          description: 'Euro steps, floaters, contact layups, and advanced finishing techniques.',
          duration: '45 min',
          level: 'Intermediate to Advanced',
          icon: 'FiZap',
          features: [
            'Euro step mastery',
            'Floater development',
            'Contact finishing',
            'Reverse layup techniques'
          ]
        },
        {
          id: 4,
          title: 'Court Vision & Passing IQ',
          category: 'fundamentals',
          description: 'Develop basketball IQ, reading defenses, and making smart passes.',
          duration: '50 min',
          level: 'All Levels',
          icon: 'FiEye',
          features: [
            'Reading defensive schemes',
            'Passing fundamentals',
            'Court awareness drills',
            'Decision-making training'
          ]
        },
        {
          id: 5,
          title: 'Defensive Footwork & Positioning',
          category: 'defense',
          description: 'Master defensive stance, lateral movement, and positioning fundamentals.',
          duration: '45 min',
          level: 'All Levels',
          icon: 'FiShield',
          features: [
            'Defensive stance training',
            'Lateral movement drills',
            'Help defense positioning',
            'Close-out techniques'
          ]
        }
      ];
      setPrograms(defaultPrograms);
      localStorage.setItem('skillModules', JSON.stringify(defaultPrograms));
    }
  };

  const savePrograms = (updatedPrograms) => {
    setPrograms(updatedPrograms);
    localStorage.setItem('skillModules', JSON.stringify(updatedPrograms));
  };

  const handleAddProgram = () => {
    if (!newProgram.title || !newProgram.description) {
      alert('Please fill in required fields');
      return;
    }

    const program = {
      ...newProgram,
      id: Date.now(),
      features: newProgram.features.filter(feature => feature.trim() !== '')
    };

    const updatedPrograms = [...programs, program];
    savePrograms(updatedPrograms);
    resetForm();
  };

  const handleEditProgram = (program) => {
    setEditingProgram(program);
    setNewProgram(program);
    setShowAddForm(true);
  };

  const handleUpdateProgram = () => {
    const updatedPrograms = programs.map(program =>
      program.id === editingProgram.id
        ? { ...newProgram, features: newProgram.features.filter(feature => feature.trim() !== '') }
        : program
    );
    savePrograms(updatedPrograms);
    resetForm();
  };

  const handleDeleteProgram = (id) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      const updatedPrograms = programs.filter(program => program.id !== id);
      savePrograms(updatedPrograms);
    }
  };

  const resetForm = () => {
    setNewProgram({
      title: '',
      category: 'fundamentals',
      description: '',
      duration: '',
      level: 'All Levels',
      features: [''],
      icon: 'FiTarget'
    });
    setEditingProgram(null);
    setShowAddForm(false);
  };

  const addFeature = () => {
    setNewProgram({ ...newProgram, features: [...newProgram.features, ''] });
  };

  const updateFeature = (index, value) => {
    const updatedFeatures = [...newProgram.features];
    updatedFeatures[index] = value;
    setNewProgram({ ...newProgram, features: updatedFeatures });
  };

  const removeFeature = (index) => {
    const updatedFeatures = newProgram.features.filter((_, i) => i !== index);
    setNewProgram({ ...newProgram, features: updatedFeatures });
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      FiTarget, FiZap, FiShield, FiEye, FiUsers, FiClock
    };
    return iconMap[iconName] || FiTarget;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Programs & Modules Editor</h2>
          <p className="text-gray-600">Manage training programs and skill modules</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} />
          <span>Add Program</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {editingProgram ? 'Edit Program' : 'Add New Program'}
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
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newProgram.title}
                onChange={(e) => setNewProgram({ ...newProgram, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter program title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={newProgram.duration}
                onChange={(e) => setNewProgram({ ...newProgram, duration: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., 45 min"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={newProgram.category}
                onChange={(e) => setNewProgram({ ...newProgram, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
              <select
                value={newProgram.level}
                onChange={(e) => setNewProgram({ ...newProgram, level: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                {levels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
              <select
                value={newProgram.icon}
                onChange={(e) => setNewProgram({ ...newProgram, icon: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                {iconOptions.map(icon => (
                  <option key={icon.value} value={icon.value}>{icon.label}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={newProgram.description}
                onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter program description"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
              <div className="space-y-2">
                {newProgram.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 w-8">{index + 1}.</span>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter feature"
                    />
                    {newProgram.features.length > 1 && (
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
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={editingProgram ? handleUpdateProgram : handleAddProgram}
              className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiSave} />
              <span>{editingProgram ? 'Update' : 'Save'} Program</span>
            </button>
          </div>
        </div>
      )}

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div key={program.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 flex-1">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={getIconComponent(program.icon)} className="text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{program.title}</h3>
                  <div className="text-xs text-primary-600 font-medium uppercase tracking-wide">
                    {program.category}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleEditProgram(program)}
                  className="text-gray-500 hover:text-primary-600"
                >
                  <SafeIcon icon={FiEdit} className="text-sm" />
                </button>
                <button
                  onClick={() => handleDeleteProgram(program.id)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <SafeIcon icon={FiTrash2} className="text-sm" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{program.description}</p>

            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiClock} />
                <span>{program.duration}</span>
              </div>
              <span>{program.level}</span>
            </div>

            <div className="space-y-1">
              <h4 className="font-medium text-gray-900 text-sm">Features:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                {program.features.slice(0, 3).map((feature, i) => (
                  <li key={i}>• {feature}</li>
                ))}
                {program.features.length > 3 && (
                  <li className="text-gray-500">+ {program.features.length - 3} more features</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {programs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <SafeIcon icon={FiTarget} className="text-gray-400 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No programs yet</h3>
          <p className="text-gray-600 mb-4">Start building your program library</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Add Your First Program
          </button>
        </div>
      )}
    </div>
  );
};

export default ProgramsEditor;