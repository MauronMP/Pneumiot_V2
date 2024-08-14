const express = require('express');
const router = express.Router();
const boardSensorServices = require('../../services/boardSensorServices');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/', boardSensorServices.getAllBoardSensors);
router.get('/:id', boardSensorServices.getBoardSensorById);
router.post('/', boardSensorServices.createBoardSensor);
router.put('/:id', boardSensorServices.updateBoardSensor);
router.delete('/:id', boardSensorServices.deleteBoardSensor);

module.exports = router;
