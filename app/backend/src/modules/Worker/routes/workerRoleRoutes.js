const express = require('express');
const router = express.Router();
const workerRoleController = require('../controllers/workerRoleController');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/', workerRoleController.getAllWorkerRoles);
router.get('/:id', workerRoleController.getWorkerRoleById);
router.post('/', workerRoleController.createWorkerRole);
router.put('/:id', workerRoleController.updateWorkerRole);
router.delete('/:id', workerRoleController.deleteWorkerRole);

module.exports = router;
