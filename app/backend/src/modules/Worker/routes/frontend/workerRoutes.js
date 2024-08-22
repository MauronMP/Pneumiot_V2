const express = require('express');
const router = express.Router();
const workerController = require('../../controllers/workerController');

// Definición de las rutas y asociación con los métodos del controlador
router.get('/', workerController.getAllWorkers);
router.get('/:id', workerController.getWorkerById);
router.post('/', workerController.createWorker);
router.put('/:id', workerController.updateWorker);
router.delete('/:id', workerController.deleteWorker);

module.exports = router;
