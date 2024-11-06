import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, InputGroup, Row, Col, Toast, ToastContainer } from 'react-bootstrap'; // Import necessary Bootstrap components
import { useNavigate } from 'react-router-dom'; // For navigation after form submission
import axios from 'axios'; // Axios to handle HTTP requests
import { FaUser, FaEnvelope, FaIdCard, FaLock, FaKey, FaUsers } from 'react-icons/fa'; // FontAwesome icons for UI
import config from '../../../config/config';  // Import configuration (API paths)

// Component to add a new worker
const AddWorker = () => {
  // State to store roles for workers (e.g., admin, staff, etc.)
  const [roles, setRoles] = useState([]);
  
  // State to store form data entered by the user
  const [formData, setFormData] = useState({
    worker_name: '',
    worker_surname: '',
    worker_email: '',
    worker_dni: '',
    worker_role_id: null,
    passwd: '',
    passwd_confirm: ''
  });
  
  // State to manage error messages
  const [error, setError] = useState('');
  
  // State to control visibility of the success toast notification
  const [showToast, setShowToast] = useState(false);
  
  // Hook to navigate programmatically after form submission
  const navigate = useNavigate();

  // Fetch worker roles when the component mounts
  useEffect(() => {
    axios.get(`${config.frontendBaseUrl}worker-roles/`) // Get roles from the API
      .then(response => setRoles(response.data)) // Store roles in the state
      .catch(err => setError('Error fetching worker roles')); // Handle errors
  }, []);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value // Update form data dynamically
    }));
  };

  // Function to validate the form inputs
  const validateForm = () => {
    const { worker_name, worker_surname, worker_email, worker_dni, worker_role_id, passwd, passwd_confirm } = formData;
    
    // Regular expressions for DNI and email validation
    const dniRegex = /^\d{8}[A-Z]$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check for empty fields
    if (!worker_name || !worker_surname || !worker_email || !worker_dni || !worker_role_id || !passwd || !passwd_confirm) {
      setError('All fields are required!');
      return false;
    }

    // Validate email format
    if (!emailRegex.test(worker_email)) {
      setError('Invalid email!');
      return false;
    }

    // Validate DNI format
    if (!dniRegex.test(worker_dni)) {
      setError('Wrong DNI. It must have 8 digits and one character.');
      return false;
    }

    // Check if passwords match
    if (passwd !== passwd_confirm) {
      setError('Passwords do not match!');
      return false;
    }

    return true; // All validations passed
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // If form is valid, send the data to the server
    if (validateForm()) {
      const dataToSend = {
        worker_dni: formData.worker_dni,
        worker_email: formData.worker_email,
        worker_name: formData.worker_name,
        worker_surname: formData.worker_surname,
        worker_role_id: formData.worker_role_id,
        passwd_auth: formData.passwd
      };

      // Post the new worker data to the backend
      axios.post(`${config.frontendBaseUrl}workers`, dataToSend)
        .then(() => {
          setShowToast(true); // Show success notification
          
          // Redirect to homepage after 2 seconds
          setTimeout(() => {
            navigate('/'); 
          }, 2000);
        })
        .catch(err => setError('There was an error creating the new worker')); // Handle errors
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <Card className="p-4 w-75 shadow-sm">
        <h2 className='mb-4 text-center'>Add New Worker</h2>
        {error && <Alert variant="danger">{error}</Alert>} {/* Display error messages */}

        {/* Form to capture worker details */}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="workerName" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text> {/* Icon for worker name */}
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    name="worker_name"
                    value={formData.worker_name}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="workerSurname" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text> {/* Icon for worker surname */}
                  <Form.Control
                    type="text"
                    placeholder="Enter Surname"
                    name="worker_surname"
                    value={formData.worker_surname}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="workerEmail" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaEnvelope /></InputGroup.Text> {/* Icon for email */}
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    name="worker_email"
                    value={formData.worker_email}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="workerDni" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaIdCard /></InputGroup.Text> {/* Icon for DNI */}
                  <Form.Control
                    type="text"
                    placeholder="Enter DNI"
                    name="worker_dni"
                    value={formData.worker_dni}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="workerRole" className="mb-3">
            <InputGroup>
              <InputGroup.Text><FaUsers /></InputGroup.Text> {/* Icon for worker role */}
              <Form.Control
                as="select"
                name="worker_role_id"
                value={formData.worker_role_id || ''}
                onChange={handleChange}
                required
              >
                <option value="">Choose a role</option>
                {/* Populate roles dropdown */}
                {roles.map(role => (
                  <option key={role.worker_role_id} value={role.worker_role_id}>
                    {role.worker_role_name}
                  </option>
                ))}
              </Form.Control>
            </InputGroup>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group controlId="passwd" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaLock /></InputGroup.Text> {/* Icon for password */}
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    name="passwd"
                    value={formData.passwd}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="passwdConfirm" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaKey /></InputGroup.Text> {/* Icon for password confirmation */}
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="passwd_confirm"
                    value={formData.passwd_confirm}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          {/* Submit button */}
          <Button variant="primary" type="submit" className="w-100 mt-3">
            Add Worker
          </Button>
        </Form>
      </Card>

      {/* Toast notification for successful creation */}
      <ToastContainer position="top-center">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Worker added successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default AddWorker;
