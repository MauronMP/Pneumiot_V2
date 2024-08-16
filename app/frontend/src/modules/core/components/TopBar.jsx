import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa'; // Importa el ícono de hamburguesa

const TopBar = ({ toggleSidebar }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Button variant="outline-light" onClick={toggleSidebar}>
          <FaBars /> {/* Usa el ícono de hamburguesa */}
        </Button>
        <Navbar.Brand className="mx-auto">Dashboard Project</Navbar.Brand>
        <Button variant="outline-light">Login</Button>
      </Container>
    </Navbar>
  );
};

export default TopBar;
