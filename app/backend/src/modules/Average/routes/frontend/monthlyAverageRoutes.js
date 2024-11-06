const express = require('express');
const router = express.Router();
const monthlyAverageController = require('../../controllers/monthlyAverageController');

router.get('/monthly', monthlyAverageController.getMonthlyAveragesWithConditions);
router.get('/', monthlyAverageController.getAllMonthlyAverages);
router.get('/:id', monthlyAverageController.getMonthlyAverageById);
router.post('/', monthlyAverageController.createMonthlyAverage);
router.put('/:id', monthlyAverageController.updateMonthlyAverage);
router.delete('/:id', monthlyAverageController.deleteMonthlyAverage);

module.exports = router;
