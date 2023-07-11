import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

export const DoughnutChart = ({subData, setSubData}) => {
  const [data, setData] = useState([]);
 

  const handleChange = (event) => {
    
    const selectedOption = event.target.value;
    console.log(selectedOption, "check")
    axios.get(`http://127.0.0.1:8000/dashboard/subject/${selectedOption}/`)
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
              'rgba(255, 99, 132, 0.6)', // Red
              'rgba(54, 162, 235, 0.6)', // Blue
              'rgba(255, 205, 86, 0.6)', // Yellow
              'rgba(75, 192, 192, 0.6)', // Green
              'rgba(153, 102, 255, 0.6)', // Purple
              'rgba(255, 159, 64, 0.6)', // Orange
              'rgba(0, 204, 204, 0.6)', // Teal
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

