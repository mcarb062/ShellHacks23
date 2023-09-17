import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Papa from 'papaparse';

const SustainabilityMetricChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch and parse the CSV data
    Papa.parse("/adjusted_sustainability_metric.csv", {
      download: true,
      header: true,
      complete: (result) => {
        // Extract labels and data from CSV rows
        const labels = result.data.map(row => row.Ticker);
        const data = result.data.map(row => parseFloat(row.Adjusted_Sustainability_Metric));

        // Set the chart data state
        setChartData({
          labels: labels,
          datasets: [{
            label: 'Adjusted Sustainability Metric',
            data: data,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
          }]
        });
      }
    });
  }, []);

  // Display a loading message if data isn't loaded yet
  if (!chartData) {
    return <p>Loading...</p>;
  }

  // Render the Bar chart with loaded data
  return <Bar data={chartData} options={{ /* You can customize chart options here if needed */ }} />;
};

export default SustainabilityMetricChart;
