import React, { useState } from 'react';  // Import React and useState hook for managing form state
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook to handle redirection after login
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';  // Import Bootstrap components for UI
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap CSS is applied
import config from '../../../config/config';  // Import URL paths for apis
import { useTranslation } from 'react-i18next'; 

const LoginForm = () => {
  const [emailOrDni, setemailOrDni] = useState('');  // State to store the email or DNI entered by the user
  const [password, setPassword] = useState('');  // State to store the password entered by the user
  const [error, setError] = useState('');  // State to store any error message that occurs during login
  const navigate = useNavigate();  // useNavigate hook for redirecting to another route (home after login)
  const { t } = useTranslation('login');

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the default form submit behavior

    try {
      // Send the login request to the backend API
      const response = await fetch(`${config.apiBaseUrl}login/login`, {
        method: 'POST',  // Using POST method for login
        headers: {
          'Content-Type': 'application/json',  // Indicate we're sending JSON
        },
        body: JSON.stringify({ emailOrDni, password }),  // Send email/DNI and password in the request body
      });

      // Parse the response JSON
      const data = await response.json();

      if (response.ok) {
        // If login is successful, save user details and permissions in sessionStorage
        const loginData = {
          workerDetails: data.workerDetails,  // Store worker details
          workerPermissions: data.workerPermissions,  // Store worker permissions
          loginTimestamp: new Date().getTime(),  // Store the current time of login
        };

        // Save the login data in sessionStorage (to persist the session across page reloads)
        sessionStorage.setItem('loginData', JSON.stringify(loginData));
        console.log(sessionStorage);  // Optional: Log the sessionStorage content for debugging

        // Redirect to the home page after successful login
        navigate('/');
      } else {
        // If login fails, display the error message returned from the server
        setError(data.message || t('loginFailed'));
      }
    } catch (error) {
      console.error('Error:', error);  // Log any errors that occur during the request
      setError(t('errorOccurred')); // Display a generic error message
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
        <Card className="shadow-lg p-4">
          <h2 className="mb-4 text-center">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>{t('emailOrDni')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('enterEmailOrDni')}
                value={emailOrDni}
                onChange={(e) => setemailOrDni(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>{t('password')}</Form.Label> 
              <Form.Control
                type="password"
                placeholder={t('enterPassword')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
             {t('login')}
            </Button>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default LoginForm;