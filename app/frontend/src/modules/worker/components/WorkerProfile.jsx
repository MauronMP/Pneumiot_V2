import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Toast, ToastContainer, Card, Row, Col } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom'; 
import { FaUserAlt, FaUserEdit, FaEnvelope, FaIdCard, FaLock, FaUserShield } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import config from '../../../config/config';  
import { useTranslation } from 'react-i18next'; // Importamos el hook useTranslation para las traducciones

const WorkerProfile = () => {
  const { t } = useTranslation('workerProfile'); // Inicializamos el hook de traducción
  const [userData, setUserData] = useState({});
  const [roles, setRoles] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    worker_dni: '',
    worker_name: '',
    worker_surname: '',
    worker_email: '',
    password: '',
    confirmPassword: '',
    worker_role_id: ''
  });
  const [workerToEdit, setWorkerToEdit] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  // Cargamos los datos del trabajador cuando se monta el componente
  useEffect(() => {
    const storedLoginData = sessionStorage.getItem('loginData');
    if (storedLoginData) {
      const loginData = JSON.parse(storedLoginData);
      const { worker_id } = loginData.workerDetails;

      axios.get(`${config.frontendBaseUrl}workers/${worker_id}`)
        .then(response => {
          const workerDetails = response.data;
          setUserData(workerDetails);
          setFormData({
            worker_dni: workerDetails.worker_dni,
            worker_name: workerDetails.worker_name,
            worker_surname: workerDetails.worker_surname,
            worker_email: workerDetails.worker_email,
            password: '',
            confirmPassword: '',
            worker_role_id: workerDetails.worker_role_id
          });
          setIsAdmin(workerDetails.worker_role_id === 1); // Verificamos si es administrador
        })
        .catch(err => {
          console.error('Error fetching worker data', err);
          setToastMessage(t('toastError')); // Mostramos mensaje de error
          setShowToast(true);
        });
    }
  }, [t]);

  // Cargamos los roles disponibles para los trabajadores
  useEffect(() => {
    axios.get(`${config.frontendBaseUrl}worker-roles/`)
      .then(response => {
        setRoles(response.data);
      })
      .catch(err => {
        console.error('Error fetching roles', err);
        setToastMessage(t('toastErrorRoles')); // Mostramos mensaje de error en roles
        setShowToast(true);
      });
  }, [t]);

  // Función que maneja los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Guardamos los cambios en el perfil del trabajador
  const handleSaveChanges = () => {
    if (validateForm()) {
      axios.put(`${config.frontendBaseUrl}workers/${workerToEdit.worker_id}`, formData)
        .then(response => {
          console.log('Worker updated:', response);
          // Si se cambió la contraseña, también actualizamos la contraseña
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

          // Mostramos el mensaje de éxito y redirigimos
          setShowToast(true);
          setToastMessage(t('toastSuccess')); // Mensaje de éxito

          setTimeout(() => {
            sessionStorage.clear();
            navigate('/login');
          }, 3000);
        })
        .catch(err => {
          console.error('Error updating worker or password', err);
          setToastMessage(t('toastError')); // Mostramos mensaje de error
          setShowToast(true);
        });
    }
  };

  // Validamos los campos del formulario antes de guardar los cambios
  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      alert(t('passwordMismatch')); // Validamos que las contraseñas coincidan
      return false;
    }
    if (!formData.worker_name || !formData.worker_email || !formData.worker_dni) {
      alert(t('requiredFields')); // Verificamos que los campos requeridos estén completos
      return false;
    }
    return true;
  };

  // Mostramos el modal para editar el perfil del trabajador
  const handleEdit = (worker) => {
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
    setShowEditModal(true);
  };

  return (
    <div className="container mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg rounded-lg p-4">
            <div className="text-center mb-4">
              <FaUserAlt size={150} color="#007bff" />
              <h3 className="mt-3">{userData.worker_name} {userData.worker_surname}</h3>
              <p className="text-muted">{userData.worker_email}</p>
            </div>
            <Row className="mb-4">
              <Col xs={12} md={6}>
                <p><strong><FaIdCard size={20} className="mr-2" /> {t('workerDni')}:</strong> {userData.worker_dni}</p>
              </Col>
              <Col xs={12} md={6}>
                <p><strong><FaUserEdit size={20} className="mr-2" /> {t('workerName')}:</strong> {userData.worker_name}</p>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col xs={12} md={6}>
                <p><strong><FaUserEdit size={20} className="mr-2" /> {t('workerSurname')}:</strong> {userData.worker_surname}</p>
              </Col>
              <Col xs={12} md={6}>
                <p><strong><FaEnvelope size={20} className="mr-2" /> {t('workerEmail')}:</strong> {userData.worker_email}</p>
              </Col>
            </Row>
            {isAdmin && (
              <Row className="mb-4">
                <Col xs={12}>
                  <p><strong><FaUserShield size={20} className="mr-2" /> {t('role')}:</strong> {userData.worker_role_id}</p>
                </Col>
              </Row>
            )}
            <div className="text-center mt-4">
              <Button variant="primary" size="lg" onClick={() => handleEdit(userData)} className="px-5 py-3">
                <FaUserEdit size={18} /> {t('editProfileButton')}
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Modal para editar el perfil */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('modalTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="workerDNI">
              <Form.Label><FaIdCard size={20} className="mr-2" /> {t('workerDni')}</Form.Label>
              <Form.Control
                type="text"
                name="worker_dni"
                value={formData.worker_dni}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="workerName">
              <Form.Label><FaUserEdit size={20} className="mr-2" /> {t('workerName')}</Form.Label>
              <Form.Control
                type="text"
                name="worker_name"
                value={formData.worker_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="workerSurname">
              <Form.Label><FaUserEdit size={20} className="mr-2" /> {t('workerSurname')}</Form.Label>
              <Form.Control
                type="text"
                name="worker_surname"
                value={formData.worker_surname}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="workerEmail">
              <Form.Label><FaEnvelope size={20} className="mr-2" /> {t('workerEmail')}</Form.Label>
              <Form.Control
                type="email"
                name="worker_email"
                value={formData.worker_email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="newPassword">
              <Form.Label><FaLock size={20} className="mr-2" /> {t('newPassword')}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label><FaLock size={20} className="mr-2" /> {t('confirmPassword')}</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="workerRole">
              <Form.Label><FaUserShield size={20} className="mr-2" /> {t('role')}</Form.Label>
              <Form.Control
                as="select"
                name="worker_role_id"
                value={formData.worker_role_id}
                onChange={handleInputChange}
              >
                {roles.map(role => (
                  <option key={role.worker_role_id} value={role.worker_role_id}>{role.worker_role_name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            {t('cancel')}
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            {t('saveChanges')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast notifications */}
      <ToastContainer position="top-center" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)}>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default WorkerProfile;
