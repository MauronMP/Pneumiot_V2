// src/config/config.js

const config = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL,   // Base URL for API calls
  frontendBaseUrl: process.env.REACT_APP_FRONTEND_BASE_URL,  // Base URL for frontend routes
  apiV1: process.env.REACT_APP_API_V1  // Base URL for frontend routes
};

export default config;
