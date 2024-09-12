// src/modules/auth/components/LoginForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap

const LOGIN_EXPIRY_TIME = 60 * 60 * 1000; // 1 hora en milisegundos

const LoginForm = () => {
  const [emailOrDni, setemailOrDni] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrDni, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Guardar detalles del usuario y permisos en sessionStorage
        const loginData = {
          workerDetails: data.workerDetails,
          workerPermissions: data.workerPermissions,
          loginTimestamp: new Date().getTime(), // Guardar el tiempo actual
        };

        sessionStorage.setItem('loginData', JSON.stringify(loginData));
        console.log(sessionStorage)
        // Redirigir al inicio
        navigate('/');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
    >
      <div
        className="w-100"
        style={{ maxWidth: '400px', marginTop: '10vh' }}
      >
        <h2 className="mb-4 text-center">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Correo/DNI</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email or DNI"
              value={emailOrDni}
              onChange={(e) => setemailOrDni(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Login
          </Button>
          <div className="d-flex justify-content-between align-items-center">
            <span>You don't have an account?</span>
            <Button variant="link" className="p-0">Sign Up</Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default LoginForm;
