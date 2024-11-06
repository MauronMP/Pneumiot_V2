const boardService = require('../services/boardServices');

const getBoardWithSensors = async (req, res) => {
    await boardService.getBoardWithSensors(req, res);
};

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

const countBoards = async (req, res) => {
    await boardService.countBoards(req, res);
};

module.exports = {
    countBoards,
    getBoardWithSensors,
    getAllBoards,
    getBoardById,
    createBoard,
    updateBoard,
    deleteBoard
};
