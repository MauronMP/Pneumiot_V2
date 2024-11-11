import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Card, Col, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config/config';  // Import URL paths for APIs
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { FaKey, FaClipboard, FaUserCog } from 'react-icons/fa';

const CreatePermission = () => {
  const { t } = useTranslation('createPermission'); // Use the 'createPermission' namespace for translations

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
      setErrorMessage(t('permissionNameRequired'));
      return false;
    }

    if (permissionExists) {
      setErrorMessage(t('permissionNameExists'));
      return false;
    }

    if (!worker_role_id) {
      setErrorMessage(t('roleRequired'));
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
        setSuccessMessage(t('permissionCreatedSuccess'));
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
        setErrorMessage(t('permissionCreateError'));
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: '50%' }}>
      <Card className="p-4 shadow-sm" style={{ width: '100%' }}>
      <h2 className='mb-3'>{t('createNewPermission')}</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        
        {/* Permission Name */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formPermissionName">
              <InputGroup>
                <InputGroup.Text><FaKey /></InputGroup.Text> {/* Icono para Permission Name */}
                <Form.Control
                  type="text"
                  name="permission_name"
                  value={formData.permission_name}
                  onChange={handleInputChange}
                  placeholder={t('enterPermissionName')}
                  isInvalid={!!errorMessage}
                />
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
  
        {/* Permission Description */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formPermissionDescription">
              <InputGroup>
                <InputGroup.Text><FaClipboard /></InputGroup.Text> {/* Icono para Permission Description */}
                <Form.Control
                  as="textarea"
                  name="permission_description"
                  rows={3}
                  value={formData.permission_description}
                  onChange={handleInputChange}
                  placeholder={t('enterPermissionDescription')}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
  
        {/* Worker Role Dropdown */}
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="formWorkerRole">
              <InputGroup>
                <InputGroup.Text><FaUserCog /></InputGroup.Text> {/* Icono para Worker Role */}
                <Form.Control
                  as="select"
                  name="worker_role_id"
                  value={formData.worker_role_id}
                  onChange={handleInputChange}
                  isInvalid={!formData.worker_role_id && !!errorMessage}
                >
                  <option value="">{t('chooseRole')}</option>
                  {roles.map(role => (
                    <option key={role.worker_role_id} value={role.worker_role_id}>
                      {role.worker_role_name}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup>
              <Form.Control.Feedback type="invalid">
                {errorMessage}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
  
        {/* Submit Button */}
        <div className="d-flex justify-content-center mt-4">
          <Button variant="primary" type="submit" className="w-25">
            {t('createPermission')}
          </Button>
        </div>
      </Form>
      </Card>
      </div>
  );
  
};

export default CreatePermission;