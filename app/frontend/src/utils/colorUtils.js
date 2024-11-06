// utils/colorUtils.js

// Function to get a color based on an 'indexRateId' value
export const getColor = (indexRateId) => {
    // Switch statement to return different colors based on the 'indexRateId' value
    switch (indexRateId) {
        case 1:
            return '#90EE90'; // If indexRateId is 1, return green
        case 2:
            return '#6495ED'; // If indexRateId is 2, return a yellow color
        case 3:
            return '#FF6F61'; // If indexRateId is 3, return red
        default:
            return 'gray'; // Default color if the 'indexRateId' does not match any case (e.g., 0, null, etc.)
    }
};