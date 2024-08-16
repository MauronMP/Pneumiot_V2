import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa'; // Importa el ícono de hamburguesa
import '../design-system/components/TopBar.scss';

const TopBar = ({ toggleSidebar }) => {
  return (
    <Navbar className="topbar">
      <Container fluid>
        <Button variant="outline-light" onClick={toggleSidebar} className="topbar-button">
          <FaBars className="topbar-icon" /> {/* Usa el ícono de hamburguesa */}
        </Button>
        <Navbar.Brand className="topbar-brand">Dashboard Project</Navbar.Brand>
        <Button variant="outline-light" className="topbar-login">Login</Button>
      </Container>
    </Navbar>
  );
};

export default TopBar;
