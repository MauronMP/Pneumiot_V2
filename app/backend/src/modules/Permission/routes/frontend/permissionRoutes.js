const express = require('express');
const router = express.Router();
const permissionController = require('../../controllers/permissionController');

// Definición de las rutas frontend
router.get('/workers-with-permissions', permissionController.getWorkersWithPermissions);
router.get('/', permissionController.getAllPermissions);
router.get('/:id', permissionController.getPermissionById);
router.post('/', permissionController.createPermission);
router.put('/:id', permissionController.updatePermission);
router.delete('/:id', permissionController.deletePermission);

module.exports = router;
