// src/routes/monthlyAverageRoutes.js
const express = require('express');
const router = express.Router();
const monthlyAverageController = require('../controllers/monthlyAverageController');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/', monthlyAverageController.getAllMonthlyAverages);
router.get('/:id', monthlyAverageController.getMonthlyAverageById);
router.post('/', monthlyAverageController.createMonthlyAverage);
router.put('/:id', monthlyAverageController.updateMonthlyAverage);
router.delete('/:id', monthlyAverageController.deleteMonthlyAverage);

module.exports = router;
