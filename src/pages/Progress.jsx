import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ProgressChart from '../components/dashboard/ProgressChart';
import SkillsProgress from '../components/dashboard/SkillsProgress';

const { FiTrendingUp, FiTarget, FiAward, FiCalendar, FiBarChart, FiPieChart } = FiIcons;

const Progress = () => {
  const [viewType, setViewType] = useState('overview');

  const overallStats = [
    {
      label: 'Overall Progress',
      value: '85%',
      change: '+12%',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Sessions Completed',
      value: '24',
      change: '+3',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      label: 'Skills Mastered',
      value: '8/20',
      change: '+2',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      label: 'Goals Achieved',
      value: '12',
      change: '+4',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const skillCategories = [
    {
      name: 'Fundamentals',
      skills: [
        { name: 'Ball Handling', progress: 88, level: 'Advanced' },
        { name: 'Shooting Form', progress: 92, level: 'Expert' },
        { name: 'Footwork', progress: 78, level: 'Advanced' },
        { name: 'Court Awareness', progress: 72, level: 'Intermediate' }
      ]
    },
    {
      name: 'Offensive Skills',
      skills: [
        { name: '1-on-1 Moves', progress: 82, level: 'Advanced' },
        { name: 'Catch & Shoot', progress: 85, level: 'Advanced' },
        { name: 'Off-Ball Movement', progress: 68, level: 'Intermediate' },
        { name: 'Pick & Roll', progress: 65, level: 'Intermediate' }
      ]
    },
    {
      name: 'Defensive Skills',
      skills: [
        { name: 'Defensive Stance', progress: 75, level: 'Intermediate' },
        { name: 'Lateral Movement', progress: 70, level: 'Intermediate' },
        { name: 'Help Defense', progress: 60, level: 'Beginner' },
        { name: 'Rebounding', progress: 55, level: 'Beginner' }
      ]
    },
    {
      name: 'Mental Game',
      skills: [
        { name: 'Basketball IQ', progress: 68, level: 'Intermediate' },
        { name: 'Decision Making', progress: 72, level: 'Intermediate' },
        { name: 'Confidence', progress: 80, level: 'Advanced' },
        { name: 'Focus', progress: 75, level: 'Intermediate' }
      ]
    }
  ];

  const achievements = [
    {
      title: 'Shooting Specialist',
      description: 'Achieved 90%+ accuracy in shooting drills',
      date: 'Dec 10, 2024',
      icon: FiTarget,
      earned: true
    },
    {
      title: 'Ball Handler',
      description: 'Mastered advanced dribbling combinations',
      date: 'Dec 5, 2024',
      icon: FiAward,
      earned: true
    },
    {
      title: 'Consistent Performer',
      description: 'Complete 20 training sessions',
      date: 'Dec 1, 2024',
      icon: FiCalendar,
      earned: true
    },
    {
      title: 'All-Around Player',
      description: 'Reach intermediate level in all skill categories',
      date: 'In Progress',
      icon: FiTrendingUp,
      earned: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Your Progress Journey
          </h1>
          <p className="text-gray-600">
            Track your basketball development and celebrate your achievements
          </p>
        </motion.div>

        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex space-x-4 mb-8"
        >
          <button
            onClick={() => setViewType('overview')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              viewType === 'overview'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <SafeIcon icon={FiBarChart} />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setViewType('detailed')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              viewType === 'detailed'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <SafeIcon icon={FiPieChart} />
            <span>Detailed</span>
          </button>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {overallStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <SafeIcon icon={FiTrendingUp} className={`text-xl ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className={`text-sm font-medium ${stat.color}`}>{stat.change} this month</div>
            </div>
          ))}
        </motion.div>

        {viewType === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Progress Chart */}
            <div className="lg:col-span-2">
              <ProgressChart />
            </div>

            {/* Skills Summary */}
            <div>
              <SkillsProgress detailed={true} />
            </div>
          </div>
        )}

        {viewType === 'detailed' && (
          <div className="space-y-8">
            {/* Skill Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {skillCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">{category.name}</h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{skill.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{skill.progress}%</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              skill.level === 'Expert' ? 'bg-green-100 text-green-800' :
                              skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                              skill.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {skill.level}
                            </span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              skill.progress >= 90 ? 'bg-green-500' :
                              skill.progress >= 70 ? 'bg-blue-500' :
                              skill.progress >= 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${skill.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.earned
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        achievement.earned
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <SafeIcon icon={achievement.icon} className="text-xl" />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          achievement.earned ? 'text-green-900' : 'text-gray-600'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm mt-1 ${
                          achievement.earned ? 'text-green-700' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>
                        <p className={`text-xs mt-2 ${
                          achievement.earned ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {achievement.date}
                        </p>
                      </div>
                      {achievement.earned && (
                        <SafeIcon icon={FiAward} className="text-green-600 text-xl" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;