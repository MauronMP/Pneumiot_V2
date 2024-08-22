const BoardSensor = require('../models/BoardSensor');

// Obtener todas las relaciones entre boards y sensores
const getAllBoardSensors = async (req, res) => {
    try {
        const boardSensors = await BoardSensor.findAll();
        res.status(200).json(boardSensors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una relación por ID de board y sensor
const getBoardSensorById = async (req, res) => {
    try {
        const { board_id, sensor_id } = req.params;
        const boardSensor = await BoardSensor.findOne({ where: { board_id, sensor_id } });
        if (boardSensor) {
            res.status(200).json(boardSensor);
        } else {
            res.status(404).json({ message: "Board-Sensor relationship not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva relación entre board y sensor
const createBoardSensor = async (req, res) => {
    try {
        const { board_id, sensor_id } = req.body;
        const newBoardSensor = await BoardSensor.create({ board_id, sensor_id });
        res.status(201).json(newBoardSensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una relación entre board y sensor
const deleteBoardSensor = async (req, res) => {
    try {
        const { board_id, sensor_id } = req.params;
        const boardSensor = await BoardSensor.findOne({ where: { board_id, sensor_id } });
        if (boardSensor) {
            await boardSensor.destroy();
            res.status(200).json({ message: "Board-Sensor relationship deleted successfully" });
        } else {
            res.status(404).json({ message: "Board-Sensor relationship not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBoardSensors,
    getBoardSensorById,
    createBoardSensor,
    deleteBoardSensor
};
