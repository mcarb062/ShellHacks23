import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';

function ESGChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/average_esgRev.csv');
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value);
            
            const results = Papa.parse(csv, { header: true });
            const rows = results.data;

            // Updated column names based on your CSV structure
            const labels = rows.map(row => row.Ticker);
            const data = rows.map(row => parseFloat(row.esg_score));

            setChartData({
                labels: labels,
                datasets: [{
                    label: 'ESG Score',
                    data: data,
                    backgroundColor: '#136ad5',
                }]
            });
        }
        fetchData();
    }, []);

    if (!chartData) {
        return <p>Loading data...</p>;
    }

    return (
        <Bar 
            data={chartData} 
            options={{
                title: {
                    display: true,
                    text: 'ESG Score per Company',
                    fontSize: 20
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Companies'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'ESG Score'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }}
        />
    );
}

export default ESGChart;
