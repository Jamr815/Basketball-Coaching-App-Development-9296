import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import EditableText from '../components/editor/EditableText';
import EditableImage from '../components/editor/EditableImage';
import { useVisualEditor } from '../hooks/useVisualEditor';

const { FiTarget, FiClock, FiUsers, FiTrendingUp, FiShield, FiZap, FiEye, FiArrowRight } = FiIcons;

const Programs = () => {
  const { editMode } = useVisualEditor();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [skillModules, setSkillModules] = useState([]);

  const categories = [
    { id: 'all', name: 'All Skills', icon: FiTarget },
    { id: 'fundamentals', name: 'Fundamentals', icon: FiShield },
    { id: 'offense', name: 'Offensive', icon: FiZap },
    { id: 'defense', name: 'Defensive', icon: FiShield },
    { id: 'mental', name: 'Mental Game', icon: FiEye }
  ];

  const defaultModules = [
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
    },
    {
      id: 6,
      title: '1-on-1 Scoring Moves',
      category: 'offense',
      description: 'Jab steps, crossovers, step-backs, and isolation scoring techniques.',
      duration: '55 min',
      level: 'Intermediate to Advanced',
      icon: 'FiZap',
      features: [
        'Jab step variations',
        'Crossover combinations',
        'Step-back jumpers',
        'Isolation footwork'
      ]
    },
    {
      id: 7,
      title: 'Pick & Roll Situations',
      category: 'offense',
      description: 'Master pick and roll offense, reading screens, and making quick decisions.',
      duration: '50 min',
      level: 'Intermediate to Advanced',
      icon: 'FiUsers',
      features: [
        'Screen reading',
        'Roll vs. pop decisions',
        'Help defense recognition',
        'Quick decision making'
      ]
    },
    {
      id: 8,
      title: 'Off-Ball Movement & Awareness',
      category: 'fundamentals',
      description: 'Learn to move without the ball, create space, and find open spots.',
      duration: '40 min',
      level: 'All Levels',
      icon: 'FiTrendingUp',
      features: [
        'Cutting techniques',
        'Spacing concepts',
        'Screen usage',
        'Communication skills'
      ]
    },
    {
      id: 9,
      title: 'Footwork for Guards & Forwards',
      category: 'fundamentals',
      description: 'Position-specific footwork training for guards and forwards.',
      duration: '45 min',
      level: 'All Levels',
      icon: 'FiTarget',
      features: [
        'Triple threat position',
        'Pivot fundamentals',
        'Jab step mechanics',
        'Balance and stability'
      ]
    },
    {
      id: 10,
      title: 'Reading Defenses',
      category: 'mental',
      description: 'Understand defensive schemes and make quick offensive adjustments.',
      duration: '40 min',
      level: 'Intermediate to Advanced',
      icon: 'FiEye',
      features: [
        'Zone vs. man recognition',
        'Weak side awareness',
        'Help defense reads',
        'Counter strategies'
      ]
    }
  ];

  useEffect(() => {
    // Load skill modules from localStorage or use defaults
    const savedModules = localStorage.getItem('skillModules');
    if (savedModules) {
      setSkillModules(JSON.parse(savedModules));
    } else {
      setSkillModules(defaultModules);
      localStorage.setItem('skillModules', JSON.stringify(defaultModules));
    }
  }, []);

  const getIconComponent = (iconName) => {
    const iconMap = {
      FiTarget, FiZap, FiShield, FiEye, FiUsers, FiClock, FiTrendingUp
    };
    return iconMap[iconName] || FiTarget;
  };

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
          <EditableText
            contentKey="programs.title"
            editMode={editMode}
            type="heading"
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 block"
          >
            20 Specialized Training Modules
          </EditableText>
          <EditableText
            contentKey="programs.subtitle"
            editMode={editMode}
            type="textarea"
            className="text-xl text-gray-600 max-w-3xl mx-auto block"
          >
            Comprehensive basketball skill development covering every aspect of the game. Each module is designed by Julian Beard based on professional experience.
          </EditableText>
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
                  <SafeIcon icon={getIconComponent(module.icon)} className="text-primary-600" />
                </div>
                <div className="text-sm text-primary-600 font-medium uppercase tracking-wide">
                  {module.category}
                </div>
              </div>

              <EditableText
                contentKey={`programs.modules.${module.id}.title`}
                editMode={editMode}
                className="text-xl font-bold text-gray-900 mb-3 block"
              >
                {module.title}
              </EditableText>

              <EditableText
                contentKey={`programs.modules.${module.id}.description`}
                editMode={editMode}
                type="textarea"
                className="text-gray-600 mb-4 block"
              >
                {module.description}
              </EditableText>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiClock} />
                  <EditableText
                    contentKey={`programs.modules.${module.id}.duration`}
                    editMode={editMode}
                    className="inline"
                  >
                    {module.duration}
                  </EditableText>
                </div>
                <EditableText
                  contentKey={`programs.modules.${module.id}.level`}
                  editMode={editMode}
                  className="inline"
                >
                  {module.level}
                </EditableText>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 text-sm mb-2">Key Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {module.features?.slice(0, 3).map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                      <EditableText
                        contentKey={`programs.modules.${module.id}.features.${featureIndex}`}
                        editMode={editMode}
                        className="flex-1"
                      >
                        {feature}
                      </EditableText>
                    </li>
                  ))}
                  {module.features?.length > 3 && (
                    <li className="text-gray-500 text-xs">+ {module.features.length - 3} more features</li>
                  )}
                </ul>
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
          <EditableText
            contentKey="programs.cta.title"
            editMode={editMode}
            type="heading"
            className="text-3xl font-bold text-gray-900 mb-4 block"
          >
            Ready to Start Your Training Journey?
          </EditableText>
          <EditableText
            contentKey="programs.cta.subtitle"
            editMode={editMode}
            type="textarea"
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto block"
          >
            Book your first session and experience the difference professional training makes
          </EditableText>

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