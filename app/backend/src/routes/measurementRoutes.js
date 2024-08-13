const express = require('express');
const router = express.Router();
const measurementController = require('../controllers/measurementController');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/', measurementController.getAllMeasurements);
router.get('/:id', measurementController.getMeasurementById);
router.post('/', measurementController.createMeasurement);
router.put('/:id', measurementController.updateMeasurement);
router.delete('/:id', measurementController.deleteMeasurement);

module.exports = router;
