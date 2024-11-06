import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Toast, ToastContainer, Card, Row, Col } from 'react-bootstrap'; // Importing components from react-bootstrap
import { useNavigate } from 'react-router-dom'; // Importing navigation hooks from react-router
import { FaUserAlt, FaUserEdit, FaEnvelope, FaIdCard, FaLock, FaUserShield } from 'react-icons/fa'; // Importing icons for UI
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import config from '../../../config/config';  // Import URL paths for APIs

const WorkerProfile = () => {
  // State hooks to manage data and UI elements
  const [userData, setUserData] = useState({}); // Store user profile data
  const [roles, setRoles] = useState([]); // Store available roles for dropdown
  const [showEditModal, setShowEditModal] = useState(false); // Manage the visibility of the edit modal
  const [formData, setFormData] = useState({ // Form data for updating profile
    worker_dni: '',
    worker_name: '',
    worker_surname: '',
    worker_email: '',
    password: '',
    confirmPassword: '',
    worker_role_id: ''
  });
  const [workerToEdit, setWorkerToEdit] = useState(null); // Store the worker being edited
  const [isAdmin, setIsAdmin] = useState(false); // Check if the user is an admin
  const [showToast, setShowToast] = useState(false); // Manage toast notification visibility
  const [toastMessage, setToastMessage] = useState(''); // Store toast message
  const navigate = useNavigate(); // Use the navigation hook for page redirection

  useEffect(() => {
    // Fetch login data from sessionStorage
    const storedLoginData = sessionStorage.getItem('loginData');
    if (storedLoginData) {
      const loginData = JSON.parse(storedLoginData);
      const { worker_id } = loginData.workerDetails;

      // Fetch worker details from API
      axios.get(`${config.frontendBaseUrl}workers/${worker_id}`)
        .then(response => {
          const workerDetails = response.data;
          setUserData(workerDetails);
          // Set form data with the fetched worker data
          setFormData({
            worker_dni: workerDetails.worker_dni,
            worker_name: workerDetails.worker_name,
            worker_surname: workerDetails.worker_surname,
            worker_email: workerDetails.worker_email,
            password: '',
            confirmPassword: '',
            worker_role_id: workerDetails.worker_role_id
          });
          // Check if the user has admin privileges based on worker_role_id
          setIsAdmin(workerDetails.worker_role_id === 1);
        })
        .catch(err => {
          console.error('Error fetching worker data', err);
          setToastMessage('Error al cargar datos del trabajador.');
          setShowToast(true);
        });
    }
  }, []); // Run once when the component mounts

  useEffect(() => {
    // Fetch worker roles for dropdown list
    axios.get(`${config.frontendBaseUrl}worker-roles/`)
      .then(response => {
        setRoles(response.data);
      })
      .catch(err => {
        console.error('Error fetching roles', err);
        setToastMessage('Error al cargar roles.');
        setShowToast(true);
      });
  }, []); // Run once when the component mounts

  const handleInputChange = (e) => {
    // Handle form input changes
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    // Validate and save the changes to the worker profile
    if (validateForm()) {
      // Update worker profile data
      axios.put(`${config.frontendBaseUrl}workers/${workerToEdit.worker_id}`, formData)
        .then(response => {
          console.log('Worker updated:', response);

          // If password was updated, update the password too
          if (formData.password) {
            return axios.put(`${config.frontendBaseUrl}worker-auths/${workerToEdit.worker_id}`, {
              worker_id: workerToEdit.worker_id,
              passwd_auth: formData.password
            });
          }
        })
        .then(response => {
          if (response) {
            console.log('Password updated:', response);
          }

          // Show success message and log out the user
          setShowToast(true);
          setToastMessage('Perfil actualizado exitosamente. ¡Inicia sesión de nuevo!');

          setTimeout(() => {
            sessionStorage.clear(); // Clear session data
            navigate('/login'); // Redirect to login page
          }, 3000);
        })
        .catch(err => {
          console.error('Error updating worker or password', err);
          setToastMessage('Error al actualizar datos.');
          setShowToast(true);
        });
    }
  };

  const validateForm = () => {
    // Validate the form fields
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return false;
    }
    if (!formData.worker_name || !formData.worker_email || !formData.worker_dni) {
      alert('Por favor complete todos los campos obligatorios.');
      return false;
    }
    return true;
  };

  const handleEdit = (worker) => {
    // Prepare the data for editing
    setWorkerToEdit(worker);
    setFormData({
      worker_dni: worker.worker_dni,
      worker_name: worker.worker_name,
      worker_surname: worker.worker_surname,
      worker_email: worker.worker_email,
      password: '',
      confirmPassword: '',
      worker_role_id: worker.worker_role_id
    });
    setShowEditModal(true); // Show the edit modal
  };

  return (
    <div className="container mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg rounded-lg p-4">
            <div className="text-center mb-4">
              {/* Display user avatar */}
              <FaUserAlt size={150} color="#007bff" />
              <h3 className="mt-3">{userData.worker_name} {userData.worker_surname}</h3>
              <p className="text-muted">{userData.worker_email}</p>
            </div>
            <Row className="mb-4">
              <Col xs={12} md={6}>
                <p><strong><FaIdCard size={20} className="mr-2" /> DNI:</strong> {userData.worker_dni}</p>
              </Col>
              <Col xs={12} md={6}>
                <p><strong><FaUserEdit size={20} className="mr-2" /> Name:</strong> {userData.worker_name}</p>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col xs={12} md={6}>
                <p><strong><FaUserEdit size={20} className="mr-2" /> Surname:</strong> {userData.worker_surname}</p>
              </Col>
              <Col xs={12} md={6}>
                <p><strong><FaEnvelope size={20} className="mr-2" /> Email:</strong> {userData.worker_email}</p>
              </Col>
            </Row>
            {isAdmin && (
              <Row className="mb-4">
                <Col xs={12}>
                  <p><strong><FaUserShield size={20} className="mr-2" /> Rol:</strong> {userData.worker_role_id}</p>
                </Col>
              </Row>
            )}
            <div className="text-center mt-4">
              <Button variant="primary" size="lg" onClick={() => handleEdit(userData)} className="px-5 py-3">
                <FaUserEdit size={18} /> Edit information
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Modal for editing profile */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Form fields for editing user profile */}
            <Form.Group controlId="workerDNI">
              <Form.Label><FaIdCard size={20} className="mr-2" /> DNI</Form.Label>
              <Form.Control
                type="text"
                name="worker_dni"
                value={formData.worker_dni}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="workerName">
              <Form.Label><FaUserEdit size={20} className="mr-2" /> Name</Form.Label>
              <Form.Control
                type="text"
                name="worker_name"
                value={formData.worker_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="workerSurname">
              <Form.Label><FaUserEdit size={20} className="mr-2" /> Surname</Form.Label>
              <Form.Control
                type="text"
                name="worker_surname"
                value={formData.worker_surname}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="workerEmail">
              <Form.Label><FaEnvelope size={20} className="mr-2" /> Email</Form.Label>
              <Form.Control
                type="email"
                name="worker_email"
                value={formData.worker_email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            {isAdmin && (
              <Form.Group controlId="workerRole">
                <Form.Label><FaUserShield size={20} className="mr-2" /> Rol</Form.Label>
                <Form.Control
                  as="select"
                  name="worker_role_id"
                  value={formData.worker_role_id}
                  onChange={handleInputChange}
                >
                  {roles.map((role) => (
                    <option key={role.worker_role_id} value={role.worker_role_id}>
                      {role.worker_role_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}

            <Form.Group controlId="password">
              <Form.Label><FaLock size={20} className="mr-2" /> Nueva Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label><FaLock size={20} className="mr-2" /> Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className="text-center mt-4">
              <Button variant="success" size="lg" onClick={handleSaveChanges}>
                Guardar Cambios
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Toast for notifications */}
      <ToastContainer position="top-center">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default WorkerProfile;