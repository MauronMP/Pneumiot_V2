// src/routes/errorLogRoutes.js
const express = require('express');
const router = express.Router();
const errorLogController = require('../controllers/errorLogController');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/', errorLogController.getAllErrorLogs);
router.get('/:id', errorLogController.getErrorLogById);
router.post('/', errorLogController.createErrorLog);
router.put('/:id', errorLogController.updateErrorLog);
router.delete('/:id', errorLogController.deleteErrorLog);

module.exports = router;
