const express = require('express');
const router = express.Router();
const measurementController = require('../../controllers/measurementController');

// Definir las rutas para el frontend de Measurement
router.get('/patient/:patient_id', measurementController.getMeasurementsByPatientId);  // Nueva ruta
router.get('/', measurementController.getAllMeasurements);
router.get('/:measurement_id', measurementController.getMeasurementById);
router.post('/', measurementController.createMeasurement);
router.put('/:measurement_id', measurementController.updateMeasurement);
router.delete('/:measurement_id', measurementController.deleteMeasurement);

module.exports = router;
