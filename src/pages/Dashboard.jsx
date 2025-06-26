import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import ProgressChart from '../components/dashboard/ProgressChart';
import UpcomingSessions from '../components/dashboard/UpcomingSessions';
import SkillsProgress from '../components/dashboard/SkillsProgress';
import RecentActivity from '../components/dashboard/RecentActivity';

const { FiUser, FiTarget, FiTrendingUp, FiCalendar, FiAward, FiClock } = FiIcons;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      icon: FiCalendar,
      label: 'Sessions Completed',
      value: '24',
      change: '+3 this month',
      color: 'text-blue-600'
    },
    {
      icon: FiTarget,
      label: 'Skills Mastered',
      value: '8/20',
      change: '+2 this month',
      color: 'text-green-600'
    },
    {
      icon: FiTrendingUp,
      label: 'Improvement Rate',
      value: '92%',
      change: '+15% this month',
      color: 'text-purple-600'
    },
    {
      icon: FiAward,
      label: 'Goals Achieved',
      value: '12',
      change: '+4 this month',
      color: 'text-orange-600'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiTrendingUp },
    { id: 'progress', label: 'Progress', icon: FiTarget },
    { id: 'sessions', label: 'Sessions', icon: FiCalendar },
    { id: 'profile', label: 'Profile', icon: FiUser }
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">
                Welcome back, Marcus!
              </h1>
              <p className="text-gray-600 mt-2">
                Track your progress and continue your basketball journey
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Next Session</div>
                <div className="font-semibold text-gray-900">Tomorrow, 3:00 PM</div>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiClock} className="text-primary-600 text-xl" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center`}>
                  <SafeIcon icon={stat.icon} className={`text-xl ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
              <div className="text-sm text-green-600 font-medium">{stat.change}</div>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <SafeIcon icon={tab.icon} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <ProgressChart />
                <RecentActivity />
              </div>
              <div className="space-y-8">
                <UpcomingSessions />
                <SkillsProgress />
              </div>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-8">
              <SkillsProgress detailed={true} />
              <ProgressChart />
            </div>
          )}

          {activeTab === 'sessions' && (
            <div className="space-y-8">
              <UpcomingSessions detailed={true} />
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Session History</h3>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((session) => (
                    <div key={session} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">Ball Handling Mastery</div>
                        <div className="text-sm text-gray-600">December {session}, 2024</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">Completed</div>
                        <div className="text-sm text-gray-500">1.5 hours</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Player Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input 
                        type="text" 
                        defaultValue="Marcus Johnson"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option>Point Guard</option>
                        <option>Shooting Guard</option>
                        <option>Small Forward</option>
                        <option>Power Forward</option>
                        <option>Center</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Goals</label>
                      <textarea 
                        rows="4"
                        defaultValue="Improve shooting accuracy, develop better ball handling skills, and increase court awareness."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;