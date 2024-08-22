const boardService = require('../services/boardServices');

const getAllBoards = async (req, res) => {
    await boardService.getAllBoards(req, res);
};

const getBoardById = async (req, res) => {
    await boardService.getBoardById(req, res);
};

const createBoard = async (req, res) => {
    await boardService.createBoard(req, res);
};

const updateBoard = async (req, res) => {
    await boardService.updateBoard(req, res);
};

const deleteBoard = async (req, res) => {
    await boardService.deleteBoard(req, res);
};

module.exports = {
    getAllBoards,
    getBoardById,
    createBoard,
    updateBoard,
    deleteBoard
};
