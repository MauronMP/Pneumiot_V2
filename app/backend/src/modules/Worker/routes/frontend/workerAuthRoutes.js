const express = require('express');
const router = express.Router();
const workerRoleController = require('../../controllers/workerRoleController');

// Definición de las rutas frontend
router.get('/', workerRoleController.getAllWorkerRoles);
router.get('/:id', workerRoleController.getWorkerRoleById);
router.post('/', workerRoleController.createWorkerRole);
router.put('/:id', workerRoleController.updateWorkerRole);
router.delete('/:id', workerRoleController.deleteWorkerRole);

module.exports = router;
