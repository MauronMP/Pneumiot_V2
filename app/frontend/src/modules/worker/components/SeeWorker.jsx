import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, Modal, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config/config';  // Import URL paths for APIs
import { useTranslation } from 'react-i18next';  // Import i18next
import { FaIdCard, FaUserEdit, FaEnvelope, FaLock, FaUserShield } from 'react-icons/fa'; // Import icons

const SeeWorkers = () => {
  const { t } = useTranslation('seeWorker');  // Hook for translations

  // State to manage workers data, search term, filtered workers, modals, and form data
  const [workers, setWorkers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [workerToDelete, setWorkerToDelete] = useState(null);
  const [workerToEdit, setWorkerToEdit] = useState(null);
  const [formData, setFormData] = useState({
    worker_dni: '',
    worker_name: '',
    worker_surname: '',
    worker_email: '',
    password: '',
    confirmPassword: '',
    worker_role_id: ''
  });
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const loginData = sessionStorage.getItem('loginData');
  const user = loginData ? JSON.parse(loginData) : null;
  const worker_id = user?.workerDetails?.worker_id;

  // Fetch all workers with their roles when the component mounts
  useEffect(() => {
    axios.get(`${config.frontendBaseUrl}workers/with-role/${worker_id}`)
      .then(response => {
        setWorkers(response.data);
        setFilteredWorkers(response.data); // Initially show all workers
      })
      .catch(err => {
        console.error('Error fetching workers', err);
      });
  }, [worker_id]);

  // Fetch roles for the dropdown
  useEffect(() => {
    axios.get(`${config.apiV1}worker-roles/`)
      .then(response => {
        setRoles(response.data);  // Store roles for the select dropdown
      })
      .catch(err => {
        console.error('Error fetching roles', err);
      });
  }, []);

  // Search function to filter workers by DNI or Email
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter workers based on the search term
    const filtered = workers.filter(worker =>
      worker.worker_dni.includes(value) || worker.worker_email.includes(value)
    );
    setFilteredWorkers(filtered);
  };

  // Set up form to edit the selected worker
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
    setShowEditModal(true);  // Show the edit modal
  };

  // Validate form fields before submitting
  const validateForm = () => {
    const errors = {};
    const { worker_dni, worker_name, worker_surname, worker_email, password, confirmPassword, worker_role_id } = formData;

    // Validate DNI: must be 8 digits followed by a letter
    if (!/^\d{8}[A-Za-z]$/.test(worker_dni)) {
      errors.worker_dni = t('dniValidationError');
    }

    // Validate Name
    if (!worker_name.trim()) {
      errors.worker_name = t('nameRequired');
    }

    // Validate Surname
    if (!worker_surname.trim()) {
      errors.worker_surname = t('surnameRequired');
    }

    // Validate Email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(worker_email)) {
      errors.worker_email = t('emailValidationError');
    }

    // Validate Password
    if (!password.trim()) {
      errors.password = t('passwordRequired');
    }

    // Validate Confirm Password
    if (!confirmPassword.trim()) {
      errors.confirmPassword = t('confirmPasswordRequired');
    }

    if (password !== confirmPassword) {
      errors.password = t('passwordMismatch');
    }

    // Validate Role
    if (!worker_role_id) {
      errors.worker_role_id = t('roleRequired');
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;  // Return true if no errors
  };

  // Handle the save changes action for editing worker details
  const handleSaveChanges = () => {
    if (validateForm()) {
      // Update worker details first
      axios.put(`${config.frontendBaseUrl}workers/${workerToEdit.worker_id}`, formData)
        .then(response => {
          console.log('Worker updated:', response);

          // If password is updated, update the worker's password too
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

          // Refresh the worker list
          return axios.get(`${config.frontendBaseUrl}workers/with-role/${worker_id}`);
        })
        .then(response => {
          setWorkers(response.data);
          setFilteredWorkers(response.data);
          setShowEditModal(false);  // Close the edit modal
        })
        .catch(err => {
          console.error('Error updating worker or password', err);
        });
    }
  };

  // Handle the delete action for a selected worker
  const handleDelete = (worker) => {
    setWorkerToDelete(worker);
    setShowDeleteModal(true);  // Show the delete confirmation modal
  };

  // Confirm worker deletion
  const handleConfirmDelete = () => {
    if (workerToDelete) {
      axios.delete(`${config.frontendBaseUrl}workers/${workerToDelete.worker_id}`)
        .then(response => {
          console.log('Worker deleted:', response);
          setShowDeleteModal(false);  // Close the delete modal
          // Remove the deleted worker from the list
          setWorkers(workers.filter(worker => worker.worker_id !== workerToDelete.worker_id));
          setFilteredWorkers(filteredWorkers.filter(worker => worker.worker_id !== workerToDelete.worker_id));
        })
        .catch(err => {
          console.error('Error deleting worker', err);
        });
    }
  };

  // Cancel delete action
  const handleCancelDelete = () => {
    setShowDeleteModal(false);  // Close the delete modal without performing the action
  };

  // Cancel edit action
  const handleCancelEdit = () => {
    setShowEditModal(false);  // Close the edit modal without saving
  };

  // Handle changes in the form inputs
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <Row className="mb-4 align-items-center">
        {/* Título que ocupa 1/3 del espacio */}
        <Col xs={12} md={3}>
          <h3 className="text-start">{t('allWorkers')}</h3>
        </Col>

        {/* Barra de búsqueda que ocupa 2/3 del espacio */}
        <Col xs={12} md={9}>
          <InputGroup>
            <Form.Control
              placeholder={t('searchPlaceholder')}
              aria-label={t('searchAriaLabel')}
              aria-describedby="basic-addon2"
              value={searchTerm}
              onChange={handleSearch}  // Search handler
            />
          </InputGroup>
        </Col>
      </Row>


      {/* Workers Table */}
      <Table striped bordered hover responsive="md">
        <thead className="table-dark">
          <tr>
            <th>{t('dni')}</th>
            <th>{t('email')}</th>
            <th>{t('name')}</th>
            <th>{t('surname')}</th>
            <th>{t('role')}</th>
            <th>{t('actions')}</th>
          </tr>
        </thead>
        <tbody>
          {filteredWorkers.map(worker => (
            <tr key={worker.worker_id}>
              <td>{worker.worker_dni}</td>
              <td>{worker.worker_email}</td>
              <td>{worker.worker_name}</td>
              <td>{worker.worker_surname}</td>
              <td>{worker.worker_role_name}</td>
              <td>
                <div className="d-flex gap-2">
                  <Button variant="primary" onClick={() => handleEdit(worker)} className="mx-1 w-100">
                    {t('edit')}
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(worker)} className="mx-1 w-100">
                    {t('delete')}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={handleCancelDelete}
        centered  // Esto centra el modal en la pantalla
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('deleteConfirmation')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('deleteWorkerConfirmation')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            {t('cancel')}
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            {t('delete')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Worker Modal */}
      <Modal show={showEditModal} onHide={handleCancelEdit} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t('editWorker')}</Modal.Title>
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
                  onChange={handleFormChange}
                  isInvalid={!!errors.worker_dni}
                />
                <Form.Control.Feedback type="invalid">{errors.worker_dni}</Form.Control.Feedback>
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
                  onChange={handleFormChange}
                  isInvalid={!!errors.worker_name}
                />
                <Form.Control.Feedback type="invalid">{errors.worker_name}</Form.Control.Feedback>
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
                  onChange={handleFormChange}
                  isInvalid={!!errors.worker_surname}
                />
                <Form.Control.Feedback type="invalid">{errors.worker_surname}</Form.Control.Feedback>
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
                  onChange={handleFormChange}
                  isInvalid={!!errors.worker_email}
                />
                <Form.Control.Feedback type="invalid">{errors.worker_email}</Form.Control.Feedback>
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
                  onChange={handleFormChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
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
                  onChange={handleFormChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
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
                  onChange={handleFormChange}
                  isInvalid={!!errors.worker_role_id}
                >
                  <option value="">{t('selectRole')}</option>
                  {roles.map(role => (
                    <option key={role.worker_role_id} value={role.worker_role_id}>
                      {role.worker_role_name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.worker_role_id}</Form.Control.Feedback>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelEdit}>
            {t('cancel')}
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            {t('saveChanges')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SeeWorkers;