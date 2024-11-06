const express = require('express');
const router = express.Router();
const hourlyAverageController = require('../../controllers/hourlyAverageController');

// Definición de las rutas frontend
router.get('/getdata', hourlyAverageController.getHourlyAverages); // Ruta para obtener promedios horarios
router.get('/', hourlyAverageController.getAllHourlyAverages);
router.get('/:id', hourlyAverageController.getHourlyAverageById);
router.post('/', hourlyAverageController.createHourlyAverage);
router.put('/:id', hourlyAverageController.updateHourlyAverage);
router.delete('/:id', hourlyAverageController.deleteHourlyAverage);

module.exports = router;
