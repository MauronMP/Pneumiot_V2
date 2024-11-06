const express = require('express');
const router = express.Router();
const LogController = require('../../controllers/LogController');

// Definición de las rutas y asociación con los métodos del controlador
router.get('/', LogController.getAllLogs);
router.get('/:id', LogController.getLogById);
router.post('/', LogController.createLog);
router.put('/:id', LogController.updateLog);
router.delete('/:id', LogController.deleteLog);

module.exports = router;
