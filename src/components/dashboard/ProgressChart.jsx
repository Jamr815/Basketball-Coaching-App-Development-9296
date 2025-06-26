import React from 'react';
import ReactECharts from 'echarts-for-react';

const ProgressChart = () => {
  const option = {
    title: {
      text: 'Skill Development Progress',
      left: 'left',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Shooting', 'Ball Handling', 'Defense', 'Basketball IQ'],
      top: 40
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8']
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: 'Shooting',
        type: 'line',
        data: [45, 52, 58, 65, 72, 78, 85, 92],
        smooth: true,
        lineStyle: {
          color: '#f97316'
        },
        itemStyle: {
          color: '#f97316'
        }
      },
      {
        name: 'Ball Handling',
        type: 'line',
        data: [40, 48, 55, 62, 68, 75, 82, 88],
        smooth: true,
        lineStyle: {
          color: '#3b82f6'
        },
        itemStyle: {
          color: '#3b82f6'
        }
      },
      {
        name: 'Defense',
        type: 'line',
        data: [35, 42, 48, 55, 63, 70, 76, 83],
        smooth: true,
        lineStyle: {
          color: '#10b981'
        },
        itemStyle: {
          color: '#10b981'
        }
      },
      {
        name: 'Basketball IQ',
        type: 'line',
        data: [30, 38, 45, 52, 60, 67, 74, 80],
        smooth: true,
        lineStyle: {
          color: '#8b5cf6'
        },
        itemStyle: {
          color: '#8b5cf6'
        }
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <ReactECharts option={option} style={{ height: '400px' }} />
    </div>
  );
};

export default ProgressChart;