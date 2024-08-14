const express = require('express');
const router = express.Router();
const boardServices = require('../../services/boardServices');

// Definir las rutas y asociarlas con los métodos del controlador
router.get('/', boardServices.getAllBoards);
router.get('/:id', boardServices.getBoardById);
router.post('/', boardServices.createBoard);
router.put('/:id', boardServices.updateBoard);
router.delete('/:id', boardServices.deleteBoard);

module.exports = router;
