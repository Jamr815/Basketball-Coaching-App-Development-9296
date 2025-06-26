import React from 'react';
import ReactECharts from 'echarts-for-react';

const PerformanceChart = ({ data, timeframe }) => {
  const getChartData = () => {
    const baseData = [75, 78, 82, 79, 85, 88, 91, 87, 89, 92, 88, 94];
    const dates = [];
    const today = new Date();
    
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i * (timeframe === '7d' ? 1 : timeframe === '30d' ? 3 : 7));
      dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }

    return { dates, values: baseData };
  };

  const { dates, values } = getChartData();

  const option = {
    title: {
      text: 'Performance Trend',
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
      },
      formatter: function(params) {
        return `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 4px;">${params[0].axisValue}</div>
            <div style="display: flex; align-items: center;">
              <div style="width: 10px; height: 10px; background: #f97316; border-radius: 50%; margin-right: 8px;"></div>
              Performance Score: ${params[0].value}%
            </div>
          </div>
        `;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisLabel: {
        color: '#6b7280'
      }
    },
    yAxis: {
      type: 'value',
      min: 60,
      max: 100,
      axisLabel: {
        formatter: '{value}%',
        color: '#6b7280'
      },
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6'
        }
      }
    },
    series: [
      {
        name: 'Performance',
        type: 'line',
        data: values,
        smooth: true,
        lineStyle: {
          color: '#f97316',
          width: 3
        },
        itemStyle: {
          color: '#f97316'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(249, 115, 22, 0.3)' },
              { offset: 1, color: 'rgba(249, 115, 22, 0.05)' }
            ]
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
    </div>
  );
};

export default PerformanceChart;