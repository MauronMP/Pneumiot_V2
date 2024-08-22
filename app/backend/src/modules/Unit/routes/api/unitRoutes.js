// src/routes/unitRoutes.js
const express = require('express');
const router = express.Router();
const unitController = require('../../controllers/unitController');

// Definición de las rutas
router.get('/', unitController.getAllUnits);
router.get('/:id', unitController.getUnitById);
router.post('/', unitController.createUnit);
router.put('/:id', unitController.updateUnit);
router.delete('/:id', unitController.deleteUnit);

module.exports = router;

