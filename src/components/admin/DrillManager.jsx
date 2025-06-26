import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlus, FiEdit, FiTrash2, FiSave, FiX, FiTarget, FiUpload, FiVideo, FiImage, FiLink, FiPlay, FiCopy } = FiIcons;

const DrillManager = () => {
  const [drills, setDrills] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDrill, setEditingDrill] = useState(null);
  const [newDrill, setNewDrill] = useState({
    title: '',
    description: '',
    category: 'shooting',
    level: 'Beginner',
    duration: '',
    equipment: '',
    instructions: [''],
    tips: '',
    featured: false,
    thumbnail: '',
    video: '',
    mediaType: 'image' // 'image' or 'video'
  });

  const categories = [
    { value: 'shooting', label: 'Shooting' },
    { value: 'ballhandling', label: 'Ball Handling' },
    { value: 'defense', label: 'Defense' },
    { value: 'conditioning', label: 'Conditioning' },
    { value: 'fundamentals', label: 'Fundamentals' }
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    loadDrills();
  }, []);

  const loadDrills = () => {
    const savedDrills = localStorage.getItem('basketballDrills');
    if (savedDrills) {
      setDrills(JSON.parse(savedDrills));
    } else {
      // Initialize with sample drills
      const sampleDrills = [
        {
          id: 1,
          title: 'Form Shooting Progression',
          category: 'shooting',
          level: 'Beginner',
          duration: '15 min',
          equipment: 'Basketball, Hoop',
          description: 'Master proper shooting form with close-range repetitions and gradual distance increase.',
          instructions: [
            'Start 3 feet from the basket',
            'Focus on proper hand placement',
            'Use consistent follow-through',
            'Make 10 shots before moving back'
          ],
          tips: 'Keep your elbow under the ball and follow through with a snap of the wrist.',
          featured: true,
          thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          video: '',
          mediaType: 'image'
        },
        {
          id: 2,
          title: 'Two-Ball Dribbling',
          category: 'ballhandling',
          level: 'Intermediate',
          duration: '20 min',
          equipment: '2 Basketballs',
          description: 'Improve hand coordination and ball control using two basketballs simultaneously.',
          instructions: [
            'Start with simultaneous dribbling',
            'Progress to alternating patterns',
            'Add movement while dribbling',
            'Practice for 30 seconds, rest 15 seconds'
          ],
          tips: 'Keep your head up and maintain control of both balls throughout the drill.',
          featured: false,
          thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          video: '',
          mediaType: 'image'
        },
        {
          id: 3,
          title: 'Defensive Slides',
          category: 'defense',
          level: 'Beginner',
          duration: '10 min',
          equipment: 'None',
          description: 'Build defensive footwork and lateral movement fundamentals.',
          instructions: [
            'Start in defensive stance',
            'Slide laterally without crossing feet',
            'Maintain low center of gravity',
            'Keep hands active and ready'
          ],
          tips: 'Stay low and push off with the outside foot when changing direction.',
          featured: true,
          thumbnail: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
          video: '',
          mediaType: 'image'
        }
      ];
      setDrills(sampleDrills);
      localStorage.setItem('basketballDrills', JSON.stringify(sampleDrills));
    }
  };

  const saveDrills = (updatedDrills) => {
    setDrills(updatedDrills);
    localStorage.setItem('basketballDrills', JSON.stringify(updatedDrills));
  };

  const handleAddDrill = () => {
    if (!newDrill.title || !newDrill.description) {
      alert('Please fill in required fields');
      return;
    }

    const drill = {
      ...newDrill,
      id: Date.now(),
      instructions: newDrill.instructions.filter(instruction => instruction.trim() !== '')
    };

    const updatedDrills = [...drills, drill];
    saveDrills(updatedDrills);
    resetForm();
  };

  const handleEditDrill = (drill) => {
    setEditingDrill(drill);
    setNewDrill(drill);
    setShowAddForm(true);
  };

  const handleUpdateDrill = () => {
    const updatedDrills = drills.map(drill =>
      drill.id === editingDrill.id
        ? { ...newDrill, instructions: newDrill.instructions.filter(instruction => instruction.trim() !== '') }
        : drill
    );
    saveDrills(updatedDrills);
    resetForm();
  };

  const handleDeleteDrill = (id) => {
    if (window.confirm('Are you sure you want to delete this drill?')) {
      const updatedDrills = drills.filter(drill => drill.id !== id);
      saveDrills(updatedDrills);
    }
  };

  const resetForm = () => {
    setNewDrill({
      title: '',
      description: '',
      category: 'shooting',
      level: 'Beginner',
      duration: '',
      equipment: '',
      instructions: [''],
      tips: '',
      featured: false,
      thumbnail: '',
      video: '',
      mediaType: 'image'
    });
    setEditingDrill(null);
    setShowAddForm(false);
  };

  const addInstruction = () => {
    setNewDrill({ ...newDrill, instructions: [...newDrill.instructions, ''] });
  };

  const updateInstruction = (index, value) => {
    const updatedInstructions = [...newDrill.instructions];
    updatedInstructions[index] = value;
    setNewDrill({ ...newDrill, instructions: updatedInstructions });
  };

  const removeInstruction = (index) => {
    const updatedInstructions = newDrill.instructions.filter((_, i) => i !== index);
    setNewDrill({ ...newDrill, instructions: updatedInstructions });
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'image' && !file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (type === 'video' && !file.type.startsWith('video/')) {
      alert('Please select a video file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB');
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === 'image') {
          setNewDrill({ ...newDrill, thumbnail: event.target.result });
        } else {
          setNewDrill({ ...newDrill, video: event.target.result, mediaType: 'video' });
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('URL copied to clipboard!');
  };

  const stockImages = [
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1577212017184-7d6ca4cf8b2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Basketball Drills Library</h2>
          <p className="text-gray-600">Create and manage basketball training drills with media</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} />
          <span>Add Drill</span>
        </button>
      </div>

      {/* Add/Edit Drill Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {editingDrill ? 'Edit Drill' : 'Add New Drill'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <SafeIcon icon={FiX} className="text-xl" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newDrill.title}
                  onChange={(e) => setNewDrill({ ...newDrill, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter drill title"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newDrill.category}
                    onChange={(e) => setNewDrill({ ...newDrill, category: e.target.value })}
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
                    value={newDrill.level}
                    onChange={(e) => setNewDrill({ ...newDrill, level: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={newDrill.duration}
                    onChange={(e) => setNewDrill({ ...newDrill, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., 15 min"
                  />
                </div>
                <div>
                  <label className="flex items-center mt-8">
                    <input
                      type="checkbox"
                      checked={newDrill.featured}
                      onChange={(e) => setNewDrill({ ...newDrill, featured: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Featured Drill</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Equipment</label>
                <input
                  type="text"
                  value={newDrill.equipment}
                  onChange={(e) => setNewDrill({ ...newDrill, equipment: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Basketball, Cones, Hoop"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newDrill.description}
                  onChange={(e) => setNewDrill({ ...newDrill, description: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter drill description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tips</label>
                <textarea
                  value={newDrill.tips}
                  onChange={(e) => setNewDrill({ ...newDrill, tips: e.target.value })}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter helpful tips for this drill"
                />
              </div>
            </div>

            {/* Right Column - Media & Instructions */}
            <div className="space-y-6">
              {/* Media Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Drill Media</label>
                
                {/* Media Type Toggle */}
                <div className="flex space-x-2 bg-gray-100 rounded-lg p-1 mb-4">
                  <button
                    onClick={() => setNewDrill({ ...newDrill, mediaType: 'image' })}
                    className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      newDrill.mediaType === 'image'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <SafeIcon icon={FiImage} className="inline mr-1" />
                    Image Thumbnail
                  </button>
                  <button
                    onClick={() => setNewDrill({ ...newDrill, mediaType: 'video' })}
                    className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      newDrill.mediaType === 'video'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <SafeIcon icon={FiVideo} className="inline mr-1" />
                    Video Preview
                  </button>
                </div>

                {/* Current Media Preview */}
                {(newDrill.thumbnail || newDrill.video) && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Media</label>
                    {newDrill.mediaType === 'video' && newDrill.video ? (
                      <video
                        src={newDrill.video}
                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                        controls
                      />
                    ) : newDrill.thumbnail ? (
                      <img
                        src={newDrill.thumbnail}
                        alt="Drill thumbnail"
                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                      />
                    ) : null}
                  </div>
                )}

                {/* Media Input Options */}
                {newDrill.mediaType === 'image' ? (
                  <div className="space-y-4">
                    {/* Image URL Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                      <div className="flex space-x-2">
                        <input
                          type="url"
                          value={newDrill.thumbnail}
                          onChange={(e) => setNewDrill({ ...newDrill, thumbnail: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="https://example.com/image.jpg"
                        />
                        <button
                          onClick={() => copyToClipboard(newDrill.thumbnail)}
                          className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          title="Copy URL"
                        >
                          <SafeIcon icon={FiCopy} />
                        </button>
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-3 pb-3">
                            <SafeIcon icon={FiUpload} className="w-6 h-6 mb-2 text-gray-500" />
                            <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'image')}
                          />
                        </label>
                      </div>
                    </div>

                    {/* Quick Stock Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Quick Stock Images</label>
                      <div className="grid grid-cols-4 gap-2">
                        {stockImages.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setNewDrill({ ...newDrill, thumbnail: img })}
                            className="relative group"
                          >
                            <img
                              src={img}
                              alt={`Stock ${index + 1}`}
                              className="w-full h-16 object-cover rounded border hover:border-primary-500"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                              <span className="text-white text-xs">Use</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Video URL Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                      <input
                        type="url"
                        value={newDrill.video}
                        onChange={(e) => setNewDrill({ ...newDrill, video: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="https://youtube.com/embed/... or upload file"
                      />
                    </div>

                    {/* Video Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Upload Video</label>
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-3 pb-3">
                            <SafeIcon icon={FiVideo} className="w-6 h-6 mb-2 text-gray-500" />
                            <p className="text-xs text-gray-500">MP4, MOV up to 10MB</p>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            accept="video/*"
                            onChange={(e) => handleFileUpload(e, 'video')}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                <div className="space-y-2">
                  {newDrill.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 w-8">{index + 1}.</span>
                      <input
                        type="text"
                        value={instruction}
                        onChange={(e) => updateInstruction(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter instruction step"
                      />
                      {newDrill.instructions.length > 1 && (
                        <button
                          onClick={() => removeInstruction(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <SafeIcon icon={FiX} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addInstruction}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    + Add Instruction
                  </button>
                </div>
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
              onClick={editingDrill ? handleUpdateDrill : handleAddDrill}
              className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiSave} />
              <span>{editingDrill ? 'Update' : 'Save'} Drill</span>
            </button>
          </div>
        </div>
      )}

      {/* Drills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drills.map((drill) => (
          <div key={drill.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              {drill.mediaType === 'video' && drill.video ? (
                <div className="relative">
                  <video
                    src={drill.video}
                    className="w-full h-48 object-cover"
                    poster={drill.thumbnail}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <SafeIcon icon={FiPlay} className="text-white text-3xl" />
                  </div>
                </div>
              ) : drill.thumbnail ? (
                <img
                  src={drill.thumbnail}
                  alt={drill.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Basketball+Drill';
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <SafeIcon icon={FiTarget} className="text-white text-4xl" />
                </div>
              )}
              
              <div className="absolute top-2 right-2 flex space-x-1">
                {drill.featured && (
                  <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                )}
                {drill.mediaType === 'video' && (
                  <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Video
                  </span>
                )}
              </div>
              
              <div className="absolute top-2 left-2 flex space-x-1">
                <button
                  onClick={() => handleEditDrill(drill)}
                  className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
                >
                  <SafeIcon icon={FiEdit} className="text-gray-700 text-sm" />
                </button>
                <button
                  onClick={() => handleDeleteDrill(drill.id)}
                  className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all"
                >
                  <SafeIcon icon={FiTrash2} className="text-red-600 text-sm" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 mb-1">{drill.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  drill.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                  drill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {drill.level}
                </span>
              </div>
              
              <div className="text-xs text-primary-600 font-medium uppercase tracking-wide mb-2">
                {drill.category}
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{drill.description}</p>
              
              <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                <span>{drill.duration}</span>
                <span>{drill.equipment}</span>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-medium text-gray-900 text-sm">Instructions:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {drill.instructions.slice(0, 2).map((instruction, i) => (
                    <li key={i}>• {instruction}</li>
                  ))}
                  {drill.instructions.length > 2 && (
                    <li className="text-gray-500">+ {drill.instructions.length - 2} more steps</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {drills.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <SafeIcon icon={FiTarget} className="text-gray-400 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No drills yet</h3>
          <p className="text-gray-600 mb-4">Start building your drill library with media-rich content</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Add Your First Drill
          </button>
        </div>
      )}
    </div>
  );
};

export default DrillManager;