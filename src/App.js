import React, { Component } from 'react';
import VolatilityChart from './VolatilityChart';
import ROIChart from './ROIChart';
import DescriptionBox from './DescriptionBox';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import SustainabilitySlider from './SustainabilitySlider';
import SearchBar from './SearchBar';
import SustainabilityMetricChart from './SustainabilityMetricChart';
import ESGChart from './ESGChart';  // Import the ESGChart component

const styles = {
  container: {
      margin: '0 auto',
      maxWidth: '1200px',
      padding: '0 20px',
  },
  title: {
      fontSize: '2.5em',
      textAlign: 'center',
      marginBottom: '10px',
      color: '#333',
      fontWeight: 'bold',
      borderBottom: 'none',
  },
  subtitle: {
      fontSize: '1.5em',
      textAlign: 'center',
      marginBottom: '20px',
      color: '#555',
  },
  header: {
      textAlign: 'center',
      marginBottom: '40px',
  },
  searchBar: {
      // Add any styles specific to the SearchBar if needed
  },
  table: {
      width: '100%',
      marginBottom: '40px', // Adds spacing below the table
      borderCollapse: 'collapse',
  },
  tableHeader: {
      backgroundColor: '#136ad5',
  },
  tableRow: {
      '&:nth-of-type(odd)': {
          backgroundColor: '#f2f2f2',
      }
  },
  tableCell: {
      padding: '8px',
      border: '1px solid #ddd', // Light gray border
      textAlign: 'left',
  }
};

class App extends Component {
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
                console.error(`Error fetching data: `, error);
            });
    }

    renderTable() {
      const { jsonData } = this.state;

      if (!jsonData || !jsonData.hd) {
          return null;
      }

      const dates = jsonData.hd.map(entry => entry.x);

      return (
          <table style={styles.table}>
              <thead>
                  <tr style={styles.tableHeader}>
                      <th style={styles.tableCell}>Company</th>
                      {dates.map(date => <th key={date} style={styles.tableCell}>{date}</th>)}
                  </tr>
              </thead>
              <tbody>
                  {Object.keys(jsonData).map(company => (
                      <tr key={company} style={styles.tableRow}>
                          <td style={styles.tableCell}>{company}</td>
                          {dates.map(date => {
                              const entry = jsonData[company].find(e => e.x === date);
                              return (
                                  <td key={date} style={styles.tableCell}>
                                      {entry ? entry.y.toFixed(2) : "-"}
                                  </td>
                              );
                          })}
                      </tr>
                  ))}
              </tbody>
          </table>
      );
  }

    render() {
      return (
          <div style={styles.container}>
              <div style={styles.header}>
                  <h1 style={styles.title}>Beyond Returns: The Sustainability Index</h1>
                  <h2 style={styles.subtitle}>Investment Insight, Redefined: Leverage sustainability scores to refine your investment strategy.</h2>
                  <SearchBar style={styles.searchBar} />
              </div>
              <SustainabilityMetricChart />
              <DescriptionBox />
              <SustainabilitySlider />
              <ROIChart />
              <ESGChart />  {/* Here's the ESGChart component */}
              <VolatilityChart />
              {this.renderTable()}
          </div>
      );
  }
  
  
}

// const styles = {
//   container: {
//       margin: '0 auto',
//       maxWidth: '1200px',
//       padding: '0 20px',
//   },
//   title: {
//       fontSize: '2.5em',
//       textAlign: 'center',
//       marginBottom: '10px', // adjust as needed for spacing between title and subtitle
//       color: '#333',
//       fontWeight: 'bold',
//       borderBottom: 'none', // removing the border to let subtitle be closer
//   },
//   subtitle: {
//       fontSize: '1.5em', // adjust as desired for a subtitle
//       textAlign: 'center',
//       marginBottom: '20px', // spacing between subtitle and the next element
//       color: '#555', // slightly lighter color for subtitle
//   },
//   header: {
//       textAlign: 'center', // centers all content
//       marginBottom: '40px', // spacing below header, adjust as needed
//   },
//   searchBar: {
//       // Add any styles specific to the SearchBar if needed
//   },
//   table: {
//       width: '100%', 
//       borderCollapse: 'collapse',
//       marginTop: '40px', // Space between the chart and the table
//       border: '1px solid #00a78e',  // Using the Average ROI color as the main border
//   },
//   tableHeader: {
//       backgroundColor: '#136ad5', // Using the ESG color for headers
//       color: 'white',  // Text color in headers
//   },
//   tableRow: {
//       borderBottom: '1px solid #00a78e'  // Using the Average ROI color for row separators
//   },
//   tableCell: {
//       padding: '10px',
//       textAlign: 'center',
//   },
// };


export default App;
