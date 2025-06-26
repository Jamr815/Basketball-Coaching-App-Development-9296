import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlay, FiClock, FiUsers, FiTarget, FiFilter, FiSearch, FiBookmark, FiVideo } = FiIcons;

const DrillsLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = [
    { id: 'all', name: 'All Drills', icon: FiTarget },
    { id: 'shooting', name: 'Shooting', icon: FiTarget },
    { id: 'ballhandling', name: 'Ball Handling', icon: FiPlay },
    { id: 'defense', name: 'Defense', icon: FiUsers },
    { id: 'conditioning', name: 'Conditioning', icon: FiClock }
  ];

  const drills = [
    {
      id: 1,
      title: 'Form Shooting Progression',
      category: 'shooting',
      level: 'Beginner',
      duration: '15 min',
      equipment: 'Basketball, Hoop',
      description: 'Master proper shooting form with close-range repetitions and gradual distance increase.',
      videoUrl: 'https://example.com/video1',
      instructions: [
        'Start 3 feet from the basket',
        'Focus on proper hand placement',
        'Use consistent follow-through',
        'Make 10 shots before moving back'
      ],
      tips: 'Keep your elbow under the ball and follow through with a snap of the wrist.',
      featured: true
    },
    {
      id: 2,
      title: 'Two-Ball Dribbling',
      category: 'ballhandling',
      level: 'Intermediate',
      duration: '20 min',
      equipment: '2 Basketballs',
      description: 'Improve hand coordination and ball control using two basketballs simultaneously.',
      videoUrl: 'https://example.com/video2',
      instructions: [
        'Start with simultaneous dribbling',
        'Progress to alternating patterns',
        'Add movement while dribbling',
        'Practice for 30 seconds, rest 15 seconds'
      ],
      tips: 'Keep your head up and maintain control of both balls throughout the drill.',
      featured: false
    },
    {
      id: 3,
      title: 'Catch and Shoot',
      category: 'shooting',
      level: 'Intermediate',
      duration: '25 min',
      equipment: 'Basketball, Hoop, Partner',
      description: 'Develop quick release and accuracy on catch-and-shoot opportunities.',
      videoUrl: 'https://example.com/video3',
      instructions: [
        'Partner passes from various angles',
        'Catch in triple threat position',
        'Quick release with proper form',
        'Track shooting percentage'
      ],
      tips: 'Be ready to shoot before catching the ball. Feet should be set on the catch.',
      featured: true
    },
    {
      id: 4,
      title: 'Defensive Slides',
      category: 'defense',
      level: 'Beginner',
      duration: '10 min',
      equipment: 'None',
      description: 'Build defensive footwork and lateral movement fundamentals.',
      videoUrl: 'https://example.com/video4',
      instructions: [
        'Start in defensive stance',
        'Slide laterally without crossing feet',
        'Maintain low center of gravity',
        'Keep hands active and ready'
      ],
      tips: 'Stay low and push off with the outside foot when changing direction.',
      featured: false
    },
    {
      id: 5,
      title: 'Cone Dribbling Course',
      category: 'ballhandling',
      level: 'Advanced',
      duration: '18 min',
      equipment: 'Basketball, 6 Cones',
      description: 'Navigate through cones using various dribbling moves and techniques.',
      videoUrl: 'https://example.com/video5',
      instructions: [
        'Set up cones in zigzag pattern',
        'Use different moves at each cone',
        'Maintain control and speed',
        'Time yourself for improvement'
      ],
      tips: 'Focus on using both hands equally and keeping the ball low.',
      featured: false
    },
    {
      id: 6,
      title: 'Suicide Sprints',
      category: 'conditioning',
      level: 'Intermediate',
      duration: '12 min',
      equipment: 'Basketball Court',
      description: 'Build cardiovascular endurance and leg strength with court sprints.',
      videoUrl: 'https://example.com/video6',
      instructions: [
        'Sprint to free throw line and back',
        'Sprint to half court and back',
        'Sprint to far free throw line and back',
        'Sprint full court and back'
      ],
      tips: 'Touch each line with your hand and maintain proper running form.',
      featured: true
    }
  ];

  const filteredDrills = drills.filter(drill => {
    const matchesCategory = selectedCategory === 'all' || drill.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || drill.level === selectedLevel;
    const matchesSearch = drill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drill.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const featuredDrills = drills.filter(drill => drill.featured);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Basketball Drills Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master your skills with our comprehensive collection of basketball drills, 
            complete with video tutorials and step-by-step instructions.
          </p>
        </motion.div>

        {/* Featured Drills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Drills</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredDrills.map((drill) => (
              <div key={drill.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                    <SafeIcon icon={FiVideo} className="text-white text-4xl" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{drill.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{drill.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiClock} />
                      <span>{drill.duration}</span>
                    </div>
                    <span className="bg-gray-100 px-2 py-1 rounded-full">{drill.level}</span>
                  </div>
                  <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    View Drill
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <SafeIcon icon={FiSearch} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search drills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  <SafeIcon icon={FiFilter} />
                  <span>More Filters</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <SafeIcon icon={category.icon} />
              <span>{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Drills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredDrills.map((drill, index) => (
            <motion.div
              key={drill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <div className="h-40 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <SafeIcon icon={FiPlay} className="text-white text-3xl" />
                </div>
                <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <SafeIcon icon={FiBookmark} className="text-gray-600" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{drill.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    drill.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    drill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {drill.level}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{drill.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <SafeIcon icon={FiClock} />
                    <span>{drill.duration}</span>
                  </div>
                  <span>{drill.equipment}</span>
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-gray-900 text-sm">Quick Instructions:</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {drill.instructions.slice(0, 2).map((instruction, i) => (
                      <li key={i}>• {instruction}</li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  View Full Drill
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredDrills.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <SafeIcon icon={FiTarget} className="text-gray-400 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No drills found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DrillsLibrary;