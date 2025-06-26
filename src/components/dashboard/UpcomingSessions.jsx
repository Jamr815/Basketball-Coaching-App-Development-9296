import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiCalendar, FiClock, FiMapPin, FiArrowRight } = FiIcons;

const UpcomingSessions = ({ detailed = false }) => {
  const sessions = [
    {
      id: 1,
      title: 'Shooting Mechanics & Accuracy',
      date: 'Tomorrow',
      time: '3:00 PM',
      duration: '1.5 hours',
      location: 'Indoor Court A',
      type: 'Individual Training'
    },
    {
      id: 2,
      title: '1-on-1 Scoring Moves',
      date: 'Dec 15',
      time: '4:30 PM',
      duration: '1 hour',
      location: 'Outdoor Court',
      type: 'Skills Focus'
    },
    {
      id: 3,
      title: 'Game Situational Training',
      date: 'Dec 17',
      time: '2:00 PM',
      duration: '1.5 hours',
      location: 'Indoor Court B',
      type: 'Game Prep'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Upcoming Sessions</h3>
        {!detailed && (
          <Link 
            to="/booking" 
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            Book New Session
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {sessions.slice(0, detailed ? sessions.length : 3).map((session) => (
          <div key={session.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">{session.title}</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <SafeIcon icon={FiCalendar} className="text-xs" />
                    <span>{session.date}</span>
                    <SafeIcon icon={FiClock} className="text-xs" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <SafeIcon icon={FiMapPin} className="text-xs" />
                    <span>{session.location}</span>
                  </div>
                  <div className="inline-block px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
                    {session.type}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{session.duration}</div>
                {detailed && (
                  <button className="mt-2 text-primary-600 hover:text-primary-700">
                    <SafeIcon icon={FiArrowRight} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {detailed && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Link
            to="/booking"
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors text-center block"
          >
            Schedule New Session
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpcomingSessions;