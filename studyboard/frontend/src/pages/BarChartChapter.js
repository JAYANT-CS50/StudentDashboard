import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';



export const BarChartChapter = () => {

  const [data, setData] = useState([]);

  const handleChange = (event) => {
    axios.get('http://127.0.0.1:8000/dashboard/subjects/')
      .then(response => { 
        setData(response.data);
      });
  };

  useEffect(() => {
    const chart = new Chart('chapter_count', {
      type: 'radar',
      data: {
        labels: data.map(row => row.name),
        datasets: [
          {
            label: 'No. of Chapters',
            data: data.map(row => row.chapter_count),
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
  }, [data]);
  return (
    <>
    <canvas id="chapter_count"></canvas>
    <button onClick={handleChange}>Show</button>
  </>
  )
}
