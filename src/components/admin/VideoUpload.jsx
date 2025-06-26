import React, { useState, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUpload, FiVideo, FiTrash2, FiEdit, FiSave, FiX, FiPlay, FiPlus } = FiIcons;

const VideoUpload = () => {
  const [videos, setVideos] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    category: 'shooting',
    level: 'beginner',
    duration: '',
    videoUrl: '',
    thumbnail: '',
    tags: []
  });

  const categories = [
    { value: 'shooting', label: 'Shooting' },
    { value: 'ballhandling', label: 'Ball Handling' },
    { value: 'defense', label: 'Defense' },
    { value: 'conditioning', label: 'Conditioning' },
    { value: 'fundamentals', label: 'Fundamentals' }
  ];

  const levels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  useEffect(() => {
    // Load videos from localStorage
    const savedVideos = localStorage.getItem('trainingVideos');
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    } else {
      // Initialize with sample videos
      const sampleVideos = [
        {
          id: 1,
          title: 'Perfect Shooting Form',
          description: 'Master the fundamentals of proper shooting technique',
          category: 'shooting',
          level: 'beginner',
          duration: '12:30',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=300',
          tags: ['form', 'technique', 'fundamentals'],
          uploadDate: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Advanced Ball Handling Drills',
          description: 'Take your dribbling to the next level with these advanced techniques',
          category: 'ballhandling',
          level: 'advanced',
          duration: '18:45',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300',
          tags: ['dribbling', 'advanced', 'drills'],
          uploadDate: new Date().toISOString()
        }
      ];
      setVideos(sampleVideos);
      localStorage.setItem('trainingVideos', JSON.stringify(sampleVideos));
    }
  }, []);

  const saveVideos = (updatedVideos) => {
    setVideos(updatedVideos);
    localStorage.setItem('trainingVideos', JSON.stringify(updatedVideos));
  };

  const handleAddVideo = () => {
    if (!newVideo.title || !newVideo.videoUrl) {
      alert('Please fill in required fields');
      return;
    }

    const video = {
      ...newVideo,
      id: Date.now(),
      uploadDate: new Date().toISOString(),
      tags: newVideo.tags.filter(tag => tag.trim() !== '')
    };

    const updatedVideos = [...videos, video];
    saveVideos(updatedVideos);
    setNewVideo({
      title: '',
      description: '',
      category: 'shooting',
      level: 'beginner',
      duration: '',
      videoUrl: '',
      thumbnail: '',
      tags: []
    });
    setShowAddForm(false);
  };

  const handleEditVideo = (video) => {
    setEditingVideo(video);
    setNewVideo(video);
    setShowAddForm(true);
  };

  const handleUpdateVideo = () => {
    const updatedVideos = videos.map(video => 
      video.id === editingVideo.id ? { ...newVideo, tags: newVideo.tags.filter(tag => tag.trim() !== '') } : video
    );
    saveVideos(updatedVideos);
    setEditingVideo(null);
    setNewVideo({
      title: '',
      description: '',
      category: 'shooting',
      level: 'beginner',
      duration: '',
      videoUrl: '',
      thumbnail: '',
      tags: []
    });
    setShowAddForm(false);
  };

  const handleDeleteVideo = (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      const updatedVideos = videos.filter(video => video.id !== id);
      saveVideos(updatedVideos);
    }
  };

  const addTag = () => {
    setNewVideo({
      ...newVideo,
      tags: [...newVideo.tags, '']
    });
  };

  const updateTag = (index, value) => {
    const updatedTags = [...newVideo.tags];
    updatedTags[index] = value;
    setNewVideo({ ...newVideo, tags: updatedTags });
  };

  const removeTag = (index) => {
    const updatedTags = newVideo.tags.filter((_, i) => i !== index);
    setNewVideo({ ...newVideo, tags: updatedTags });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Video Manager</h2>
          <p className="text-gray-600">Upload and manage training videos</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          <SafeIcon icon={FiPlus} />
          <span>Add Video</span>
        </button>
      </div>

      {/* Add/Edit Video Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {editingVideo ? 'Edit Video' : 'Add New Video'}
            </h3>
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingVideo(null);
                setNewVideo({
                  title: '',
                  description: '',
                  category: 'shooting',
                  level: 'beginner',
                  duration: '',
                  videoUrl: '',
                  thumbnail: '',
                  tags: []
                });
              }}
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
                value={newVideo.title}
                onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter video title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <input
                type="text"
                value={newVideo.duration}
                onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., 12:30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={newVideo.category}
                onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
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
                value={newVideo.level}
                onChange={(e) => setNewVideo({ ...newVideo, level: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                {levels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                value={newVideo.videoUrl}
                onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="https://youtube.com/embed/... or upload file"
              />
              <p className="text-sm text-gray-500 mt-1">
                Use YouTube embed URL, Vimeo, or upload to a video hosting service
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
              <input
                type="url"
                value={newVideo.thumbnail}
                onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newVideo.description}
                onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Enter video description"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="space-y-2">
                {newVideo.tags.map((tag, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => updateTag(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter tag"
                    />
                    <button
                      onClick={() => removeTag(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <SafeIcon icon={FiX} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addTag}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  + Add Tag
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowAddForm(false);
                setEditingVideo(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={editingVideo ? handleUpdateVideo : handleAddVideo}
              className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <SafeIcon icon={FiSave} />
              <span>{editingVideo ? 'Update' : 'Save'} Video</span>
            </button>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative">
              {video.thumbnail ? (
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <SafeIcon icon={FiVideo} className="text-white text-4xl" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <SafeIcon icon={FiPlay} className="text-white text-3xl" />
              </div>
              {video.duration && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">{video.title}</h3>
                <div className="flex items-center space-x-1 ml-2">
                  <button
                    onClick={() => handleEditVideo(video)}
                    className="text-gray-500 hover:text-primary-600"
                  >
                    <SafeIcon icon={FiEdit} className="text-sm" />
                  </button>
                  <button
                    onClick={() => handleDeleteVideo(video.id)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <SafeIcon icon={FiTrash2} className="text-sm" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>

              <div className="flex items-center space-x-2 mb-3">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  video.level === 'beginner' ? 'bg-green-100 text-green-800' :
                  video.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {video.level}
                </span>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full capitalize">
                  {video.category}
                </span>
              </div>

              {video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {video.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <SafeIcon icon={FiVideo} className="text-gray-400 text-4xl mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos yet</h3>
          <p className="text-gray-600 mb-4">Start building your video library by adding training content</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Add Your First Video
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;