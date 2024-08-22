const express = require('express');
const router = express.Router();
const dailyAverageController = require('../../controllers/dailyAverageController');

router.get('/', dailyAverageController.getAllDailyAverages);
router.get('/:id', dailyAverageController.getDailyAverageById);
router.post('/', dailyAverageController.createDailyAverage);
router.put('/:id', dailyAverageController.updateDailyAverage);
router.delete('/:id', dailyAverageController.deleteDailyAverage);

module.exports = router;
