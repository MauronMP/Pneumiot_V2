const BoardSensor = require('../models/BoardSensor');
const { createLog } = require('../../Log/services/LogService'); // Import log service

// Get all relationships between boards and sensors
const getAllBoardSensors = async (req, res) => {
    try {
        await createLog(`[${new Date().toISOString()}] Fetching all Board-Sensor relationships`); // Log the action

        // Fetch all records from BoardSensor table
        const boardSensors = await BoardSensor.findAll();
        res.status(200).json(boardSensors);
    } catch (error) {
        await createLog(`[${new Date().toISOString()}] Error fetching Board-Sensor relationships: ${error.message}`); // Log the error
        res.status(500).json({ message: error.message });
    }
};

// Get a specific board-sensor relationship by board ID and sensor ID
const getBoardSensorById = async (req, res) => {
    try {
        const { board_id, sensor_id } = req.params;
        await createLog(`[${new Date().toISOString()}] Fetching Board-Sensor relationship for Board ID: ${board_id}, Sensor ID: ${sensor_id}`); // Log the action

        // Find the relationship based on board_id and sensor_id
        const boardSensor = await BoardSensor.findOne({ where: { board_id, sensor_id } });
        if (boardSensor) {
            res.status(200).json(boardSensor);
        } else {
            res.status(404).json({ message: "Board-Sensor relationship not found" });
        }
    } catch (error) {
        await createLog(`[${new Date().toISOString()}] Error fetching Board-Sensor relationship: ${error.message}`); // Log the error
        res.status(500).json({ message: error.message });
    }
};

// Create a new relationship between a board and a sensor
const createBoardSensor = async (req, res) => {
    try {
        const { board_id, sensor_id } = req.body;
        await createLog(`[${new Date().toISOString()}] Creating Board-Sensor relationship for Board ID: ${board_id}, Sensor ID: ${sensor_id}`); // Log the action

        // Create the new relationship
        const newBoardSensor = await BoardSensor.create({ board_id, sensor_id });
        res.status(201).json(newBoardSensor);
    } catch (error) {
        await createLog(`[${new Date().toISOString()}] Error creating Board-Sensor relationship: ${error.message}`); // Log the error
        res.status(500).json({ message: error.message });
    }
};

// Delete an existing relationship between a board and a sensor
const deleteBoardSensor = async (req, res) => {
    try {
        const { board_id, sensor_id } = req.params;
        await createLog(`[${new Date().toISOString()}] Deleting Board-Sensor relationship for Board ID: ${board_id}, Sensor ID: ${sensor_id}`); // Log the action

        // Find the relationship by board_id and sensor_id
        const boardSensor = await BoardSensor.findOne({ where: { board_id, sensor_id } });
        if (boardSensor) {
            // Delete the relationship if found
            await boardSensor.destroy();
            res.status(200).json({ message: "Board-Sensor relationship deleted successfully" });
        } else {
            res.status(404).json({ message: "Board-Sensor relationship not found" });
        }
    } catch (error) {
        await createLog(`[${new Date().toISOString()}] Error deleting Board-Sensor relationship: ${error.message}`); // Log the error
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBoardSensors,
    getBoardSensorById,
    createBoardSensor,
    deleteBoardSensor
};