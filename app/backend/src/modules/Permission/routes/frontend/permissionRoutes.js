const express = require('express');
const router = express.Router();
const permissionController = require('../../controllers/permissionController');

// Obtener todos los permisos
router.get('/', permissionController.getAllPermissions);

// Obtener un permiso por su ID
router.get('/:id', permissionController.getPermissionById);

// Crear un nuevo permiso
router.post('/', permissionController.createPermission);

// Actualizar un permiso por su ID
router.put('/:id', permissionController.updatePermission);

// Eliminar un permiso por su ID
router.delete('/:id', permissionController.deletePermission);

module.exports = router;
