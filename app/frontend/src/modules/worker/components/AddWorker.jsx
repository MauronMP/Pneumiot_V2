import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, InputGroup, Row, Col, Toast, ToastContainer } from 'react-bootstrap'; // Import necessary Bootstrap components
import { useNavigate } from 'react-router-dom'; // For navigation after form submission
import axios from 'axios'; // Axios to handle HTTP requests
import { FaUser, FaEnvelope, FaIdCard, FaLock, FaKey, FaUsers } from 'react-icons/fa'; // FontAwesome icons for UI
import config from '../../../config/config';  // Import configuration (API paths)
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook for translations

// Component to add a new worker
const AddWorker = () => {
  const { t } = useTranslation('addWorker'); // Use the 'addWorker' namespace for translations
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
      .catch(err => setError(t('errorFetchingRoles'))); // Use translated error message
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
      setError(t('allFieldsRequired'));
      return false;
    }

    // Validate email format
    if (!emailRegex.test(worker_email)) {
      setError(t('invalidEmail'));
      return false;
    }

    // Validate DNI format
    if (!dniRegex.test(worker_dni)) {
      setError(t('invalidDni'));
      return false;
    }

    // Check if passwords match
    if (passwd !== passwd_confirm) {
      setError(t('passwordsDoNotMatch'));
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
        .catch(err => setError(t('errorCreatingWorker'))); // Use translated error message
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: '50%' }}>
      <Card className="p-4 shadow-sm" style={{ width: '100%' }}>
        <h2 className='mb-4 text-center'>{t('addWorker')}</h2> {/* Título traducido */}
        {error && <Alert variant="danger">{error}</Alert>} {/* Mensaje de error */}

        <Form onSubmit={handleSubmit}>
          <Row>
            {/* Worker Name */}
            <Col md={12}>
              <Form.Group controlId="workerName" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text> {/* Icono */}
                  <Form.Control
                    type="text"
                    placeholder={t('enterName')}
                    name="worker_name"
                    value={formData.worker_name}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Worker Surname */}
            <Col md={12}>
              <Form.Group controlId="workerSurname" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text> {/* Icono */}
                  <Form.Control
                    type="text"
                    placeholder={t('enterSurname')}
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
            {/* Worker Email */}
            <Col md={12}>
              <Form.Group controlId="workerEmail" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaEnvelope /></InputGroup.Text> {/* Icono */}
                  <Form.Control
                    type="email"
                    placeholder={t('enterEmail')}
                    name="worker_email"
                    value={formData.worker_email}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Worker DNI */}
            <Col md={12}>
              <Form.Group controlId="workerDni" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaIdCard /></InputGroup.Text> {/* Icono */}
                  <Form.Control
                    type="text"
                    placeholder={t('enterDni')}
                    name="worker_dni"
                    value={formData.worker_dni}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Worker Role */}
            <Col md={12}>
              <Form.Group controlId="workerRole" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaUsers /></InputGroup.Text> {/* Icono */}
                  <Form.Control
                    as="select"
                    name="worker_role_id"
                    value={formData.worker_role_id || ''}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t('chooseRole')}</option>
                    {roles.map(role => (
                      <option key={role.worker_role_id} value={role.worker_role_id}>
                        {role.worker_role_name}
                      </option>
                    ))}
                  </Form.Control>
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Password */}
            <Col md={12}>
              <Form.Group controlId="passwd" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaLock /></InputGroup.Text> {/* Icono */}
                  <Form.Control
                    type="password"
                    placeholder={t('enterPassword')}
                    name="passwd"
                    value={formData.passwd}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Password Confirm */}
            <Col md={12}>
              <Form.Group controlId="passwdConfirm" className="mb-3">
                <InputGroup>
                  <InputGroup.Text><FaKey /></InputGroup.Text> {/* Icono */}
                  <Form.Control
                    type="password"
                    placeholder={t('confirmPassword')}
                    name="passwd_confirm"
                    value={formData.passwd_confirm}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          {/* Submit Button */}
          <div className="d-flex justify-content-center mt-4">
            <Button variant="primary" type="submit" className="w-25">
              {t('addWorkerButton')}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddWorker;