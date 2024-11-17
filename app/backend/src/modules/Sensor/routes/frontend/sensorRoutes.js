const express = require('express');
const sensorController = require('../../controllers/sensorController');

const router = express.Router();

router.get('/sensorInformation/:id', sensorController.getSensorInformation); // Nueva ruta
router.get('/count', sensorController.countSensors);
router.get('/', sensorController.getAllSensors);         // Obtener todos los sensores
router.get('/:id', sensorController.getSensorById);     // Obtener un sensor por ID
router.post('', sensorController.createSensor);         // Crear un nuevo sensor
router.put('/:id', sensorController.updateSensor);      // Actualizar un sensor existente
router.delete('/:id', sensorController.deleteSensor);   // Eliminar un sensor

module.exports = router;
