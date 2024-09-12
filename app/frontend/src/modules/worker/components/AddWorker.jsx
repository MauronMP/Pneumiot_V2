import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddWorker = () => {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    worker_name: '',
    worker_surname: '',
    worker_email: '',
    worker_dni: '',
    worker_role_id: null,
    passwd: '',
    passwd_confirm: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch worker roles
    axios.get('http://localhost:3000/api/frontend/worker-roles/')
      .then(response => setRoles(response.data))
      .catch(err => setError('Error fetching worker roles'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { worker_name, worker_surname, worker_email, worker_dni, worker_role_id, passwd, passwd_confirm } = formData;
    const dniRegex = /^\d{8}[A-Z]$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!worker_name || !worker_surname || !worker_email || !worker_dni || !worker_role_id || !passwd || !passwd_confirm) {
      setError('All fields are required!');
      return false;
    }
    if (!emailRegex.test(worker_email)) {
      setError('Invalid email!');
      return false;
    }
    if (!dniRegex.test(worker_dni)) {
      setError('Wrong DNI. It must have 8 digits and one character.');
      return false;
    }
    if (passwd !== passwd_confirm) {
      setError('Passwords does not match!');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {

      const dataToSend = {
        worker_dni: formData.worker_dni,
        worker_email: formData.worker_email,
        worker_name: formData.worker_name,
        worker_surname: formData.worker_surname,
        worker_role_id: formData.worker_role_id,
        passwd_auth: formData.passwd
      };

      axios.post('http://localhost:3000/api/frontend/workers', dataToSend)
        .then(() => {
          navigate('/');
        })
        .catch(err => setError('There was an error creating the new worker'));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="w-50">
        <h2 className='mb-4 mt-3'>New worker</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="workerName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              name="worker_name"
              value={formData.worker_name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="workerSurname" className='mt-3'>
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Surname"
              name="worker_surname"
              value={formData.worker_surname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="workerEmail" className='mt-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              name="worker_email"
              value={formData.worker_email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="workerDni" className='mt-3'>
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              placeholder="DNI"
              name="worker_dni"
              value={formData.worker_dni}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="workerRole" className='mt-3'>
            <Form.Label>Rol</Form.Label>
            <Form.Control
              as="select"
              name="worker_role_id"
              value={formData.worker_role_id || ''}
              onChange={handleChange}
            >
              <option value="">Choose a rol</option>
              {roles.map(role => (
                <option key={role.worker_role_id} value={role.worker_role_id}>
                  {role.worker_role_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="passwd" className='mt-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="passwd"
              value={formData.passwd}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="passwdConfirm" className='mt-3'>
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repeat Password"
              name="passwd_confirm"
              value={formData.passwd_confirm}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className='mt-5'>
            Add Worker
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddWorker;
