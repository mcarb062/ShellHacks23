import React, { Component } from 'react';

class DataFetcher extends Component {
    state = {
        jsonData: {}
    };

    componentDidMount() {
        const filePrefixes = ["hd", "gs", "googl", "goog", "fb", "dis", "cvx", "csco", "crm", "cost", "cmcsa", "cat", "brkb", "amzn", "abt", "aapl", "aap"];

        filePrefixes.forEach(prefix => {
            fetch(`http://127.0.0.1:5011/get-${prefix}-data`)
                .then(response => response.json())
                .then(data => {
                    this.setState(prevState => ({
                        jsonData: {
                            ...prevState.jsonData,
                            [prefix]: data
                        }
                    }));
                })
                .catch(error => {
                    console.error(`Error fetching data for ${prefix}: `, error);
                });
        });
    }

    render() {
        // Now you'll want to pass this data to your visualization component.
        return (
            <div>
                {/* For simplicity, let's assume your visualization component is named `Visualization` */}
                <Visualization data={this.state.jsonData} />
            </div>
        );
    }
}

export default DataFetcher;
