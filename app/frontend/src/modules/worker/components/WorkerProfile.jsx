import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Toast, ToastContainer, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaEnvelope, FaIdCard, FaLock, FaUserShield } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../../../config/config';
import { useTranslation } from 'react-i18next';

const WorkerProfile = () => {
  const { t } = useTranslation('workerProfile');
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
          setIsAdmin(workerDetails.worker_role_id === 1);
        })
        .catch(err => {
          console.error('Error fetching worker data', err);
          setToastMessage(t('toastError'));
          setShowToast(true);
        });
    }
  }, [t]);

  useEffect(() => {
    axios.get(`${config.frontendBaseUrl}worker-roles/`)
      .then(response => {
        setRoles(response.data);
      })
      .catch(err => {
        console.error('Error fetching roles', err);
        setToastMessage(t('toastErrorRoles'));
        setShowToast(true);
      });
  }, [t]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    if (validateForm()) {
      axios.put(`${config.frontendBaseUrl}workers/${workerToEdit.worker_id}`, formData)
        .then(response => {
          if (formData.password) {
            return axios.put(`${config.frontendBaseUrl}worker-auths/${workerToEdit.worker_id}`, {
              worker_id: workerToEdit.worker_id,
              passwd_auth: formData.password
            });
          }
        })
        .then(response => {
          setShowToast(true);
          setToastMessage(t('toastSuccess'));
          setTimeout(() => {
            sessionStorage.clear();
            navigate('/login');
          }, 3000);
        })
        .catch(err => {
          setToastMessage(t('toastError'));
          setShowToast(true);
        });
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      alert(t('passwordMismatch'));
      return false;
    }
    if (!formData.worker_name || !formData.worker_email || !formData.worker_dni) {
      alert(t('requiredFields'));
      return false;
    }
    return true;
  };

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
    <div className="container-fluid">
      <Row className="justify-content-center ">
        <Col md={8} lg={6}>
          <Card className="shadow-lg rounded-lg p-5" style={{ backgroundColor: '#f7f7f7' }}>
            <div className="text-center mb-4">
              <h3 className="font-weight-bold text-primary">{userData.worker_name} {userData.worker_surname}</h3>
              <p className="text-muted">{userData.worker_email}</p>
            </div>

            <div className="list-group">
              <div className="list-group-item d-flex align-items-center">
                <FaIdCard size={20} className="text-primary mx-2" />
                <strong>{t('workerDni')}:</strong>
                <span className="text-muted ml-2">{userData.worker_dni}</span>
              </div>
              <div className="list-group-item d-flex align-items-center">
                <FaUserEdit size={20} className="text-primary mx-2" />
                <strong>{t('workerName')}:</strong>
                <span className="text-muted ml-2">{userData.worker_name}</span>
              </div>
              <div className="list-group-item d-flex align-items-center">
                <FaUserEdit size={20} className="text-primary mx-2" />
                <strong>{t('workerSurname')}:</strong>
                <span className="text-muted ml-2">{userData.worker_surname}</span>
              </div>
              <div className="list-group-item d-flex align-items-center">
                <FaEnvelope size={20} className="text-primary mx-2" />
                <strong>{t('workerEmail')}:</strong>
                <span className="text-muted ml-2">{userData.worker_email}</span>
              </div>

              {isAdmin && (
                <div className="list-group-item d-flex align-items-center">
                  <FaUserShield size={20} className="text-primary mx-2" />
                  <strong>{t('role')}:</strong>
                  <span className="text-muted ml-2">{userData.worker_role_id}</span>
                </div>
              )}
            </div>

            <div className="text-center mt-4">
              <Button variant="primary" onClick={() => handleEdit(userData)} className="px-5 py-3">
                <FaUserEdit size={18} /> {t('editProfileButton')}
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t('modalTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-4">
              <Col md={4}>
                <Form.Label><FaIdCard size={20} className="mx-2" /> {t('workerDni')}</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="worker_dni"
                  value={formData.worker_dni}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Form.Label><FaUserEdit size={20} className="mx-2" /> {t('workerName')}</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="worker_name"
                  value={formData.worker_name}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Form.Label><FaUserEdit size={20} className="mx-2" /> {t('workerSurname')}</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="text"
                  name="worker_surname"
                  value={formData.worker_surname}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Form.Label><FaEnvelope size={20} className="mx-2" /> {t('workerEmail')}</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="email"
                  name="worker_email"
                  value={formData.worker_email}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Form.Label><FaLock size={20} className="mx-2" /> {t('password')}</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Form.Label><FaLock size={20} className="mx-2" /> {t('confirmPassword')}</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Form.Label><FaUserShield size={20} className="mx-2" /> {t('workerRole')}</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  as="select"
                  name="worker_role_id"
                  value={formData.worker_role_id}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  {roles.map(role => (
                    <option key={role.worker_role_id} value={role.worker_role_id}>{role.worker_role_name}</option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)} className="px-5 py-2">
            {t('cancelButton')}
          </Button>
          <Button variant="primary" onClick={handleSaveChanges} className="px-5 py-2">
            {t('saveButton')}
          </Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer position="top-end">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default WorkerProfile;
