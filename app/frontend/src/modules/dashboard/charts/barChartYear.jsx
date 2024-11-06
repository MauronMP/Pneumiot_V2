// src/modules/dashboard/charts/barChart.jsx

import React from 'react';
// Importing ResponsiveBar from Nivo for rendering a bar chart
import { ResponsiveBar } from '@nivo/bar';
// Importing a color utility function to assign colors based on index_rate_id
import { getColor } from '../../../utils/colorUtils'; // Make sure to adjust the import path if needed
// Importing the Legend component to display the chart legend
import Legend from './legend'; 

const BarChartYear = ({ data }) => {
    // Array of month names in English
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Format the data to fit Nivo's expected structure
    const formattedData = data.map(item => ({
        month: monthNames[item.month_number - 1], // Map the month number to its name
        average: item.average_measure, // The Y-axis value, which is the average measurement
        color: getColor(item.index_rate_id) // Assign a color based on the index_rate_id
    }));

    return (
        <div style={{ height: 400 }}>
            {/* Adding the Legend component here */}
            <Legend /> 
            <ResponsiveBar
                data={formattedData} // Pass the formatted data to the chart
                keys={['average']} // The keys that represent the data to display on the Y-axis
                indexBy="month" // Use month names for the X-axis
                margin={{ top: 20, right: 30, bottom: 50, left: 60 }} // Define the margins of the chart
                padding={0.3} // Define the spacing between the bars
                colors={d => d.data.color} // Use the color property for each bar's color
                axisBottom={{
                    tickSize: 5, // Size of ticks on the X-axis
                    tickPadding: 5, // Padding between ticks and labels
                    tickRotation: 0, // No rotation for tick labels
                    legendPosition: 'middle', // Position the X-axis legend in the middle
                    legendOffset: 20, // Offset the legend from the axis
                }}
                axisLeft={{
                    tickSize: 5, // Size of ticks on the Y-axis
                    tickPadding: 5, // Padding between ticks and labels
                    tickRotation: 0, // No rotation for Y-axis tick labels
                    legend: 'Average', // Label for the Y-axis (Average measurement)
                    legendPosition: 'middle', // Position the Y-axis legend in the middle
                    legendOffset: -50, // Offset the legend from the Y-axis
                }}
                enableLabel={true} // Enable labels for the bars (set to false if labels are not needed)
                role="application" // Define the role for accessibility
            />
        </div>
    );
};

// Export the BarChartYear component to be used elsewhere in the application
export default BarChartYear;