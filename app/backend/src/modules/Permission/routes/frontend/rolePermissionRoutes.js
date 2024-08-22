const express = require('express');
const router = express.Router();
const rolePermissionController = require('../../controllers/rolePermissionController');

// Obtener todos los permisos de rol
router.get('/', rolePermissionController.getAllRolePermissions);

// Obtener un permiso de rol por su ID
router.get('/:id', rolePermissionController.getRolePermissionById);

// Crear un nuevo permiso de rol
router.post('/', rolePermissionController.createRolePermission);

// Actualizar un permiso de rol por su ID
router.put('/:id', rolePermissionController.updateRolePermission);

// Eliminar un permiso de rol por su ID
router.delete('/:id', rolePermissionController.deleteRolePermission);

module.exports = router;
