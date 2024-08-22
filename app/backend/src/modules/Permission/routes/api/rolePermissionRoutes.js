const express = require('express');
const router = express.Router();
const rolePermissionController = require('../../controllers/rolePermissionController');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/', rolePermissionController.getAllRolePermissions);
router.get('/:id', rolePermissionController.getRolePermissionById);
router.post('/', rolePermissionController.createRolePermission);
router.put('/:id', rolePermissionController.updateRolePermission);
router.delete('/:id', rolePermissionController.deleteRolePermission);

module.exports = router;
