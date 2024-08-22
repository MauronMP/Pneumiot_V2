const sensorLogService = require('../services/sensorLogService');

const getAllSensorLogs = async (req, res) => {
    try {
        const sensorLogs = await sensorLogService.getAllSensorLogs();
        res.json(sensorLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSensorLogById = async (req, res) => {
    try {
        const sensorLog = await sensorLogService.getSensorLogById(req.params.id);
        if (sensorLog) {
            res.json(sensorLog);
        } else {
            res.status(404).json({ message: 'Sensor log not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSensorLog = async (req, res) => {
    try {
        const { board_id, sensor_id, log_message } = req.body;
        const newSensorLog = await sensorLogService.createSensorLog({ board_id, sensor_id, log_message });
        res.status(201).json(newSensorLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSensorLog = async (req, res) => {
    try {
        const updatedSensorLog = await sensorLogService.updateSensorLog(req.params.id, req.body);
        if (updatedSensorLog) {
            res.json(updatedSensorLog);
        } else {
            res.status(404).json({ message: 'Sensor log not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSensorLog = async (req, res) => {
    try {
        const result = await sensorLogService.deleteSensorLog(req.params.id);
        if (result) {
            res.json({ message: 'Sensor log deleted successfully' });
        } else {
            res.status(404).json({ message: 'Sensor log not found' });
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
