import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config/config';  // Import URL paths for apis

const SeePermissions = () => {
  const [permissions, setPermissions] = useState([]); // Stores all permissions
  const [searchTerm, setSearchTerm] = useState(''); // Holds the search input value
  const [filteredPermissions, setFilteredPermissions] = useState([]); // Stores filtered permissions based on search
  const [showEditModal, setShowEditModal] = useState(false); // Controls visibility of the Edit Permission modal
  const [showUsersModal, setShowUsersModal] = useState(false); // Controls visibility of the View Users modal
  const [permissionToEdit, setPermissionToEdit] = useState(null); // Stores permission to be edited
  const [permissionUsers, setPermissionUsers] = useState([]); // Stores users associated with a permission
  const [formData, setFormData] = useState({
    permission_name: '',
    permission_description: ''
  }); // Stores the form data for editing a permission

  // Fetch permissions from the API on component mount
  useEffect(() => {
    axios.get(`${config.apiV1}permissions`)
      .then(response => {
        setPermissions(response.data); // Store fetched permissions
        setFilteredPermissions(response.data); // Initially display all permissions
      })
      .catch(err => {
        console.error('Error fetching permissions', err);
      });
  }, []);

  // Handle search input change and filter permissions
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter permissions based on the search term
    const filtered = permissions.filter(permission =>
      permission.permission_name.toLowerCase().includes(value.toLowerCase()) ||
      permission.permission_description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPermissions(filtered);
  };

  // Open Edit Permission modal and pre-fill the form with selected permission's data
  const handleEdit = (permission) => {
    setPermissionToEdit(permission);
    setFormData({
      permission_name: permission.permission_name,
      permission_description: permission.permission_description
    });
    setShowEditModal(true);
  };

  // Open View Users modal and fetch users associated with the selected permission
  const handleViewUsers = (permission) => {
    axios.get(`${config.frontendBaseUrl}workers/with-role/${permission.permission_id}`)
      .then(response => {
        setPermissionUsers(response.data); // Store users associated with the permission
        setShowUsersModal(true);
      })
      .catch(err => {
        console.error('Error fetching users for permission', err);
      });
  };

  // Save changes to the permission after editing
  const handleSaveChanges = () => {
    if (formData.permission_name.trim() === '' || formData.permission_description.trim() === '') {
      alert("Please fill out all fields.");
      return;
    }

    // Update the permission using PUT request
    axios.put(`${config.apiV1}permissions/${permissionToEdit.permission_id}`, formData)
      .then(response => {
        console.log('Permission updated:', response);
        setShowEditModal(false);

        // Refresh the permissions list
        return axios.get(`${config.apiV1}permissions`);
      })
      .then(response => {
        setPermissions(response.data);
        setFilteredPermissions(response.data);
      })
      .catch(err => {
        console.error('Error updating permission', err);
      });
  };

  // Close the Edit Permission modal without saving changes
  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  return (
    <div className="container mt-4">
      <h2>All Permissions</h2>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by name or description"
          aria-label="Search by name or description"
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
