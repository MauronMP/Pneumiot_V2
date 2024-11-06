const express = require('express');
const router = express.Router();
const dailyAverageController = require('../../controllers/dailyAverageController');

// Definición de las rutas frontend
router.get('/getdata', dailyAverageController.getDailyAveragesController); // Ruta para obtener promedios horarios
router.get('/', dailyAverageController.getAllDailyAverages);
router.get('/:id', dailyAverageController.getDailyAverageById);
router.post('/', dailyAverageController.createDailyAverage);
router.put('/:id', dailyAverageController.updateDailyAverage);
router.delete('/:id', dailyAverageController.deleteDailyAverage);

module.exports = router;
