const workerLogService = require('../services/workerLogService');

const getAllWorkerLogs = async (req, res) => {
    try {
        const workerLogs = await workerLogService.getAllWorkerLogs();
        res.json(workerLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWorkerLogById = async (req, res) => {
    try {
        const workerLog = await workerLogService.getWorkerLogById(req.params.id);
        if (workerLog) {
            res.json(workerLog);
        } else {
            res.status(404).json({ message: 'WorkerLog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createWorkerLog = async (req, res) => {
    try {
        const newWorkerLog = await workerLogService.createWorkerLog(req.body);
        res.status(201).json(newWorkerLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateWorkerLog = async (req, res) => {
    try {
        const updatedWorkerLog = await workerLogService.updateWorkerLog(req.params.id, req.body);
        if (updatedWorkerLog) {
            res.json(updatedWorkerLog);
        } else {
            res.status(404).json({ message: 'WorkerLog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteWorkerLog = async (req, res) => {
    try {
        const result = await workerLogService.deleteWorkerLog(req.params.id);
        if (result) {
            res.json({ message: 'WorkerLog deleted successfully' });
        } else {
            res.status(404).json({ message: 'WorkerLog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllWorkerLogs,
    getWorkerLogById,
    createWorkerLog,
    updateWorkerLog,
    deleteWorkerLog
};
