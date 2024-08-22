const express = require('express');
const router = express.Router();
const boardSensorService = require('../../services/boardSensorServices');

// Definir las rutas para el servicio de BoardSensor
router.get('/', boardSensorService.getAllBoardSensors);
router.get('/:board_id/:sensor_id', boardSensorService.getBoardSensorById);
router.post('/', boardSensorService.createBoardSensor);
router.delete('/:board_id/:sensor_id', boardSensorService.deleteBoardSensor);

module.exports = router;
