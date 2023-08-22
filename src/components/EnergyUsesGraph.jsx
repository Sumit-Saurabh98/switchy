import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Button } from '@chakra-ui/react';




ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




function EnergyUsesGraph(props) {
    const [data, setData] = useState([]);
  const [view, setView] = useState('day'); // 'day', 'week', 'month'

  useEffect(() => {
    // Fetch data from the API endpoint
    axios.get('http://localhost:8080/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const toggleView = newView => {
    setView(newView);
  };

// Filter data based on the selected view
  let filteredData = [];
  if (view === 'day') {
    filteredData = data;
  } else if (view === 'week') {
    const currentDay = new Date().getDate();
    filteredData = data.filter(item => {
      const day = new Date(item.time * 1000).getDate();
      return day >= currentDay - 6;
    });
  } else if (view === 'month') {
    const groupedData = data.reduce((result, item) => {
      const date = new Date(item.time * 1000);
      const yearMonth = `${date.getFullYear()}-${date.getMonth()}`;
      if (!result[yearMonth]) {
        result[yearMonth] = item;
      }
      return result;
    }, {});

    filteredData = Object.values(groupedData);
  }
// Extract energy and time values from the filtered data
 const energyData = filteredData.map(item => item.energy);
  const timeLabels = filteredData.map(item => {
    const date = new Date(item.time * 1000);
    if (view === 'day') {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    } else if (view === 'week') {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    } else if (view === 'month') {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }
    return date.toLocale;
  });

  // Chart.js configuration
  const chartData = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Energy',
        data: energyData,
        backgroundColor: energyData.map(value => {
          if (value >= 0 && value <= 5) {
            return 'green';
          } else if (value > 5 && value <= 15) {
            return 'yellow';
          } else {
            return 'red';
          }
        }),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barPercentage: 10, // Adjust the width of the bars (0.7 means 70% of the available space)
        categoryPercentage: 0.1, // Adjust the gap between bars (1.0 means no gap)
      },
    ],
  };


 const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Energy consumption data for each day Chart',
    },
  },
};

    return (
        <div>
      <div style={{ width: '90vw', margin: '0 auto' }}>
        <div className="buttons">
        <Button colorScheme='orange' onClick={() => toggleView('day')}>Day</Button>
        <Button colorScheme='orange' onClick={() => toggleView('week')}>Week</Button>
        <Button colorScheme='orange' onClick={() => toggleView('month')}>Month</Button>
        </div>
        <Bar data={chartData} options={chartOptions} />
      </div>
        </div>
    );
}

export default EnergyUsesGraph;