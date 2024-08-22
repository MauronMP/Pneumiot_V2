const express = require('express');
const router = express.Router();
const sensorLogController = require('../../controllers/sensorLogController');

// Obtener todos los registros de sensor
router.get('/', sensorLogController.getAllSensorLogs);

// Obtener un registro de sensor por su ID
router.get('/:id', sensorLogController.getSensorLogById);

// Crear un nuevo registro de sensor
router.post('/', sensorLogController.createSensorLog);

// Actualizar un registro de sensor por su ID
router.put('/:id', sensorLogController.updateSensorLog);

// Eliminar un registro de sensor por su ID
router.delete('/:id', sensorLogController.deleteSensorLog);

module.exports = router;
