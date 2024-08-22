const boardSensorService = require('../services/boardSensorServices');

const getAllBoardSensors = async (req, res) => {
    await boardSensorService.getAllBoardSensors(req, res);
};

const getBoardSensorById = async (req, res) => {
    await boardSensorService.getBoardSensorById(req, res);
};

const createBoardSensor = async (req, res) => {
    await boardSensorService.createBoardSensor(req, res);
};

const deleteBoardSensor = async (req, res) => {
    await boardSensorService.deleteBoardSensor(req, res);
};

module.exports = {
    getAllBoardSensors,
    getBoardSensorById,
    createBoardSensor,
    deleteBoardSensor
};
