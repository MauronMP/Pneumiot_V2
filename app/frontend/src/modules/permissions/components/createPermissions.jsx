import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config/config';  // Import URL paths for apis

const CreatePermission = () => {
  const [formData, setFormData] = useState({
    permission_name: '',
    permission_description: '',
    worker_role_id: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [existingPermissions, setExistingPermissions] = useState([]);
  const [roles, setRoles] = useState([]);

  // Fetch existing permissions and worker roles
  useEffect(() => {
    // Fetch existing permissions
    axios.get(`${config.apiV1}permissions`)
      .then(response => setExistingPermissions(response.data))
      .catch(err => console.error('Error fetching permissions:', err));

    // Fetch worker roles for dropdown
    axios.get(`${config.frontendBaseUrl}worker-roles/`)
      .then(response => setRoles(response.data))
      .catch(err => console.error('Error fetching worker roles:', err));
  }, []);

  // Handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate the form before submission
  const validateForm = () => {
    const { permission_name, worker_role_id } = formData;

    // Check if the permission name already exists
    const permissionExists = existingPermissions.some(
      (perm) => perm.permission_name.toLowerCase() === permission_name.toLowerCase()
    );

    if (!permission_name.trim()) {
      setErrorMessage('Permission name cannot be empty.');
      return false;
    }

    if (permissionExists) {
      setErrorMessage('Permission name already exists. Please choose a different name.');
      return false;
    }

    if (!worker_role_id) {
      setErrorMessage('Please select a role to assign this permission.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Step 1: Create the new permission
      axios.post(`${config.frontendBaseUrl}permissions`, {
        permission_name: formData.permission_name,
        permission_description: formData.permission_description
      })
      .then(response => {
        const createdPermissionId = response.data.permission_id; // Capture the created permission ID
        console.log('Permission created:', response);

        // Step 2: Assign the permission to the selected role
        return axios.post(`${config.frontendBaseUrl}role-permissions/`, {
          worker_role_id: formData.worker_role_id,
          permission_id: createdPermissionId
        });
      })
      .then(() => {
        setSuccessMessage('Permission created and assigned to role successfully!');
        setFormData({
          permission_name: '',
          permission_description: '',
          worker_role_id: ''
        });
        
        // Refresh the list of existing permissions
        return axios.get(`${config.apiV1}permissions`);
      })
      .then(response => {
        setExistingPermissions(response.data);
      })
      .catch(err => {
        console.error('Error creating or assigning permission', err);
        setErrorMessage('Failed to create and assign permission. Please try again.');
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create New Permission</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPermissionName">
          <Form.Label>Permission Name</Form.Label>
          <Form.Control
            type="text"
            name="permission_name"
            value={formData.permission_name}
            onChange={handleInputChange}
            placeholder="Enter permission name"
            isInvalid={!!errorMessage}
          />
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPermissionDescription" className="mt-3">
          <Form.Label>Permission Description</Form.Label>
          <Form.Control
            as="textarea"
            name="permission_description"
            rows={3}
            value={formData.permission_description}
            onChange={handleInputChange}
            placeholder="Enter permission description"
          />
        </Form.Group>

        {/* Role Dropdown */}
        <Form.Group controlId="formWorkerRole" className="mt-3">
          <Form.Label>Assign to Role</Form.Label>
          <Form.Control
            as="select"
            name="worker_role_id"
            value={formData.worker_role_id}
            onChange={handleInputChange}
            isInvalid={!formData.worker_role_id && !!errorMessage}
          >
            <option value="">Choose a role</option>
            {roles.map(role => (
              <option key={role.worker_role_id} value={role.worker_role_id}>
                {role.worker_role_name}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Create Permission
        </Button>
      </Form>
    </div>
  );
};

export default CreatePermission;
