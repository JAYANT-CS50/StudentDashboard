import React, { useEffect, useState } from 'react';
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
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Set the background color for the bars
            borderColor: 'rgba(75, 192, 192, 1)', // Set the border color for the bars
            borderWidth: 1, // Set the border width for the bars
          },
        ],
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
