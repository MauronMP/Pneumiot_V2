const express = require('express');
const router = express.Router();
const indexRateController = require('../../controllers/indexRateController');

// Definición de las rutas frontend
router.get('/', indexRateController.getAllIndexRates);
router.get('/:id', indexRateController.getIndexRateById);
router.post('/', indexRateController.createIndexRate);
router.put('/:id', indexRateController.updateIndexRate);
router.delete('/:id', indexRateController.deleteIndexRate);

module.exports = router;
