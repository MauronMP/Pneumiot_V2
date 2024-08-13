const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/', sensorController.getAllSensors);
router.get('/:id', sensorController.getSensorById);
router.post('/', sensorController.createSensor);
router.put('/:id', sensorController.updateSensor);
router.delete('/:id', sensorController.deleteSensor);

module.exports = router;
