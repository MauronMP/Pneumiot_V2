const express = require('express');
const router = express.Router();
const permissionController = require('../../controllers/permissionController');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/', permissionController.getAllPermissions);
router.get('/:id', permissionController.getPermissionById);
router.post('/', permissionController.createPermission);
router.put('/:id', permissionController.updatePermission);
router.delete('/:id', permissionController.deletePermission);
router.get('/workers-with-permissions', permissionController.getWorkersWithPermissions);

module.exports = router;
