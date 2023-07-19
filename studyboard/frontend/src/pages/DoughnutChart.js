import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axiosInstance from '../axiosConfig';

export const DoughnutChart = ({subData, setSubData}) => {
  const [data, setData] = useState([]);
 

  const handleChange = (event) => {
    
    const selectedOption = event.target.value;
    console.log(selectedOption, "check")
    axiosInstance.get(`subject/${selectedOption}/chapter/`)
      .then(response => {
        setData(response.data);
      });
  };



  useEffect(() => {
    const chart = new Chart('doughnut', {
      type: 'doughnut',
      data: {
        labels: data.map(row => row.name),
        datasets: [
          {
            label: 'Hours',
            data: data.map(row => row.time),
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)', // Red
              'rgba(54, 162, 235, 0.8)', // Blue
              'rgba(255, 205, 86, 0.8)', // Yellow
              'rgba(0, 255, 85, 0.8)', // Green
              'rgba(153, 102, 255, 0.8)', // Purple
              'rgba(255, 159, 64, 0.8)', // Orange
              'rgba(0, 204, 204, 0.8)', // Teal
            ],
            
            borderColor: [
              'rgba(255, 99, 132, 1)', // Red
              'rgba(54, 162, 235, 1)', // Blue
              'rgba(255, 205, 86, 1)', // Yellow
              'rgba(75, 192, 192, 1)', // Green
              'rgba(153, 102, 255, 1)', // Purple
              'rgba(255, 159, 64, 1)', // Orange
              'rgba(0, 204, 204, 1)', // Teal
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Chapters', // Specify the title text for the y-axis
            },
            ticks: {
              precision: 0, // Set the precision of the tick values
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'No. Of Hours Alloted To Each Chapter', // Specify the title text
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
    <canvas id="doughnut"></canvas>
    <select id="countries"  onChange={handleChange} className="rounded p-2 px-2 mx-8 bg-slate-200">
      <option disabled selected>
            Select Subject
          </option>
          {subData.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
    </select>
    
  </>
  )
}

