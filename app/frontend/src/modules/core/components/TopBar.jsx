// src/modules/core/components/TopBar.js

import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa'; // Importa el ícono de hamburguesa
import { useNavigate } from 'react-router-dom';
import '../design-system/components/TopBar.scss';

const TopBar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  
  const handleLoginClick = () => {
    navigate('/login'); // Redirige a la página de login
  };

  const handleLogout = () => {
    // Elimina los datos de sesión
    sessionStorage.removeItem('loginData');
    // Redirige a la página de inicio
    navigate('/');
  };

  // Verifica si el usuario está logueado
  const isLoggedIn = !!sessionStorage.getItem('loginData');

  return (
    <Navbar className="topbar">
      <Container fluid>
        <Button variant="outline-light" onClick={toggleSidebar} className="topbar-button">
          <FaBars className="topbar-icon" /> {/* Usa el ícono de hamburguesa */}
        </Button>
        <Navbar.Brand className="topbar-brand">Dashboard Project</Navbar.Brand>
        {isLoggedIn ? (
          <Button variant="outline-light" onClick={handleLogout} className="topbar-login">
            Logout
          </Button>
        ) : (
          <Button variant="outline-light" onClick={handleLoginClick} className="topbar-login">
            Login
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default TopBar;
