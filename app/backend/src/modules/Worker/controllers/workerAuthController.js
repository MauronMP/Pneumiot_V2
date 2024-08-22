const workerAuthService = require('../services/workerAuthService');

const getAllWorkerAuths = async (req, res) => {
    try {
        const workerAuths = await workerAuthService.getAllWorkerAuths();
        res.status(200).json(workerAuths);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWorkerAuthById = async (req, res) => {
    try {
        const { id } = req.params;
        const workerAuth = await workerAuthService.getWorkerAuthById(id);
        if (workerAuth) {
            res.status(200).json(workerAuth);
        } else {
            res.status(404).json({ message: "WorkerAuth not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createWorkerAuth = async (req, res) => {
    try {
        const { worker_id, passwd_auth } = req.body;
        const newWorkerAuth = await workerAuthService.createWorkerAuth(worker_id, passwd_auth);
        res.status(201).json(newWorkerAuth);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateWorkerAuth = async (req, res) => {
    try {
        const { id } = req.params;
        const { worker_id, passwd_auth } = req.body;
        const updatedWorkerAuth = await workerAuthService.updateWorkerAuth(id, worker_id, passwd_auth);
        if (updatedWorkerAuth) {
            res.status(200).json(updatedWorkerAuth);
        } else {
            res.status(404).json({ message: "WorkerAuth not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteWorkerAuth = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await workerAuthService.deleteWorkerAuth(id);
        if (result) {
            res.status(200).json({ message: "WorkerAuth deleted successfully" });
        } else {
            res.status(404).json({ message: "WorkerAuth not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllWorkerAuths,
    getWorkerAuthById,
    createWorkerAuth,
    updateWorkerAuth,
    deleteWorkerAuth
};
