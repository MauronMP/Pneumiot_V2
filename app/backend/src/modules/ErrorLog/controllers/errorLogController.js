const errorLogService = require('../services/errorLogService');

const getAllErrorLogs = async (req, res) => {
    try {
        const errorLogs = await errorLogService.getAllErrorLogs();
        res.status(200).json(errorLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getErrorLogById = async (req, res) => {
    try {
        const { id } = req.params;
        const errorLog = await errorLogService.getErrorLogById(id);
        if (errorLog) {
            res.status(200).json(errorLog);
        } else {
            res.status(404).json({ message: "ErrorLog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createErrorLog = async (req, res) => {
    try {
        const { log_message } = req.body;
        const newErrorLog = await errorLogService.createErrorLog(log_message);
        res.status(201).json(newErrorLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateErrorLog = async (req, res) => {
    try {
        const { id } = req.params;
        const { log_message } = req.body;
        const updatedErrorLog = await errorLogService.updateErrorLog(id, log_message);
        if (updatedErrorLog) {
            res.status(200).json(updatedErrorLog);
        } else {
            res.status(404).json({ message: "ErrorLog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteErrorLog = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await errorLogService.deleteErrorLog(id);
        if (result) {
            res.status(200).json({ message: "ErrorLog deleted successfully" });
        } else {
            res.status(404).json({ message: "ErrorLog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllErrorLogs,
    getErrorLogById,
    createErrorLog,
    updateErrorLog,
    deleteErrorLog
};
