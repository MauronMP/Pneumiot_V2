const workerAuthService = require('../services/workerAuthService');

const getAllWorkerAuths = async (req, res) => {
    try {
        const workerAuths = await workerAuthService.getAllWorkerAuths();
        res.json(workerAuths);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWorkerAuthById = async (req, res) => {
    try {
        const workerAuth = await workerAuthService.getWorkerAuthById(req.params.id);
        if (workerAuth) {
            res.json(workerAuth);
        } else {
            res.status(404).json({ message: 'WorkerAuth not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createWorkerAuth = async (req, res) => {
    try {
        const newWorkerAuth = await workerAuthService.createWorkerAuth(req.body);
        res.status(201).json(newWorkerAuth);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateWorkerAuth = async (req, res) => {
    try {
        const updatedWorkerAuth = await workerAuthService.updateWorkerAuth(req.params.id, req.body);
        if (updatedWorkerAuth) {
            res.json(updatedWorkerAuth);
        } else {
            res.status(404).json({ message: 'WorkerAuth not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteWorkerAuth = async (req, res) => {
    try {
        const result = await workerAuthService.deleteWorkerAuth(req.params.id);
        if (result) {
            res.json({ message: 'WorkerAuth deleted successfully' });
        } else {
            res.status(404).json({ message: 'WorkerAuth not found' });
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
