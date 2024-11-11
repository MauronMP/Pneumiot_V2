import React, { useEffect } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { NavBar, Footer } from './modules/core'; // Importing components and custom hook
import { isSessionExpired } from './utils/authUtils'; // Importing utility function to check session expiry
import AppRoutes from './routes/AppRoutes'; // Importing routing logic for app

// Component that handles the main content layout of the app
const AppContent = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // Effect hook that runs on component mount to check if the session has expired
  useEffect(() => {
    if (isSessionExpired()) { // If the session is expired
      sessionStorage.removeItem('loginData'); // Remove login data from session storage
      navigate('/login'); // Redirect user to the login page
    }
  }, [navigate]); // Depend on 'navigate' to re-run the effect when it changes

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar /> {/* Navbar remains at the top */}
      {/* Contenedor para centrar el contenido */}
      <div className="d-flex flex-grow-1 justify-content-center align-items-center">
        <AppRoutes /> {/* Main content goes here */}
      </div>
      <Footer /> {/* Footer stays at the bottom */}
    </div>
  );
};

// Main app component that wraps the entire app with a router for navigation
const App = () => (
  <Router>
    <AppContent /> {/* Rendering the AppContent inside the Router */}
  </Router>
);

export default App; // Exporting the App component as the default export