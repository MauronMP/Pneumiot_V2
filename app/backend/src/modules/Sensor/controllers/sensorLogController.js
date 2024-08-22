const sensorLogService = require('../services/sensorLogService');

const getAllSensorLogs = async (req, res) => {
    try {
        const sensorLogs = await sensorLogService.getAllSensorLogs();
        res.status(200).json(sensorLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSensorLogById = async (req, res) => {
    try {
        const { id } = req.params;
        const sensorLog = await sensorLogService.getSensorLogById(id);
        if (sensorLog) {
            res.status(200).json(sensorLog);
        } else {
            res.status(404).json({ message: "Sensor log not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSensorLog = async (req, res) => {
    try {
        const { board_id, sensor_id, log_message } = req.body;
        const newSensorLog = await sensorLogService.createSensorLog(board_id, sensor_id, log_message);
        res.status(201).json(newSensorLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSensorLog = async (req, res) => {
    try {
        const { id } = req.params;
        const { board_id, sensor_id, log_message } = req.body;
        const updatedSensorLog = await sensorLogService.updateSensorLog(id, board_id, sensor_id, log_message);
        if (updatedSensorLog) {
            res.status(200).json(updatedSensorLog);
        } else {
            res.status(404).json({ message: "Sensor log not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSensorLog = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sensorLogService.deleteSensorLog(id);
        if (result) {
            res.status(200).json({ message: "Sensor log deleted successfully" });
        } else {
            res.status(404).json({ message: "Sensor log not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSensorLogs,
    getSensorLogById,
    createSensorLog,
    updateSensorLog,
    deleteSensorLog
};
