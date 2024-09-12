import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';

const SeeWorkers = () => {
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

  // Fetch all workers with their roles
  useEffect(() => {
    axios.get(`http://localhost:3000/api/frontend/workers/with-role/${worker_id}`)
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
    axios.get('http://localhost:3000/api/v1/worker-roles/')
      .then(response => {
        setRoles(response.data);
      })
      .catch(err => {
        console.error('Error fetching roles', err);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter workers based on search term
    const filtered = workers.filter(worker =>
      worker.worker_dni.includes(value) || worker.worker_email.includes(value)
    );
    setFilteredWorkers(filtered);
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

  const validateForm = () => {
    const errors = {};
    const { worker_dni, worker_name, worker_surname, worker_email, password, confirmPassword, worker_role_id } = formData;

    // DNI validation (8 digits + 1 letter)
    if (!/^\d{8}[A-Za-z]$/.test(worker_dni)) {
      errors.worker_dni = 'DNI must be 8 digits followed by a letter';
    }
    
    // Name validation
    if (!worker_name.trim()) {
      errors.worker_name = 'Name is required';
    }
    
    // Surname validation
    if (!worker_surname.trim()) {
      errors.worker_surname = 'Surname is required';
    }
    
    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(worker_email)) {
      errors.worker_email = 'Invalid email address';
    }
    
    // Password validation
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    
    if (!confirmPassword.trim()) {
      errors.confirmPassword = 'Confirm Password is required';
    }
    
    if (password !== confirmPassword) {
      errors.password = 'Passwords do not match';
    }
    
    // Role validation
    if (!worker_role_id) {
      errors.worker_role_id = 'Role is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveChanges = () => {
    if (validateForm()) {
      // First, update the worker data
      axios.put(`http://localhost:3000/api/frontend/workers/${workerToEdit.worker_id}`, formData)
        .then(response => {
          console.log('Worker updated:', response);
  
          // If the password is not empty, update the worker's password
          if (formData.password) {
            console.log(`http://localhost:3000/api/frontend/worker-auths/${workerToEdit.worker_id}`);
            return axios.put(`http://localhost:3000/api/frontend/worker-auths/${workerToEdit.worker_id}`, {
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
          return axios.get(`http://localhost:3000/api/frontend/workers/with-role/${worker_id}`);
        })
        .then(response => {
          setWorkers(response.data);
          setFilteredWorkers(response.data);
          setShowEditModal(false);
        })
        .catch(err => {
          console.error('Error updating worker or password', err);
        });
    }
  };
  

  const handleDelete = (worker) => {
    setWorkerToDelete(worker);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (workerToDelete) {
      axios.delete(`http://localhost:3000/api/frontend/workers/${workerToDelete.worker_id}`)
        .then(response => {
          console.log('Worker deleted:', response);
          setShowDeleteModal(false);
          // Refresh the worker list
          setWorkers(workers.filter(worker => worker.worker_id !== workerToDelete.worker_id));
          setFilteredWorkers(filteredWorkers.filter(worker => worker.worker_id !== workerToDelete.worker_id));
        })
        .catch(err => {
          console.error('Error deleting worker', err);
        });
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleViewDetails = (worker_id) => {
    // Define what happens when viewing details
    console.log(`Viewing details of worker with ID: ${worker_id}`);
    // For example, you could show a modal with details or navigate to a details page
  };

  return (
    <div className="container mt-4">
      <h2>All workers</h2>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Buscar por DNI o Correo"
          aria-label="Buscar por DNI o Correo"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>DNI</th>
            <th>Email</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Role</th>
            <th>Actions</th>
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
              <td className="text-center">
                <div className="d-flex justify-content-between w-100">
                  <Button variant="success" onClick={() => handleViewDetails(worker.worker_id)} className="mx-1 w-100">
                    Details
                  </Button>
                  <Button variant="primary" onClick={() => handleEdit(worker)} className="mx-1 w-100">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(worker)} className="mx-1 w-100">
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {workerToDelete && (
            <>
              <p>Are you sure you want to delete the user:</p>
              <p><strong>{workerToDelete.worker_email}, {workerToDelete.worker_name} {workerToDelete.worker_surname}?</strong></p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Worker Modal */}
      <Modal show={showEditModal} onHide={handleCancelEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Worker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="text"
                name="worker_dni"
                value={formData.worker_dni}
                onChange={handleFormChange}
                isInvalid={!!errors.worker_dni}
              />
              <Form.Control.Feedback type="invalid">{errors.worker_dni}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="worker_name"
                value={formData.worker_name}
                onChange={handleFormChange}
                isInvalid={!!errors.worker_name}
              />
              <Form.Control.Feedback type="invalid">{errors.worker_name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="worker_surname"
                value={formData.worker_surname}
                onChange={handleFormChange}
                isInvalid={!!errors.worker_surname}
              />
              <Form.Control.Feedback type="invalid">{errors.worker_surname}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="worker_email"
                value={formData.worker_email}
                onChange={handleFormChange}
                isInvalid={!!errors.worker_email}
              />
              <Form.Control.Feedback type="invalid">{errors.worker_email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleFormChange}
                isInvalid={!!errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="worker_role_id"
                value={formData.worker_role_id}
                onChange={handleFormChange}
                isInvalid={!!errors.worker_role_id}
              >
                <option value="">Select a role</option>
                {roles.map(role => (
                  <option key={role.worker_role_id} value={role.worker_role_id}>
                    {role.worker_role_name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.worker_role_id}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SeeWorkers;
