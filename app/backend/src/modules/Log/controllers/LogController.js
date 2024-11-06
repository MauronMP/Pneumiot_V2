const LogService = require('../services/LogService');

const getAllLogs = async (req, res) => {
    try {
        const Logs = await LogService.getAllLogs();
        res.status(200).json(Logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getLogById = async (req, res) => {
    try {
        const { id } = req.params;
        const Log = await LogService.getLogById(id);
        if (Log) {
            res.status(200).json(Log);
        } else {
            res.status(404).json({ message: "Log not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createLog = async (req, res) => {
    try {
        const { log_message } = req.body;
        const newLog = await LogService.createLog(log_message);
        res.status(201).json(newLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateLog = async (req, res) => {
    try {
        const { id } = req.params;
        const { log_message } = req.body;
        const updatedLog = await LogService.updateLog(id, log_message);
        if (updatedLog) {
            res.status(200).json(updatedLog);
        } else {
            res.status(404).json({ message: "Log not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteLog = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await LogService.deleteLog(id);
        if (result) {
            res.status(200).json({ message: "Log deleted successfully" });
        } else {
            res.status(404).json({ message: "Log not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllLogs,
    getLogById,
    createLog,
    updateLog,
    deleteLog
};
