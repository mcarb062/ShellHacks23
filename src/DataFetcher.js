import React, { Component } from 'react';
import VolatilityChart from './VolatilityChart';
import './App.css';

class DataFetcher extends Component {
    state = {
        jsonData: {}
    };

    componentDidMount() {
        fetch(`http://127.0.0.1:5011/ROI`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    jsonData: data
                });
            })
            .catch(error => {
                console.error(`Error fetching data for: `, error);
            });
    }
    
    renderTable() {
        const { jsonData } = this.state;

        // Extract the unique dates from the jsonData
        const companies = Object.keys(jsonData);
        if (companies.length === 0) return null; // if no companies, return early
        const dates = Object.keys(jsonData[companies[0]]);

        return (
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        {companies.map(company => <th key={company}>{company}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {dates.map(date => (
                        <tr key={date}>
                            <td>{date}</td>
                            {companies.map(company => (
                                <td key={company}>
                                    {Math.round(jsonData[company][date])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div className="App">
                <VolatilityChart />
                {this.renderTable()} {/* Render the table here */}
            </div>
        );
    }
}

export default DataFetcher;


