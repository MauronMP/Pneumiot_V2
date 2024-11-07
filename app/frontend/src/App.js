import React, { useEffect } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { TopBar, Footer, Sidebar, useToggle } from './modules/core'; // Importing components and custom hook
import { isSessionExpired } from './utils/authUtils'; // Importing utility function to check session expiry
import AppRoutes from './routes/AppRoutes'; // Importing routing logic for app

// Component that handles the main content layout of the app
const AppContent = () => {
  const [sidebarOpen, toggleSidebar] = useToggle(); // Custom hook to handle the state of the sidebar (open/close)
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // Effect hook that runs on component mount to check if the session has expired
  useEffect(() => {
    if (isSessionExpired()) { // If the session is expired
      sessionStorage.removeItem('loginData'); // Remove login data from session storage
      navigate('/login'); // Redirect user to the login page
    }
  }, [navigate]); // Depend on 'navigate' to re-run the effect when it changes

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}> {/* Container with flex layout and full viewport height */}
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar isOpen={sidebarOpen} /> {/* Sidebar component that receives the state of whether it's open or not */}
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}> {/* Main content container */}
          <TopBar toggleSidebar={toggleSidebar} /> {/* Top bar component with a function to toggle the sidebar */}
          <div style={{ padding: '20px', flexGrow: 1 }}>
            <AppRoutes /> {/* Render the app routes and their respective components */}
          </div>
        </div>
      </div>
      <Footer /> {/* Footer component that remains at the bottom */}
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