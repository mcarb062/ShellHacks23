import React, { Component } from 'react';

class DataFetcher extends Component {
    state = {
        jsonData: {}
    };

    componentDidMount() {
        const tickers = ["hd", "gs", "googl", "goog", "fb", "dis", "cvx", "csco", "crm", "cost", "cmcsa", "cat", "brkb", "amzn", "abt", "aapl", "aap"];

        tickers.forEach(ticker => {
            fetch(`http://127.0.0.1:5011/get-${ticker}-data`)
                .then(response => response.json())
                .then(data => {
                    this.setState(prevState => ({
                        jsonData: {
                            ...prevState.jsonData,
                            [ticker]: data
                        }
                    }));
                })
                .catch(error => {
                    console.error(`Error fetching data for ${ticker}: `, error);
                });
        });
    }

    render() {
        const { jsonData } = this.state;

        if (Object.keys(jsonData).length !== 17) { // If not all data loaded
            return <p>Loading...</p>;
        }

        return (
            <div>
                {Object.entries(jsonData).map(([ticker, data]) => (
                    <div key={ticker}>
                        <h3>{ticker.toUpperCase()} Data</h3>
                        <ul>
                            {data.map((entry, index) => (
                                <li key={index}>
                                    Date: {entry.x}, Value: {entry.y}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    }
}

export default DataFetcher;

