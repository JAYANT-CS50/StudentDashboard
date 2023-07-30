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
              'rgba(0, 0, 179, 0.6)',
              'rgba(0, 204, 0, 0.6)',
              'rgba(255, 102, 102, 0.6)',
              'rgba(255, 255, 51, 0.6)',
              'rgba(102, 0, 51, 0.6)',
              'rgba(0, 179, 143, 0.6)',
            ],
            borderColor: [
              'rgba(0, 0, 179, 1)',
              'rgba(0, 204, 0, 1)',
              'rgba(255, 102, 102, 1)',
              'rgba(255, 255, 51, 1)',
              'rgba(102, 0, 51, 1)',
              'rgba(0, 179, 143, 1)',
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
