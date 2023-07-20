import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';


export const PieChart = () => {
  

  const subData = useSelector(state => state.userState.subList);



  useEffect(() => {
    const chart = new Chart('piechart', {
      type: 'polarArea',
      data: {
        labels: subData.map(row => row.name),
        datasets: [
          {
            label: 'Days',
            data: subData.map(row => row.time),
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
            text: 'Days Alloted Per Subject', // Specify the title text
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

  return (
    <>
      <canvas id="piechart"></canvas>
      
    </>
  );
};
