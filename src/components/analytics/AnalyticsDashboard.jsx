import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import PerformanceChart from './PerformanceChart';
import SkillRadarChart from './SkillRadarChart';
import SessionHeatmap from './SessionHeatmap';
import ProgressTrends from './ProgressTrends';
import PlayerComparison from './PlayerComparison';

const { FiTrendingUp, FiTarget, FiUsers, FiCalendar, FiBarChart, FiPieChart, FiActivity, FiAward } = FiIcons;

const AnalyticsDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('overall');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const timeframes = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '3 Months' },
    { value: '1y', label: '1 Year' }
  ];

  const metrics = [
    { value: 'overall', label: 'Overall Performance', icon: FiTrendingUp },
    { value: 'skills', label: 'Skill Development', icon: FiTarget },
    { value: 'sessions', label: 'Session Analytics', icon: FiCalendar },
    { value: 'comparison', label: 'Player Comparison', icon: FiUsers }
  ];

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedTimeframe]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockData = {
      overview: {
        totalSessions: 45,
        averageScore: 87.5,
        improvementRate: 23.4,
        skillsCompleted: 12,
        weeklyTrend: [82, 84, 86, 88, 87, 89, 91],
        topSkills: ['Shooting', 'Ball Handling', 'Defense'],
        strugglingAreas: ['Rebounding', 'Free Throws']
      },
      performance: {
        shooting: { current: 87, previous: 82, trend: 'up' },
        ballHandling: { current: 91, previous: 88, trend: 'up' },
        defense: { current: 78, previous: 75, trend: 'up' },
        conditioning: { current: 85, previous: 83, trend: 'up' },
        mentalGame: { current: 82, previous: 79, trend: 'up' }
      },
      sessions: {
        attendance: 94.2,
        averageDuration: 67,
        intensityScore: 8.3,
        completionRate: 96.7
      }
    };
    
    setAnalyticsData(mockData);
    setIsLoading(false);
  };

  const overviewStats = [
    {
      label: 'Total Sessions',
      value: analyticsData?.overview.totalSessions || 0,
      change: '+12%',
      icon: FiCalendar,
      color: 'blue'
    },
    {
      label: 'Average Performance',
      value: `${analyticsData?.overview.averageScore || 0}%`,
      change: '+5.2%',
      icon: FiTrendingUp,
      color: 'green'
    },
    {
      label: 'Improvement Rate',
      value: `${analyticsData?.overview.improvementRate || 0}%`,
      change: '+8.1%',
      icon: FiActivity,
      color: 'purple'
    },
    {
      label: 'Skills Completed',
      value: `${analyticsData?.overview.skillsCompleted || 0}/20`,
      change: '+3',
      icon: FiAward,
      color: 'orange'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900">Training Analytics</h1>
              <p className="text-gray-600 mt-2">Comprehensive performance insights and progress tracking</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                {timeframes.map(tf => (
                  <option key={tf.value} value={tf.value}>{tf.label}</option>
                ))}
              </select>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Export Report
              </button>
            </div>
          </div>

          {/* Metric Tabs */}
          <div className="flex space-x-4 overflow-x-auto">
            {metrics.map(metric => (
              <button
                key={metric.value}
                onClick={() => setSelectedMetric(metric.value)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedMetric === metric.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={metric.icon} />
                <span>{metric.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {overviewStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                  <SafeIcon icon={stat.icon} className={`text-${stat.color}-600 text-xl`} />
                </div>
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Content Based on Selected Metric */}
        <motion.div
          key={selectedMetric}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {selectedMetric === 'overall' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <PerformanceChart data={analyticsData} timeframe={selectedTimeframe} />
                <ProgressTrends data={analyticsData} />
              </div>
              <div className="space-y-8">
                <SkillRadarChart data={analyticsData?.performance} />
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Skills</h3>
                  <div className="space-y-3">
                    {analyticsData?.overview.topSkills.map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700">{skill}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${85 + index * 5}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{85 + index * 5}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedMetric === 'skills' && (
            <div className="space-y-8">
              <SkillRadarChart data={analyticsData?.performance} detailed={true} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Progression</h3>
                  <div className="space-y-4">
                    {Object.entries(analyticsData?.performance || {}).map(([skill, data]) => (
                      <div key={skill} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900 capitalize">{skill.replace(/([A-Z])/g, ' $1')}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{data.previous}%</span>
                            <SafeIcon icon={FiTrendingUp} className="text-green-500" />
                            <span className="text-sm font-medium text-green-600">{data.current}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${data.current}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas for Improvement</h3>
                  <div className="space-y-3">
                    {analyticsData?.overview.strugglingAreas.map((area, index) => (
                      <div key={index} className="p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-orange-900 font-medium">{area}</span>
                          <span className="text-orange-600 text-sm">Needs Focus</span>
                        </div>
                        <p className="text-orange-700 text-sm mt-1">
                          Recommended: 2-3 additional sessions per week
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedMetric === 'sessions' && (
            <div className="space-y-8">
              <SessionHeatmap />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Rate</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {analyticsData?.sessions.attendance}%
                    </div>
                    <p className="text-gray-600">Excellent consistency</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Avg. Session Duration</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {analyticsData?.sessions.averageDuration} min
                    </div>
                    <p className="text-gray-600">Above target</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Intensity Score</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {analyticsData?.sessions.intensityScore}/10
                    </div>
                    <p className="text-gray-600">High intensity</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedMetric === 'comparison' && (
            <PlayerComparison />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;