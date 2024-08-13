const express = require('express');
const router = express.Router();
const workerAuthController = require('../controllers/workerAuthController');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/', workerAuthController.getAllWorkerAuths);
router.get('/:id', workerAuthController.getWorkerAuthById);
router.post('/', workerAuthController.createWorkerAuth);
router.put('/:id', workerAuthController.updateWorkerAuth);
router.delete('/:id', workerAuthController.deleteWorkerAuth);

module.exports = router;
