const express = require('express');
const router = express.Router();
const workerAuthController = require('../../controllers/workerAuthController');

// Definición de las rutas frontend
router.get('/', workerAuthController.getAllWorkerAuths);
router.get('/:id', workerAuthController.getWorkerAuthById);
router.post('/', workerAuthController.createWorkerAuth);
router.put('/:id', workerAuthController.updateWorkerAuth);
router.delete('/:id', workerAuthController.deleteWorkerAuth);

module.exports = router;
