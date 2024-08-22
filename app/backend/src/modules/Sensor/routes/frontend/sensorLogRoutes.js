const express = require('express');
const router = express.Router();
const sensorLogController = require('../../controllers/sensorLogController');

// Definición de las rutas frontend
router.get('/', sensorLogController.getAllSensorLogs);
router.get('/:id', sensorLogController.getSensorLogById);
router.post('/', sensorLogController.createSensorLog);
router.put('/:id', sensorLogController.updateSensorLog);
router.delete('/:id', sensorLogController.deleteSensorLog);

module.exports = router;
