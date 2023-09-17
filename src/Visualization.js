import React, { useState } from 'react';
import ROIChart from './ROIChart';  // Importing the new ROIChart component
import SearchBar from './SearchBar';  // Importing the SearchBar component

function Visualization({ data }) {
    const [searchQuery, setSearchQuery] = useState('');

    if (!data || Object.keys(data).length === 0) {
        return <p>Loading data...</p>;
    }

    const filteredData = {
        hd: filterData(data.hd, searchQuery),
        gs: filterData(data.gs, searchQuery),
        // ... Add similar lines for other datasets ...
    };

    return (
        <div>
            {/* Including the SearchBar component */}
            <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />

            {/* ROIChart to display the line graph */}
            <ROIChart />

            {/* Display the filtered data in a simple format */}
            <div>
                <h3>HD Data</h3>
                <ul>
                    {filteredData.hd.map((entry, index) => (
                        <li key={index}>
                            Date: {entry.date || entry.x}, Value: {entry.value || entry.y}
                        </li>
                    ))}
                </ul>
                <h3>GS Data</h3>
                <ul>
                    {filteredData.gs.map((entry, index) => (
                        <li key={index}>
                            Date: {entry.date || entry.x}, Value: {entry.value || entry.y}
                        </li>
                    ))}
                </ul>
                {/* ... Add similar lines for other datasets ... */}
            </div>
        </div>
    );
}

function filterData(dataset, query) {
    if (!query) return dataset;

    return dataset.filter(entry => 
        entry.company.toLowerCase().includes(query.toLowerCase()) ||
        entry.date === query
    );
}

export default Visualization;
