import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function EnergyDistributionGraph() {
  const [data, setData] = useState([]);
  const [selectedSources, setSelectedSources] = useState(['load']); // Initial selected sources
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Fetch data from the API endpoint
    axios.get('http://localhost:8080/data2')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Extract labels and datasets based on selected sources
  const labels = data.map(item => new Date(item.time * 1000).toLocaleTimeString());
  const datasets = selectedSources.map(source => ({
    label: source,
    data: data.map(item => item[source]),
    borderColor: getRandomColor(), // Generating random color for each source
    borderWidth: 2,
    pointRadius: 4,
    fill: false,
  }));

  // Chart.js configuration
  const chartData = {
    labels: labels,
    datasets: datasets,
  };


  const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Energy Distribution Graph',
    },
    scales: {
        y: {
        beginAtZero: true,
      },
    },
     tooltips: {
      mode: 'index',
      intersect: false,
    },
  },
};

  // Helper function to generate random colors
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div style={{border:"2px solid green"}} className="EnergyDistributionGraph">
      <div>
        <label>Select Sources:</label>
        <select
          multiple
          value={selectedSources}
          onChange={e => setSelectedSources(Array.from(e.target.selectedOptions, option => option.value))}
        >
          <option value="load">Load</option>
          <option value="solar">Solar</option>
          <option value="grid">Grid</option>
        </select>
      </div>
      <div>
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
      </div>
      <div style={{ width: '90vw', margin: '0 auto' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default EnergyDistributionGraph;
