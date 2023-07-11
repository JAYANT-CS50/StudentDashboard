import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

export const BarChart = () => {
  const [data, setData] = useState([]);

  const handleChange = () => {
    axios.get('http://127.0.0.1:8000/dashboard/subjects/')
      .then(response => {
        setData(response.data);
      });
  };

  useEffect(() => {
    const chart = new Chart('acquisitions', {
      type: 'bar',
      data: {
        labels: data.map(row => row.name),
        datasets: [
          {
            label: 'Chapters',
            data: data.map(row => row.chapter_count),
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Set the background color for the first bar
            borderColor: 'rgba(75, 192, 192, 1)', // Set the border color for the first bar
            borderWidth: 1, // Set the border width for the first bar
          },
          {
            label: 'Days',
            data: data.map(row => row.time),
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Set the background color for the second bar
            borderColor: 'rgba(255, 99, 132, 1)', // Set the border color for the second bar
            borderWidth: 1, // Set the border width for the second bar
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'No. of Days', // Specify the title text for the y-axis
            },
            ticks: {
              precision: 0, // Set the precision of the tick values
            },
          },
        },
      },
    });

    // Clean up chart instance on component unmount
    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <>
      <canvas id="acquisitions"></canvas>
      <button onClick={handleChange}>Show</button>
    </>
  );
};
