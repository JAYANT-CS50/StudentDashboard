import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';

export const BarChart = () => {
  const subData = useSelector(state => state.userState.subList);

  useEffect(() => {
    const chart = new Chart('acquisitions', {
      type: 'bar', // Keep the chart type as 'bar'
      data: {
        labels: subData.map(row => row.name),
        datasets: [
          {
            label: 'Hours/Week',
            data: subData.map(row => row.totaltime / (row.time / 7)),
            backgroundColor: 'rgb(51, 255, 51, 0.8)', // Set the background color for the bars
            borderColor: 'rgb(0, 51, 0)', // Set the border color for the bars
            borderWidth: 1, // Set the border width for the bars
          },
        ],
      },
      options: {
        indexAxis: 'y', // Set the index axis to 'y' for horizontal bars
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Subjects', // Specify the title text for the y-axis
            },
            ticks: {
              precision: 0, // Set the precision of the tick values
            },
          },
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Hours', // Specify the title text for the x-axis
            },
            ticks: {
              precision: 0, // Set the precision of the tick values
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Hours Per Week', // Specify the title text
            font: {
              size: 20,
              weight: 'bold',
            },
          },
        },
      },
    });

    // Clean up chart instance on component unmount
    return () => {
      chart.destroy();
    };
  }, [subData]);

  return <canvas id="acquisitions"></canvas>;
};
