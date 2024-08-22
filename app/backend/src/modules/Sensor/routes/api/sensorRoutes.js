const express = require('express');
const router = express.Router();
const sensorService = require('../../services/sensorService');

router.get('/', sensorService.getAllSensors);
router.get('/:id', sensorService.getSensorById);
router.post('/', sensorService.createSensor);
router.put('/:id', sensorService.updateSensor);
router.delete('/:id', sensorService.deleteSensor);

module.exports = router;
