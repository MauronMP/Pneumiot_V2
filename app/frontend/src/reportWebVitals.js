// Function to report web vitals (performance metrics) to a callback function
const reportWebVitals = onPerfEntry => {
  // Check if the provided 'onPerfEntry' is a function before proceeding
  if (onPerfEntry && onPerfEntry instanceof Function) {
    
    // Dynamically import the 'web-vitals' library to measure performance metrics
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Measure and report various performance metrics
      getCLS(onPerfEntry); // Cumulative Layout Shift (CLS) - Measures visual stability
      getFID(onPerfEntry); // First Input Delay (FID) - Measures interactivity
      getFCP(onPerfEntry); // First Contentful Paint (FCP) - Measures rendering speed
      getLCP(onPerfEntry); // Largest Contentful Paint (LCP) - Measures page load performance
      getTTFB(onPerfEntry); // Time to First Byte (TTFB) - Measures server response time
    });
  }
};

export default reportWebVitals; // Exporting the function for use in other parts of the app
