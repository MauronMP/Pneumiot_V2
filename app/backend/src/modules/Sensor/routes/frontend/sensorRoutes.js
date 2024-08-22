const express = require('express');
const router = express.Router();
const sensorController = require('../../controllers/sensorController');

// Obtener todos los sensores
router.get('/', sensorController.getAllSensors);

// Obtener un sensor por su ID
router.get('/:id', sensorController.getSensorById);

// Crear un nuevo sensor
router.post('/', sensorController.createSensor);

// Actualizar un sensor por su ID
router.put('/:id', sensorController.updateSensor);

// Eliminar un sensor por su ID
router.delete('/:id', sensorController.deleteSensor);

module.exports = router;
