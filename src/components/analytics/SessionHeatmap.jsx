import React from 'react';
import ReactECharts from 'echarts-for-react';

const SessionHeatmap = () => {
  // Generate mock data for the last 12 weeks
  const generateHeatmapData = () => {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 84); // 12 weeks ago

    for (let week = 0; week < 12; week++) {
      for (let day = 0; day < 7; day++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + (week * 7) + day);
        
        // Simulate session intensity (0-10)
        let intensity = 0;
        if (day >= 1 && day <= 5) { // Weekdays more likely to have sessions
          intensity = Math.random() > 0.3 ? Math.floor(Math.random() * 8) + 3 : 0;
        } else if (day === 6) { // Saturday
          intensity = Math.random() > 0.5 ? Math.floor(Math.random() * 6) + 5 : 0;
        }
        
        data.push([week, day, intensity]);
      }
    }
    return data;
  };

  const heatmapData = generateHeatmapData();
  const maxIntensity = Math.max(...heatmapData.map(item => item[2]));

  const option = {
    title: {
      text: 'Training Session Heatmap',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937'
      }
    },
    tooltip: {
      position: 'top',
      formatter: function(params) {
        const weekNames = ['12 weeks ago', '11 weeks ago', '10 weeks ago', '9 weeks ago', '8 weeks ago', '7 weeks ago', '6 weeks ago', '5 weeks ago', '4 weeks ago', '3 weeks ago', '2 weeks ago', 'Last week'];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const intensity = params.value[2];
        
        return `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">
              ${dayNames[params.value[1]]}, ${weekNames[params.value[0]]}
            </div>
            <div>Training Intensity: ${intensity}/10</div>
            <div style="margin-top: 4px; color: #6b7280;">
              ${intensity === 0 ? 'No session' : intensity <= 3 ? 'Light training' : intensity <= 6 ? 'Moderate training' : 'Intense training'}
            </div>
          </div>
        `;
      }
    },
    grid: {
      height: '50%',
      top: '15%'
    },
    xAxis: {
      type: 'category',
      data: ['12w', '11w', '10w', '9w', '8w', '7w', '6w', '5w', '4w', '3w', '2w', '1w'],
      splitArea: {
        show: true
      },
      axisLabel: {
        color: '#6b7280'
      }
    },
    yAxis: {
      type: 'category',
      data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      splitArea: {
        show: true
      },
      axisLabel: {
        color: '#6b7280'
      }
    },
    visualMap: {
      min: 0,
      max: maxIntensity,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
      inRange: {
        color: ['#f3f4f6', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9']
      },
      text: ['High Intensity', 'Low Intensity'],
      textStyle: {
        color: '#6b7280'
      }
    },
    series: [
      {
        name: 'Training Intensity',
        type: 'heatmap',
        data: heatmapData,
        label: {
          show: false
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <ReactECharts 
        option={option} 
        style={{ height: '400px' }}
        opts={{ renderer: 'canvas' }}
      />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {heatmapData.filter(item => item[2] > 0).length}
          </div>
          <div className="text-sm text-green-700">Total Sessions</div>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(heatmapData.reduce((sum, item) => sum + item[2], 0) / heatmapData.filter(item => item[2] > 0).length * 10) / 10}
          </div>
          <div className="text-sm text-blue-700">Avg. Intensity</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {heatmapData.filter(item => item[2] >= 7).length}
          </div>
          <div className="text-sm text-purple-700">High Intensity Days</div>
        </div>
      </div>
    </div>
  );
};

export default SessionHeatmap;