const express = require('express');
const router = express.Router();
const boardService = require('../../services/boardServices');

// Definir las rutas para el servicio de boards
router.get('/', boardService.getAllBoards);
router.get('/:id', boardService.getBoardById);
router.post('/', boardService.createBoard);
router.put('/:id', boardService.updateBoard);
router.delete('/:id', boardService.deleteBoard);

module.exports = router;
