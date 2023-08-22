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
import { Progress, Select } from '@chakra-ui/react';



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
    const [loading, setLoading] = useState(false)
  const [data, setData] = useState([]);
  const [selectedSources, setSelectedSources] = useState(['load']); // Initial selected sources
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    // Fetch data from the API endpoint
    setLoading(true)
    axios.get('https://switcyapi.onrender.com/data2')
      .then(response => {
        setData(response.data);
        setLoading(false)
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
      <div className='mainDiv'>
        <Select
          value={selectedSources[0]} // Since we're not using multiple selection, only one value is needed
          onChange={e => setSelectedSources([e.target.value])} // Wrap the selected value in an array
        >
            <option value="load">Select Source</option>
          <option value="load">Load</option>
          <option value="solar">Solar</option>
          <option value="grid">Grid</option>
        </Select>
      </div>
      <div className='dateClass'>
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
        />
      </div>
      <div style={{ width: '90vw', margin: '0 auto' }}>
        {
            !loading ? <Line data={chartData} options={chartOptions} />:<Progress size='xs' isIndeterminate />
        }
        
      </div>
    </div>
  );
}

export default EnergyDistributionGraph;
