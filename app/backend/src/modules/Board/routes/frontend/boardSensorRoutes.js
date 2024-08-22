const express = require('express');
const router = express.Router();
const boardSensorController = require('../../controllers/boardSensorController');

// Definir las rutas para el frontend de BoardSensor
router.get('/', boardSensorController.getAllBoardSensors);
router.get('/:board_id/:sensor_id', boardSensorController.getBoardSensorById);
router.post('/', boardSensorController.createBoardSensor);
router.delete('/:board_id/:sensor_id', boardSensorController.deleteBoardSensor);

module.exports = router;
