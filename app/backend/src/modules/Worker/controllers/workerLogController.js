const workerLogService = require('../services/workerLogService');

const getAllWorkerLogs = async (req, res) => {
    try {
        const workerLogs = await workerLogService.getAllWorkerLogs();
        res.status(200).json(workerLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWorkerLogById = async (req, res) => {
    try {
        const { id } = req.params;
        const workerLog = await workerLogService.getWorkerLogById(id);
        if (workerLog) {
            res.status(200).json(workerLog);
        } else {
            res.status(404).json({ message: "WorkerLog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createWorkerLog = async (req, res) => {
    try {
        const { worker_id, log_message } = req.body;
        const newWorkerLog = await workerLogService.createWorkerLog(worker_id, log_message);
        res.status(201).json(newWorkerLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateWorkerLog = async (req, res) => {
    try {
        const { id } = req.params;
        const { worker_id, log_message } = req.body;
        const updatedWorkerLog = await workerLogService.updateWorkerLog(id, worker_id, log_message);
        if (updatedWorkerLog) {
            res.status(200).json(updatedWorkerLog);
        } else {
            res.status(404).json({ message: "WorkerLog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteWorkerLog = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await workerLogService.deleteWorkerLog(id);
        if (result) {
            res.status(200).json({ message: "WorkerLog deleted successfully" });
        } else {
            res.status(404).json({ message: "WorkerLog not found" });
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
