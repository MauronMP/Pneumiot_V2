import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUserCog, FaUser, FaUserPlus, FaRegEye, FaRegEdit, FaMicrochip, FaClipboardList, FaIdCard } from 'react-icons/fa';
import { MdDevicesOther } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const NavBar = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation('navbar');
  const [expanded, setExpanded] = useState(false);

  // Load user session data
  const loginData = sessionStorage.getItem('loginData');
  const user = loginData ? JSON.parse(loginData) : null;
  const workerRole = user?.workerDetails?.worker_role_name;

  // Language change function
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    sessionStorage.setItem('language', lng);
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('loginData');
    sessionStorage.removeItem('language');
    navigate('/login');
  };

  useEffect(() => {
    const savedLanguage = sessionStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      i18n.changeLanguage('es');
      sessionStorage.setItem('language', 'es');
    }
  }, [i18n]);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded} onToggle={() => setExpanded(!expanded)}>
      <Container fluid>
        <Navbar.Brand href="/" onClick={() => navigate('/')} className="fw-bold text-uppercase">
          {t('projectTitle')}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {/* Admin Panel - Only visible for admin role */}
            {workerRole === 'admin' && (
              <NavDropdown title={<><FaUserCog className="me-2" /> {t('adminPanel')}</>} id="admin-panel-dropdown" menuVariant="dark">
                <NavDropdown.Item onClick={() => navigate('/see-worker')}>
                  <FaRegEye className="me-2" /> {t('seeWorkers')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/add-worker')}>
                  <FaUserPlus className="me-2" /> {t('addWorkers')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/see-permissions')}>
                  <FaRegEye className="me-2" /> {t('seePermissions')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/create-permissions')}>
                  <FaRegEdit className="me-2" /> {t('createPermissions')}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate('/logs')}>
                  <FaClipboardList className="me-2" /> {t('logs')}
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {/* Patients Section */}
            <NavDropdown title={<><FaUser className="me-2" /> {t('patients')}</>} id="patients-dropdown" menuVariant="dark">
              {workerRole === 'admin' && (
                <NavDropdown.Item onClick={() => navigate('/add-patient')}>
                  <FaUserPlus className="me-2" /> {t('addPatient')}
                </NavDropdown.Item>
              )}
              <NavDropdown.Item onClick={() => navigate('/patients')}>
                <FaRegEye className="me-2" /> {t('seePatient')}
              </NavDropdown.Item>
            </NavDropdown>

            {/* Devices Section */}
            <Nav.Link onClick={() => navigate('/board-with-sensors')} className="d-flex align-items-center">
              <MdDevicesOther className="me-2" /> {t('devices')}
            </Nav.Link>

            {/* Sensors Section */}
            <NavDropdown title={<><FaMicrochip className="me-2" /> {t('sensors')}</>} id="sensors-dropdown" menuVariant="dark">
              {workerRole === 'admin' && (
                <NavDropdown.Item onClick={() => navigate('/add-sensors')}>
                  <FaRegEdit className="me-2" /> {t('addSensor')}
                </NavDropdown.Item>
              )}
              <NavDropdown.Item onClick={() => navigate('/sensors')}>
                <FaRegEye className="me-2" /> {t('seeSensors')}
              </NavDropdown.Item>
            </NavDropdown>

            {/* Profile Section */}
            <Nav.Link onClick={() => navigate('/profile')} className="d-flex align-items-center">
              <FaIdCard className="me-2" /> {t('profile')}
            </Nav.Link>
          </Nav>

          {/* Right side - Language Selection and Logout */}
          <Nav className="ms-auto">
            <NavDropdown title={i18n.language === 'es' ? 'Español' : 'English'} id="language-dropdown" menuVariant="dark">
              <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('es')}>Español</NavDropdown.Item>
            </NavDropdown>
            <Button variant="outline-light" onClick={handleLogout} className="ms-2">
              {t('logout')}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
