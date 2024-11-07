import React from 'react';
// Importing the ResponsiveBar component from Nivo to render the bar chart
import { ResponsiveBar } from '@nivo/bar';
// Importing a utility function to get colors based on an index_rate_id
import { getColor } from '../../../utils/colorUtils'; // Ensure the import path is correct
// Importing the Legend component to display the chart legend
import Legend from './legend'; 
import { useTranslation } from 'react-i18next'; // Import useTranslation for translations

const BarChart = ({ data }) => {
    const { t } = useTranslation('barChart'); // Initialize the translation function

    // Format the data for Nivo, adapting the structure to what Nivo expects
    const formattedData = data.map(item => ({
        hour: item.hour_time, // The X-axis represents the hour (hour_time)
        average: item.average_measure, // The Y-axis represents the average measure (average_measure)
        color: getColor(item.index_rate_id) // Assign a color based on the index_rate_id
    }));

    return (
        <div style={{ height: 400 }}>
            {/* Add the Legend component for additional context */}
            <Legend /> 
            <ResponsiveBar
                data={formattedData} // Pass the formatted data to the ResponsiveBar component
                keys={['average']} // The key to use for the Y-axis (average values)
                indexBy="hour" // The key to use for the X-axis (the hour)
                margin={{ top: 20, right: 30, bottom: 60, left: 60 }} // Define margins for the chart
                padding={0.3} // Define the spacing between the bars
                colors={d => d.data.color} // Use the color property for each bar's color
                axisBottom={{
                    tickSize: 5, // Size of ticks on the X-axis
                    tickPadding: 5, // Padding between ticks and labels
                    tickRotation: 0, // No rotation for tick labels on the X-axis
                    legend: t('measuresByHour'), // Translated label for the X-axis
                    legendPosition: 'middle', // Position the X-axis legend in the middle
                    legendOffset: 50, // Offset the X-axis legend from the axis
                }}
                axisLeft={{
                    tickSize: 5, // Size of ticks on the Y-axis
                    tickPadding: 5, // Padding between ticks and labels
                    tickRotation: 0, // No rotation for tick labels on the Y-axis
                    legend: t('average'), // Translated label for the Y-axis
                    legendPosition: 'middle', // Position the Y-axis legend in the middle
                    legendOffset: -50, // Offset the Y-axis legend from the axis
                }}
                enableLabel={true} // Enable labels on the bars (set to false if labels are not needed)
                role="application" // Define the role for accessibility (helps screen readers)
                ariaLabel={t('barChartDescription')} // Translated aria label for better accessibility
            />
        </div>
    );
};

// Export the BarChart component for use in other parts of the app
export default BarChart;