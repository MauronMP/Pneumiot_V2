const express = require('express');
const router = express.Router();
const BoardController = require('../../controllers/boardController');

// Obtener todos los boards
router.get('/', BoardController.getAllBoards);

// Obtener un board por ID
router.get('/:id', BoardController.getBoardById);

// Crear un nuevo board
router.post('/', BoardController.createBoard);

// Actualizar un board existente
router.put('/:id', BoardController.updateBoard);

// Eliminar un board
router.delete('/:id', BoardController.deleteBoard);

module.exports = router;
