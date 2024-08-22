const Board = require('../models/Board');

// Obtener todas las boards
const getAllBoards = async (req, res) => {
    try {
        const boards = await Board.findAll();
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una board por ID
const getBoardById = async (req, res) => {
    try {
        const { id } = req.params;
        const board = await Board.findByPk(id);
        if (board) {
            res.status(200).json(board);
        } else {
            res.status(404).json({ message: "Board not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva board
const createBoard = async (req, res) => {
    try {
        const { board_code } = req.body;
        const newBoard = await Board.create({ board_code });
        res.status(201).json(newBoard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una board existente
const updateBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const { board_code } = req.body;
        const board = await Board.findByPk(id);
        if (board) {
            board.board_code = board_code;
            await board.save();
            res.status(200).json(board);
        } else {
            res.status(404).json({ message: "Board not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una board
const deleteBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const board = await Board.findByPk(id);
        if (board) {
            await board.destroy();
            res.status(200).json({ message: "Board deleted successfully" });
        } else {
            res.status(404).json({ message: "Board not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBoards,
    getBoardById,
    createBoard,
    updateBoard,
    deleteBoard
};
