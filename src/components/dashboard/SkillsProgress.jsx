import React from 'react';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiTarget, FiTrendingUp, FiCheck } = FiIcons;

const SkillsProgress = ({ detailed = false }) => {
  const skills = [
    {
      name: 'Ball Handling',
      progress: 88,
      level: 'Advanced',
      sessions: 12,
      color: 'bg-blue-500'
    },
    {
      name: 'Shooting Accuracy',
      progress: 92,
      level: 'Expert',
      sessions: 15,
      color: 'bg-green-500'
    },
    {
      name: 'Defensive Footwork',
      progress: 75,
      level: 'Intermediate',
      sessions: 8,
      color: 'bg-yellow-500'
    },
    {
      name: 'Court Vision',
      progress: 68,
      level: 'Intermediate',
      sessions: 6,
      color: 'bg-purple-500'
    },
    {
      name: '1-on-1 Moves',
      progress: 82,
      level: 'Advanced',
      sessions: 10,
      color: 'bg-orange-500'
    },
    {
      name: 'Game Situations',
      progress: 70,
      level: 'Intermediate',
      sessions: 7,
      color: 'bg-red-500'
    }
  ];

  const displaySkills = detailed ? skills : skills.slice(0, 4);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Skills Progress</h3>
        <SafeIcon icon={FiTrendingUp} className="text-primary-600" />
      </div>

      <div className="space-y-6">
        {displaySkills.map((skill, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${skill.color}`}></div>
                <span className="font-medium text-gray-900">{skill.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{skill.progress}%</span>
                {skill.progress >= 90 && (
                  <SafeIcon icon={FiCheck} className="text-green-500 text-sm" />
                )}
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full ${skill.color}`}
                style={{ width: `${skill.progress}%` }}
              ></div>
            </div>
            
            {detailed && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>{skill.level}</span>
                <span>{skill.sessions} sessions</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {detailed && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-600">8</div>
              <div className="text-sm text-gray-600">Skills Mastered</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">92%</div>
              <div className="text-sm text-gray-600">Avg. Progress</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsProgress;