const express = require('express');
const router = express.Router();
const measurementService = require('../../services/measurementService');

// Definir las rutas para el servicio de Measurement
router.get('/', measurementService.getAllMeasurements);
router.get('/:measurement_id', measurementService.getMeasurementById);
router.post('/', measurementService.createMeasurement);
router.put('/:measurement_id', measurementService.updateMeasurement);
router.delete('/:measurement_id', measurementService.deleteMeasurement);

module.exports = router;
