const express = require('express');
const router = express.Router();
const boardSensorController = require('../controllers/boardSensorController');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/', boardSensorController.getAllBoardSensors);
router.get('/:boardId/:sensorId', boardSensorController.getBoardSensorByIds);
router.post('/', boardSensorController.createBoardSensor);
router.delete('/:boardId/:sensorId', boardSensorController.deleteBoardSensor);

module.exports = router;
