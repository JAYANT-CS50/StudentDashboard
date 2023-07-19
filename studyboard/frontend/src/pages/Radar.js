import React, { useEffect,  } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';




export const Radar = () => {

  

  const subData = useSelector(state => state.userState.subList);


  useEffect(() => {
    const chart = new Chart('chapter_count', {
      type: 'radar',
      data: {
        labels: subData.map(row => row.name),
        datasets: [
          {
            label: 'No. of Chapters',
            data: subData.map(row => row.chapter_count),
            backgroundColor: 'rgb(255, 26, 198, 0.5)', // Set the background color for the bars
            borderColor: 'rgb(51, 0, 38, 1)', // Set the border color for the bars
            borderWidth: 1, // Set the border width for the bars
          },
        ],
      },
      options: {
        scales: {
          r: {
            beginAtZero: true, // Set beginAtZero to true for the radar chart
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Chapters in Each Subject', // Specify the title text
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
    <canvas id="chapter_count"></canvas>
  </>
  )
}
