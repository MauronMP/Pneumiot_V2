// src/routes/hourlyAverageRoutes.js
const express = require('express');
const router = express.Router();
const hourlyAverageController = require('../../../controllers/hourlyAverageController');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/', hourlyAverageController.getAllHourlyAverages);
router.get('/:id', hourlyAverageController.getHourlyAverageById);
router.post('/', hourlyAverageController.createHourlyAverage);
router.put('/:id', hourlyAverageController.updateHourlyAverage);
router.delete('/:id', hourlyAverageController.deleteHourlyAverage);

module.exports = router;
