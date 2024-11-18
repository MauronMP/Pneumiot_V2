import React, { useState, useEffect } from 'react';
import { Table, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config/config';  // Importa las URL de las APIs
import { useTranslation } from 'react-i18next'; // Importa el hook useTranslation

const SeePermissions = () => {
  const { t } = useTranslation('seePermissions'); // Usa el espacio de nombres 'permissions' para las traducciones

  const [permissions, setPermissions] = useState([]); // Almacena todos los permisos
  const [searchTerm, setSearchTerm] = useState(''); // Almacena el valor de búsqueda
  const [filteredPermissions, setFilteredPermissions] = useState([]); // Almacena los permisos filtrados por la búsqueda
  const [showEditModal, setShowEditModal] = useState(false); // Controla la visibilidad del modal de Editar Permiso
  const [showUsersModal, setShowUsersModal] = useState(false); // Controla la visibilidad del modal de Ver Usuarios
  const [permissionToEdit, setPermissionToEdit] = useState(null); // Almacena el permiso a editar
  const [permissionUsers, setPermissionUsers] = useState([]); // Almacena los usuarios asociados con un permiso
  const [formData, setFormData] = useState({
    permission_name: '',
    permission_description: ''
  }); // Almacena los datos del formulario para editar un permiso

  // Obtiene los permisos desde la API cuando el componente se monta
  useEffect(() => {
    axios.get(`${config.apiV1}permissions`)
      .then(response => {
        setPermissions(response.data); // Almacena los permisos obtenidos
        setFilteredPermissions(response.data); // Muestra todos los permisos inicialmente
      })
      .catch(err => {
        console.error(t('errorFetchingPermissions'), err);
      });
  }, [t]);

  // Maneja el cambio en el valor de búsqueda y filtra los permisos
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filtra los permisos en función del término de búsqueda
    const filtered = permissions.filter(permission =>
      permission.permission_name.toLowerCase().includes(value.toLowerCase()) ||
      permission.permission_description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPermissions(filtered);
  };

  // Abre el modal para editar el permiso y pre-carga el formulario con los datos del permiso seleccionado
  const handleEdit = (permission) => {
    setPermissionToEdit(permission);
    setFormData({
      permission_name: permission.permission_name,
      permission_description: permission.permission_description
    });
    setShowEditModal(true);
  };

  // Abre el modal para ver los usuarios y obtiene los usuarios asociados con el permiso seleccionado
  const handleViewUsers = (permission) => {
    axios.get(`${config.frontendBaseUrl}workers/with-role/${permission.permission_id}`)
      .then(response => {
        setPermissionUsers(response.data); // Almacena los usuarios asociados con el permiso
        setShowUsersModal(true);
      })
      .catch(err => {
        console.error(t('errorFetchingUsersForPermission'), err);
      });
  };

  // Guarda los cambios después de editar el permiso
  const handleSaveChanges = () => {
    if (formData.permission_name.trim() === '' || formData.permission_description.trim() === '') {
      alert(t('pleaseFillOutAllFields'));
      return;
    }

    // Actualiza el permiso con una solicitud PUT
    axios.put(`${config.apiV1}permissions/${permissionToEdit.permission_id}`, formData)
      .then(response => {
        console.log(t('permissionUpdated'), response);
        setShowEditModal(false);

        // Refresca la lista de permisos
        return axios.get(`${config.apiV1}permissions`);
      })
      .then(response => {
        setPermissions(response.data);
        setFilteredPermissions(response.data);
      })
      .catch(err => {
        console.error(t('errorUpdatingPermission'), err);
      });
  };

  // Cierra el modal de Editar Permiso sin guardar cambios
  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  return (
    <div className="container mt-4">
      <h2>{t('allPermissions')}</h2>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder={t('searchByNameOrDescription')}
          aria-label={t('searchByNameOrDescription')}
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>{t('permissionName')}</th>
            <th>{t('permissionDescription')}</th>
            <th>{t('actions')}</th>
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
                    {t('edit')}
                  </Button>
                  <Button variant="info" onClick={() => handleViewUsers(permission)} className="mx-1 w-100">
                    {t('viewUsers')}
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Editar Permiso */}
      <Modal show={showEditModal} onHide={handleCancelEdit} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('editPermission')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPermissionName">
              <Form.Label>{t('permissionName')}</Form.Label>
              <Form.Control
                type="text"
                value={formData.permission_name}
                onChange={(e) => setFormData({ ...formData, permission_name: e.target.value })}
                placeholder={t('enterPermissionName')}
              />
            </Form.Group>
            <Form.Group controlId="formPermissionDescription" className="mt-3">
              <Form.Label>{t('permissionDescription')}</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.permission_description}
                onChange={(e) => setFormData({ ...formData, permission_description: e.target.value })}
                placeholder={t('enterPermissionDescription')}
              />
            </Form.Group>
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

      {/* Modal para Ver Usuarios */}
      <Modal show={showUsersModal} onHide={() => setShowUsersModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{t('usersWithThisPermission')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder={t('searchUsers')}
            aria-label={t('searchUsers')}
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
                <th>{t('email')}</th>
                <th>{t('name')}</th>
                <th>{t('surname')}</th>
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
            {t('close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SeePermissions;