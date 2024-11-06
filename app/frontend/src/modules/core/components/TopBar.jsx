import React from 'react'; // Import React
import { Navbar, Container, Button } from 'react-bootstrap'; // Importing components from react-bootstrap
import { FaBars } from 'react-icons/fa'; // Importing the FaBars icon for the sidebar toggle button
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom for navigation
import '../design-system/components/TopBar.scss'; // Importing custom styles for the TopBar

// TopBar component receives toggleSidebar as a prop to open/close the sidebar
const TopBar = ({ toggleSidebar }) => {
  const navigate = useNavigate(); // useNavigate hook provides navigation capabilities

  // Handle click for login button
  const handleLoginClick = () => {
    navigate('/login'); // Redirect to the login page
  };

  // Handle click for logout button
  const handleLogout = () => {
    sessionStorage.removeItem('loginData'); // Remove login data from session storage
    navigate('/login'); // Redirect to the login page after logout
  };

  // Handle click for title (home page)
  const handleTitleClick = () => {
    navigate('/'); // Redirect to home page when title is clicked
  };

  // Check if the user is logged in based on session data
  const isLoggedIn = !!sessionStorage.getItem('loginData'); // Check if 'loginData' exists in session storage

  return (
    <Navbar className="topbar shadow-sm py-2" expand="lg"> {/* Apply custom styles and shadow to the navbar */}
      <Container fluid>
        {/* Left side: Hamburger button for toggling the sidebar visibility */}
        <Button variant="outline-light" onClick={toggleSidebar} className="topbar-button me-3">
          <FaBars className="topbar-icon" /> {/* Hamburger icon inside the button */}
        </Button>

        {/* Middle: Branding (title), clickable */}
        <div className="topbar-brand-container mx-auto">
          <Navbar.Brand
            className="topbar-brand text-center"
            onClick={handleTitleClick} // Add onClick to handle redirection to home
            style={{ cursor: 'pointer' }} // Make the title look clickable
          >
            <strong>PneumIOT Monitoring Healthcare Project</strong>
          </Navbar.Brand>
        </div>

        {/* Right side: Login/Logout button */}
        {isLoggedIn ? (
          <Button variant="outline-light" onClick={handleLogout} className="topbar-login">
            Logout {/* Logout button when user is logged in */}
          </Button>
        ) : (
          <Button variant="outline-light" onClick={handleLoginClick} className="topbar-login">
            Login {/* Login button when user is not logged in */}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default TopBar; // Export the TopBar component for use in other parts of the app