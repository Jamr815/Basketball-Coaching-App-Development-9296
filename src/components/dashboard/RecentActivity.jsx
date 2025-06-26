import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTarget, FiTrendingUp, FiAward, FiCalendar } = FiIcons;

const RecentActivity = () => {
  const activities = [
    {
      icon: FiTarget,
      title: 'Completed Shooting Mechanics Session',
      description: 'Improved accuracy by 15% in catch-and-shoot drills',
      time: '2 hours ago',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: FiAward,
      title: 'Achieved Ball Handling Milestone',
      description: 'Successfully completed advanced dribbling combinations',
      time: '1 day ago',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: FiTrendingUp,
      title: 'Progress Update',
      description: 'Overall skill rating increased to 82%',
      time: '2 days ago',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: FiCalendar,
      title: 'Session Booked',
      description: 'Scheduled 1-on-1 scoring moves training',
      time: '3 days ago',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: FiTarget,
      title: 'Defensive Footwork Session',
      description: 'Practiced lateral movement and positioning',
      time: '4 days ago',
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.color}`}>
              <SafeIcon icon={activity.icon} className="text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900">{activity.title}</div>
              <div className="text-sm text-gray-600 mt-1">{activity.description}</div>
              <div className="text-xs text-gray-500 mt-2">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-primary-600 hover:text-primary-700 font-medium text-sm">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;