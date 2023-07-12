import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

export const PieChart = () => {
  const [data, setData] = useState([]);

  const handleChange = () => {
    axios.get('http://127.0.0.1:8000/dashboard/subjects/')
      .then(response => {
        setData(response.data);
      });
  };

  useEffect(() => {
    const chart = new Chart('piechart', {
      type: 'polarArea',
      data: {
        labels: data.map(row => row.name),
        datasets: [
          {
            label: 'Days',
            data: data.map(row => row.time),
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(255, 205, 86, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Subjects & Days Alloted', // Specify the title text
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
  }, [data]);

  return (
    <>
      <canvas id="piechart"></canvas>
      <button onClick={handleChange}>Show</button>
    </>
  );
};
