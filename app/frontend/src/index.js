import React from 'react'; // Importing React to create components
import ReactDOM from 'react-dom/client'; // Importing the ReactDOM client to render components in the DOM
import './index.css'; // Importing custom global CSS styles
import App from './App'; // Importing the main App component
import reportWebVitals from './reportWebVitals'; // Importing the web vitals utility to measure performance
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling and layout
import './i18n';

// Creating a root DOM element where the app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the React application inside the root element
root.render(
  <React.StrictMode> 
    {/* React.StrictMode helps identify potential problems in the app during development */}
    <App /> {/* Rendering the App component */}
  </React.StrictMode>
);

// This function is used to log or send performance metrics from your app (optional)
reportWebVitals(); // Measure performance in the app (logs can be sent to an analytics endpoint or console)
