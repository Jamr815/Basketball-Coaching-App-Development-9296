import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTarget, FiClock, FiUsers, FiTrendingUp, FiShield, FiZap, FiEye, FiArrowRight } = FiIcons;

const Programs = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Skills', icon: FiTarget },
    { id: 'fundamentals', name: 'Fundamentals', icon: FiShield },
    { id: 'offense', name: 'Offensive', icon: FiZap },
    { id: 'defense', name: 'Defensive', icon: FiShield },
    { id: 'mental', name: 'Mental Game', icon: FiEye }
  ];

  const skillModules = [
    {
      id: 1,
      title: 'Ball Handling Mastery',
      category: 'fundamentals',
      description: 'Master dribbling techniques, hand-eye coordination, and ball control under pressure.',
      duration: '45 min',
      level: 'Beginner to Advanced',
      icon: FiTarget
    },
    {
      id: 2,
      title: 'Shooting Mechanics & Accuracy',
      category: 'offense',
      description: 'Perfect your shooting form, consistency, and accuracy from all positions.',
      duration: '60 min',
      level: 'All Levels',
      icon: FiTarget
    },
    {
      id: 3,
      title: 'Finishing at the Rim',
      category: 'offense',
      description: 'Euro steps, floaters, contact layups, and advanced finishing techniques.',
      duration: '45 min',
      level: 'Intermediate to Advanced',
      icon: FiZap
    },
    {
      id: 4,
      title: 'Court Vision & Passing IQ',
      category: 'fundamentals',
      description: 'Develop basketball IQ, reading defenses, and making smart passes.',
      duration: '50 min',
      level: 'All Levels',
      icon: FiEye
    },
    {
      id: 5,
      title: 'Defensive Footwork & Positioning',
      category: 'defense',
      description: 'Master defensive stance, lateral movement, and positioning fundamentals.',
      duration: '45 min',
      level: 'All Levels',
      icon: FiShield
    },
    {
      id: 6,
      title: '1-on-1 Scoring Moves',
      category: 'offense',
      description: 'Jab steps, crossovers, step-backs, and isolation scoring techniques.',
      duration: '55 min',
      level: 'Intermediate to Advanced',
      icon: FiZap
    },
    {
      id: 7,
      title: 'Pick & Roll Situations',
      category: 'offense',
      description: 'Master pick and roll offense, reading screens, and making quick decisions.',
      duration: '50 min',
      level: 'Intermediate to Advanced',
      icon: FiUsers
    },
    {
      id: 8,
      title: 'Off-Ball Movement & Awareness',
      category: 'fundamentals',
      description: 'Learn to move without the ball, create space, and find open spots.',
      duration: '40 min',
      level: 'All Levels',
      icon: FiTrendingUp
    },
    {
      id: 9,
      title: 'Footwork for Guards & Forwards',
      category: 'fundamentals',
      description: 'Position-specific footwork training for guards and forwards.',
      duration: '45 min',
      level: 'All Levels',
      icon: FiTarget
    },
    {
      id: 10,
      title: 'Reading Defenses',
      category: 'mental',
      description: 'Understand defensive schemes and make quick offensive adjustments.',
      duration: '40 min',
      level: 'Intermediate to Advanced',
      icon: FiEye
    },
    {
      id: 11,
      title: 'Game Situational Training',
      category: 'mental',
      description: 'Practice game-like scenarios, clutch situations, and pressure moments.',
      duration: '60 min',
      level: 'All Levels',
      icon: FiClock
    },
    {
      id: 12,
      title: 'Athletic Conditioning & Endurance',
      category: 'fundamentals',
      description: 'Basketball-specific conditioning, agility, and endurance training.',
      duration: '45 min',
      level: 'All Levels',
      icon: FiTrendingUp
    },
    {
      id: 13,
      title: 'Vertical Jump & Explosiveness',
      category: 'fundamentals',
      description: 'Plyometric training to increase vertical jump and explosive power.',
      duration: '40 min',
      level: 'All Levels',
      icon: FiZap
    },
    {
      id: 14,
      title: 'Transition Offense & Defense',
      category: 'fundamentals',
      description: 'Fast break offense, transition defense, and court awareness.',
      duration: '45 min',
      level: 'All Levels',
      icon: FiTrendingUp
    },
    {
      id: 15,
      title: 'Confidence & Mental Toughness',
      category: 'mental',
      description: 'Build mental resilience, confidence, and performance under pressure.',
      duration: '35 min',
      level: 'All Levels',
      icon: FiEye
    },
    {
      id: 16,
      title: 'Film Breakdown & Game Study',
      category: 'mental',
      description: 'Video analysis, studying game film, and learning from mistakes.',
      duration: '30 min',
      level: 'Intermediate to Advanced',
      icon: FiEye
    },
    {
      id: 17,
      title: 'Shooting Off the Dribble',
      category: 'offense',
      description: 'Master pull-up jumpers, step-backs, and shooting on the move.',
      duration: '50 min',
      level: 'Intermediate to Advanced',
      icon: FiTarget
    },
    {
      id: 18,
      title: 'Catch & Shoot Development',
      category: 'offense',
      description: 'Quick release, footwork, and accuracy on catch-and-shoot opportunities.',
      duration: '45 min',
      level: 'All Levels',
      icon: FiTarget
    },
    {
      id: 19,
      title: 'Handling Full-Court Pressure',
      category: 'fundamentals',
      description: 'Break pressure defense, maintain composure, and advance the ball.',
      duration: '40 min',
      level: 'Intermediate to Advanced',
      icon: FiShield
    },
    {
      id: 20,
      title: 'Leadership & Team Communication',
      category: 'mental',
      description: 'Develop leadership skills, court communication, and team chemistry.',
      duration: '35 min',
      level: 'All Levels',
      icon: FiUsers
    }
  ];

  const filteredModules = selectedCategory === 'all' 
    ? skillModules 
    : skillModules.filter(module => module.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            20 Specialized Training Modules
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive basketball skill development covering every aspect of the game. 
            Each module is designed by Julian Beard based on professional experience.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
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

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={module.icon} className="text-primary-600" />
                </div>
                <div className="text-sm text-primary-600 font-medium uppercase tracking-wide">
                  {module.category}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">{module.title}</h3>
              <p className="text-gray-600 mb-4">{module.description}</p>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiClock} />
                  <span>{module.duration}</span>
                </div>
                <span>{module.level}</span>
              </div>

              <Link
                to="/booking"
                className="w-full inline-flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                <span>Book This Module</span>
                <SafeIcon icon={FiArrowRight} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 bg-white rounded-2xl p-12 shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Training Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Book your first session and experience the difference professional training makes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <span>Book Training Session</span>
              <SafeIcon icon={FiArrowRight} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center space-x-2 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 transition-colors"
            >
              <span>Meet Coach Julian</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Programs;