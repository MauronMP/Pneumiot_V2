import React, { useEffect } from 'react'; // Import React
import { Navbar, Container, Button, Dropdown } from 'react-bootstrap'; // Importing components from react-bootstrap
import { FaBars } from 'react-icons/fa'; // Importing the FaBars icon for the sidebar toggle button
import { useNavigate } from 'react-router-dom'; // Importing the useNavigate hook from react-router-dom for navigation
import { useTranslation } from 'react-i18next'; // Importing useTranslation hook for translations
import '../design-system/components/TopBar.scss'; // Importing custom styles for the TopBar

// TopBar component receives toggleSidebar as a prop to open/close the sidebar
const TopBar = ({ toggleSidebar }) => {
  const navigate = useNavigate(); // useNavigate hook provides navigation capabilities
  const { i18n, t } = useTranslation('topbar'); // useTranslation hook provides translation capabilities, removed 'topbar' namespace

  // Cambiar idioma y guardar la selección en sessionStorage
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Cambia el idioma
    sessionStorage.setItem('language', lng); // Guardamos el idioma seleccionado en sessionStorage
  };

  // Effect hook that runs on component mount to set the default language to Spanish if not set
  useEffect(() => {
    // Intentar cargar el idioma desde sessionStorage
    const savedLanguage = sessionStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage); // Si ya hay un idioma guardado en la sesión, usarlo
    } else {
      // Si no hay un idioma en sessionStorage, poner 'es' (español) como idioma predeterminado
      i18n.changeLanguage('es');
      sessionStorage.setItem('language', 'es'); // Guardar el idioma español en sessionStorage
    }
  }, [i18n]); // Dependencias: i18n

  // Handle click for login button
  const handleLoginClick = () => {
    navigate('/login'); // Redirect to the login page
  };

  // Handle click for logout button
  const handleLogout = () => {
    sessionStorage.removeItem('loginData'); // Remove login data from session storage
    sessionStorage.removeItem('language'); // Remove language selection when logging out
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
            <strong>{t('projectTitle')}</strong> {/* Translation for project title */}
          </Navbar.Brand>
        </div>

        {/* Right side: Language selection and Login/Logout button */}
        <div className="d-flex align-items-center">
          {/* Language Dropdown */}
          <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="dropdown-language" className="me-3">
              {i18n.language === 'es' ? 'Español' : 'English'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
              <Dropdown.Item onClick={() => changeLanguage('es')}>Español</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Login/Logout button */}
          {isLoggedIn ? (
            <Button variant="outline-light" onClick={handleLogout} className="topbar-login">
              {t('logout')} {/* Translation for logout */}
            </Button>
          ) : (
            <Button variant="outline-light" onClick={handleLoginClick} className="topbar-login">
              {t('login')} {/* Translation for login */}
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default TopBar; // Export the TopBar component for use in other parts of the app
