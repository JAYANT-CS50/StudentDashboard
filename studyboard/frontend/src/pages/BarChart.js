import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';

export const BarChart = () => {
  //const [data, setData] = useState([]);
  const subData = useSelector(state => state.userState);
 

 /* const handleChange = () => {
    axios.get('http://127.0.0.1:8000/dashboard/subject/')
      .then(response => {
        setData(response.data);
      });
  };*/

  useEffect(() => {
    const chart = new Chart('acquisitions', {
      type: 'bar',
      data: {
        labels: subData.map(row => row.name),
        datasets: [
          {
            label: 'Hours/Week',
            data: subData.map(row => row.totaltime/(row.time/7)),
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Set the background color for the first bar
            borderColor: 'rgba(75, 192, 192, 1)', // Set the border color for the first bar
            borderWidth: 1, // Set the border width for the first bar
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Hours', // Specify the title text for the y-axis
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
  }, [subData]);

  return (
    <>
      <canvas id="acquisitions"></canvas>
      
    </>
  );
};
