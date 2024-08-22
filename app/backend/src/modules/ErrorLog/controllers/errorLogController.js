const errorLogService = require('../services/errorLogService');

const getAllErrorLogs = async (req, res) => {
    try {
        const errorLogs = await errorLogService.getAllErrorLogs();
        res.json(errorLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getErrorLogById = async (req, res) => {
    try {
        const errorLog = await errorLogService.getErrorLogById(req.params.id);
        if (errorLog) {
            res.json(errorLog);
        } else {
            res.status(404).json({ message: 'ErrorLog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createErrorLog = async (req, res) => {
    try {
        const { log_message } = req.body;
        const newErrorLog = await errorLogService.createErrorLog({ log_message });
        res.status(201).json(newErrorLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateErrorLog = async (req, res) => {
    try {
        const updatedErrorLog = await errorLogService.updateErrorLog(req.params.id, req.body);
        if (updatedErrorLog) {
            res.json(updatedErrorLog);
        } else {
            res.status(404).json({ message: 'ErrorLog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteErrorLog = async (req, res) => {
    try {
        const result = await errorLogService.deleteErrorLog(req.params.id);
        if (result) {
            res.json({ message: 'ErrorLog deleted successfully' });
        } else {
            res.status(404).json({ message: 'ErrorLog not found' });
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
