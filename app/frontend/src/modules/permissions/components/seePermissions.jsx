import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';

const SeePermissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPermissions, setFilteredPermissions] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [permissionToEdit, setPermissionToEdit] = useState(null);
  const [permissionUsers, setPermissionUsers] = useState([]);
  const [formData, setFormData] = useState({
    permission_name: '',
    permission_description: ''
  });

  // Fetch all permissions on component mount
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/permissions')
      .then(response => {
        setPermissions(response.data);
        setFilteredPermissions(response.data); // Initially show all permissions
      })
      .catch(err => {
        console.error('Error fetching permissions', err);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter permissions based on search term
    const filtered = permissions.filter(permission =>
      permission.permission_name.toLowerCase().includes(value.toLowerCase()) ||
      permission.permission_description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPermissions(filtered);
  };

  const handleEdit = (permission) => {
    setPermissionToEdit(permission);
    setFormData({
      permission_name: permission.permission_name,
      permission_description: permission.permission_description
    });
    setShowEditModal(true);
  };

  const handleViewUsers = (permission) => {
    axios.get(`http://localhost:3000/api/frontend/workers/with-role/${permission.permission_id}`)
      .then(response => {
        setPermissionUsers(response.data);
        setShowUsersModal(true);
      })
      .catch(err => {
        console.error('Error fetching users for permission', err);
      });
  };

  const handleSaveChanges = () => {
    // Validate that formData is not empty
    if (formData.permission_name.trim() === '' || formData.permission_description.trim() === '') {
      alert("Please fill out all fields.");
      return;
    }

    // Update permission
    axios.put(`http://localhost:3000/api/v1/permissions/${permissionToEdit.permission_id}`, formData)
      .then(response => {
        console.log('Permission updated:', response);
        setShowEditModal(false);
        // Refresh the permissions list
        return axios.get('http://localhost:3000/api/v1/permissions');
      })
      .then(response => {
        setPermissions(response.data);
        setFilteredPermissions(response.data);
      })
      .catch(err => {
        console.error('Error updating permission', err);
      });
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  return (
    <div className="container mt-4">
      <h2>All Permissions</h2>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Buscar por Nombre o Descripción"
          aria-label="Buscar por Nombre o Descripción"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Permission Name</th>
            <th>Permission Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPermissions.map(permission => (
            <tr key={permission.permission_id}>
              <td>{permission.permission_name}</td>
              <td>{permission.permission_description}</td>
              <td className="text-center">
                <div className="d-flex justify-content-between w-100">
                  <Button variant="primary" onClick={() => handleEdit(permission)} className="mx-1 w-100">
                    Edit
                  </Button>
                  <Button variant="info" onClick={() => handleViewUsers(permission)} className="mx-1 w-100">
                    View Users
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Permission Modal */}
      <Modal show={showEditModal} onHide={handleCancelEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Permission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPermissionName">
              <Form.Label>Permission Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.permission_name}
                onChange={(e) => setFormData({ ...formData, permission_name: e.target.value })}
                placeholder="Enter permission name"
              />
            </Form.Group>
            <Form.Group controlId="formPermissionDescription" className="mt-3">
              <Form.Label>Permission Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.permission_description}
                onChange={(e) => setFormData({ ...formData, permission_description: e.target.value })}
                placeholder="Enter permission description"
              />
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

      {/* View Users Modal */}
      <Modal show={showUsersModal} onHide={() => setShowUsersModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Users with this Permission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Buscar usuarios..."
            aria-label="Buscar usuarios"
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              const filtered = permissionUsers.filter(user =>
                user.worker_email.toLowerCase().includes(value) || 
                user.worker_name.toLowerCase().includes(value)
              );
              setPermissionUsers(filtered);
            }}
          />
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Email</th>
                <th>Name</th>
                <th>Surname</th>
              </tr>
            </thead>
            <tbody>
              {permissionUsers.map(user => (
                <tr key={user.worker_id}>
                  <td>{user.worker_email}</td>
                  <td>{user.worker_name}</td>
                  <td>{user.worker_surname}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUsersModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SeePermissions;
