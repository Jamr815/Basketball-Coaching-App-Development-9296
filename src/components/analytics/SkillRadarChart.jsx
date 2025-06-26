import React from 'react';
import ReactECharts from 'echarts-for-react';

const SkillRadarChart = ({ data, detailed = false }) => {
  const skillData = data || {
    shooting: { current: 87 },
    ballHandling: { current: 91 },
    defense: { current: 78 },
    conditioning: { current: 85 },
    mentalGame: { current: 82 }
  };

  const indicators = [
    { name: 'Shooting', max: 100 },
    { name: 'Ball Handling', max: 100 },
    { name: 'Defense', max: 100 },
    { name: 'Conditioning', max: 100 },
    { name: 'Mental Game', max: 100 }
  ];

  const seriesData = [
    Object.values(skillData).map(skill => skill.current)
  ];

  const option = {
    title: {
      text: detailed ? 'Comprehensive Skill Analysis' : 'Skill Overview',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        return `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${params.name}</div>
            <div>Score: ${params.value}%</div>
          </div>
        `;
      }
    },
    radar: {
      indicator: indicators,
      center: ['50%', '55%'],
      radius: detailed ? '70%' : '65%',
      axisName: {
        color: '#374151',
        fontSize: 12
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(249, 115, 22, 0.05)', 'rgba(249, 115, 22, 0.1)']
        }
      },
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      }
    },
    series: [
      {
        name: 'Skills',
        type: 'radar',
        data: [
          {
            value: seriesData[0],
            name: 'Current Level',
            areaStyle: {
              color: 'rgba(249, 115, 22, 0.2)'
            },
            lineStyle: {
              color: '#f97316',
              width: 2
            },
            itemStyle: {
              color: '#f97316'
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <ReactECharts 
        option={option} 
        style={{ height: detailed ? '500px' : '350px' }}
        opts={{ renderer: 'canvas' }}
      />
      {detailed && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {Object.entries(skillData).map(([skill, data]) => (
            <div key={skill} className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-gray-900 capitalize mb-1">
                {skill.replace(/([A-Z])/g, ' $1')}
              </div>
              <div className="text-2xl font-bold text-primary-600">
                {data.current}%
              </div>
              <div className="text-sm text-gray-600">
                {data.current >= 90 ? 'Expert' : data.current >= 80 ? 'Advanced' : data.current >= 70 ? 'Intermediate' : 'Beginner'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillRadarChart;