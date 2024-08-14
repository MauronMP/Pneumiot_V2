// src/modules/board/controllers/boardController.js
const BoardService = require('../services/boardServices');

exports.getAllBoards = async (req, res) => {
    try {
        const boards = await BoardService.getAllBoards();
        res.status(200).json(boards);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBoardById = async (req, res) => {
    try {
        const { id } = req.params;
        const board = await BoardService.getBoardById(id);
        res.status(200).json(board);
    } catch (error) {
        if (error.message === 'Board not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.createBoard = async (req, res) => {
    try {
        const { board_code } = req.body;
        const newBoard = await BoardService.createBoard({ board_code });
        res.status(201).json(newBoard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const { board_code } = req.body;
        const message = await BoardService.updateBoard(id, { board_code });
        res.status(200).json({ message });
    } catch (error) {
        if (error.message === 'Board not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await BoardService.deleteBoard(id);
        res.status(200).json({ message });
    } catch (error) {
        if (error.message === 'Board not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};
