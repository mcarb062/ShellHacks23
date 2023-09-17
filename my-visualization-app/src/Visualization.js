import React from 'react';
import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

function Visualization({ data }) {
    if (!data || Object.keys(data).length === 0) {
        return <p>Loading data...</p>;
    }

    return (
        <div>
            <DataList title="HD Data" data={data.hd} />
            <DataList title="GS Data" data={data.gs} />
            {/* ... Add similar lines for other datasets ... */}
            
            <DataChart title="HD Data Chart" data={data.hd} />
            <DataChart title="GS Data Chart" data={data.gs} />
            {/* ... Add similar lines for other datasets' charts ... */}
        </div>
    );
}

function DataList({ title, data }) {
    if (!data) {
        return null;
    }

    return (
        <div>
            <h2>{title}</h2>
            <ul>
                {Object.entries(data).map(([key, value], index) => (
                    <li key={index}>
                        {key}: {JSON.stringify(value)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function DataChart({ title, data }) {
    if (!data) {
        return null;
    }

    // Assuming data is in the format: [{x: 'date-string', y: numericValue}, ...]
    // Convert 'date-string' to actual Date object for better visualization
    const formattedData = data.map(entry => ({
        x: new Date(entry.x),
        y: entry.y
    }));

    return (
        <div>
            <h2>{title}</h2>
            <XYPlot xType="time" width={500} height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="Date" />
                <YAxis title="Value" />
                <LineSeries data={formattedData} />
            </XYPlot>
        </div>
    );
}

export default Visualization;
