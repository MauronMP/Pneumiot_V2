const express = require('express');
const router = express.Router();
const rolePermissionController = require('../../controllers/rolePermissionController');

// Definición de las rutas frontend
router.get('/', rolePermissionController.getAllRolePermissions);
router.get('/:id', rolePermissionController.getRolePermissionById);
router.post('/', rolePermissionController.createRolePermission);
router.put('/:id', rolePermissionController.updateRolePermission);
router.delete('/:id', rolePermissionController.deleteRolePermission);

module.exports = router;
