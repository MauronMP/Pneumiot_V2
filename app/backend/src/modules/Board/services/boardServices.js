const Board = require('../models/Board');
const Sensor = require('../../Sensor/models/Sensor');
const Unit = require('../../Unit/models/Unit');
const { createLog } = require('../../Log/services/LogService'); // Import log service

// Get board information with associated sensors
const getBoardWithSensors = async (req, res) => {
    try {
        const currentTime = new Date().toISOString();
        await createLog(`[${currentTime}] Fetching all boards with sensors`); // Log the action

        // Query boards with associated sensors and units
        const boardsWithSensors = await Board.findAll({
            include: [
                {
                    model: Sensor, // Relationship with Sensor
                    through: 'BoardSensor', // Intermediate table
                    include: [
                        {
                            model: Unit, // Relationship with Unit
                            attributes: ['unit_abbreviation'], // Only select unit abbreviation
                        }
                    ],
                    attributes: ['sensor_code', 'sensor_type', 'min_value', 'max_value'] // Select specific sensor columns
                }
            ],
            order: [['board_code', 'ASC']], // Order by board_code
            attributes: ['board_code'] // Select only the board_code column from Board
        });

        res.status(200).json(boardsWithSensors);
    } catch (error) {
        await createLog(`[${new Date().toISOString()}] Error fetching boards with sensors: ${error.message}`); // Log the error
        res.status(500).json({ message: error.message });
    }
};

// Get all boards
const getAllBoards = async (req, res) => {
    try {
        const currentTime = new Date().toISOString();
        await createLog(`[${currentTime}] Fetching all boards`); // Log the action

        const boards = await Board.findAll();
        res.status(200).json(boards);
    } catch (error) {
        await createLog(`[${new Date().toISOString()}] Error fetching all boards: ${error.message}`); // Log the error
        res.status(500).json({ message: error.message });
    }
};

// Get board by ID
const getBoardById = async (req, res) => {
    try {
        const { id } = req.params;
        await createLog(`[${new Date().toISOString()}] Fetching board with ID: ${id}`); // Log the action

        const board = await Board.findByPk(id);
        if (board) {
            res.status(200).json(board);
        } else {
            res.status(404).json({ message: "Board not found" });
        }
    } catch (error) {
        await createLog(`[${new Date().toISOString()}] Error fetching board by ID: ${error.message}`); // Log the error
        res.status(500).json({ message: error.message });
    }
};

// Create a new board
const createBoard = async (req, res) => {
    try {
        const { board_code } = req.body;
        await createLog(`[${new Date().toISOString()}] Creating a new board with code: ${board_code}`); // Log the action

        const newBoard = await Board.create({ board_code });
        res.status(201).json(newBoard);
    } catch (error) {
        await createLog(`[${new Date().toISOString()}] Error creating board: ${error.message}`); // Log the error
        res.status(500).json({ message: error.message });
    }
};

// Update an existing board
const updateBoard = async (req, res) => {
    try {
        const { id } = req.params;
        const { board_code } = req.body;
        await createLog(`[${new Date().toISOString()}] Updating board with ID: ${id}`); // Log the action

        const board = await Board.findByPk(id);
        if (board) {
            board.board_code = board_code;
            await board.save();
            res.status(200).json(board);
        } else {
            res.status(404).json({ message: "Board not found" });
        }
    } catch (error) {
        await createLog(`[${new Date().toISOString()}] Error updating board with ID: ${id}: ${error.message}`); // Log the error
        res.status(500).json({ message: error.message });
    }
};

// Delete a board
const deleteBoard = async (req, res) => {
    try {
        const { id } = req.params;
        await createLog(`[${new Date().toISOString()}] Deleting board with ID: ${id}`); // Log the action

        const board = await Board.findByPk(id);
        if (board) {
            await board.destroy();
            res.status(200).json({ message: "Board deleted successfully" });
        } else {
            res.status(404).json({ message: "Board not found" });
        }
    } catch (error) {
        await createLog(`[${new Date().toISOString()}] Error deleting board with ID: ${id}: ${error.message}`); // Log the error
        res.status(500).json({ message: error.message });
    }
};

// Count all boards
const countBoards = async (req, res) => {
    try {
        await createLog(`[${new Date().toISOString()}] Counting all boards`); // Log the action

        const count = await Board.count(); // Use Sequelize's count method
        res.status(200).json({ count });
    } catch (error) {
        await createLog(`[${new Date().toISOString()}] Error counting boards: ${error.message}`); // Log the error
        res.status(500).json({ message: error.message });
    }
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