import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Bar } from 'react-chartjs-2';

function VolatilityChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/average_volatilityRev.csv');
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder('utf-8');
            const csv = decoder.decode(result.value);
            
            const results = Papa.parse(csv, { header: true });
            const rows = results.data;

            // Extracting Tickers and their corresponding average volatility values
            const labels = rows.map(row => row.Ticker);
            const data = rows.map(row => parseFloat(row.average_volatility));

            setChartData({
                labels: labels,
                datasets: [{
                    label: 'Average Volatility',
                    data: data,
                    backgroundColor: '#ff6b6b',
                    borderColor: '#ff6b6b'
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
                    text: 'Average Volatility per Company',
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
                            labelString: 'Average Volatility'
                        }
                    }]
                }
            }}
        />
    );
}

export default VolatilityChart;

