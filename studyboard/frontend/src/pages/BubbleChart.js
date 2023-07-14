import React from 'react'
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { useSelector } from 'react-redux';

export const BubbleChart = () => {
  

  const subData = useSelector(state => state.userState.subList);

  useEffect(() => {
    const chart = new Chart('bubble', {
      type: 'bubble',
      data: {
        labels: subData.map(row => row.name),
        datasets: [
          {
            label: 'Bubble Chart',
            data: subData.map(row => ({
              
              x: row.totaltime,
              y: row.chapter_count,
              r: row.time,
              subjectName: row.name, // Store the subject name as a custom property
            })),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            title: {
              display: true,
              text: 'Chapters in Each Subject',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Total Hours in Each Subject',
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: (context) => context[0].raw.subjectName, // Use the subject name as tooltip title
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [subData]);

  return (
    <>
      <canvas id="bubble"></canvas>
    </>
  );
};


