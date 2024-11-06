// Importing React to use JSX
import React from 'react';

// Defining the functional component 'Legend'
const Legend = () => {
    // Defining an array of legend items with color and label
    const legendItems = [
        { color: '#90EE90', label: 'Excellent' },  // Cornflower Blue
        { color: '#6495ED', label: 'Common' },    // Light Green
        { color: '#FF6F61', label: 'Risky' }      // Coral Red
    ];
    

    return (
        // Container for the legend, styled to align items to the left and add margin
        <div style={{ display: 'flex', justifyContent: 'left', marginBottom: '10px' }}>
            {/* Looping through legendItems and rendering each one */}
            <strong style={{marginLeft: '30px' }}>Color qualifications: </strong>
            {legendItems.map((item, index) => (
                // Each item is wrapped in a div with a flex layout to align items horizontally
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
                    {/* Square div to represent the color, styled dynamically based on the item color */}
                    <div
                        style={{
                            width: '20px', // Setting width of the color box
                            height: '20px', // Setting height of the color box
                            backgroundColor: item.color, // Dynamic color based on the item color
                            border: '1px solid black', // Adding a border to the color box
                            marginRight: '8px' // Adding space between the color box and label
                        }}
                    />
                    {/* Label for the legend item */}
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

// Exporting the 'Legend' component to be used in other files
export default Legend;