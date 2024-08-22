const workerService = require('../services/workerService');

const getAllWorkers = async (req, res) => {
    try {
        const workers = await workerService.getAllWorkers();
        res.json(workers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWorkerById = async (req, res) => {
    try {
        const worker = await workerService.getWorkerById(req.params.id);
        if (worker) {
            res.json(worker);
        } else {
            res.status(404).json({ message: 'Worker not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createWorker = async (req, res) => {
    try {
        const newWorker = await workerService.createWorker(req.body);
        res.status(201).json(newWorker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateWorker = async (req, res) => {
    try {
        const updatedWorker = await workerService.updateWorker(req.params.id, req.body);
        if (updatedWorker) {
            res.json(updatedWorker);
        } else {
            res.status(404).json({ message: 'Worker not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteWorker = async (req, res) => {
    try {
        const result = await workerService.deleteWorker(req.params.id);
        if (result) {
            res.json({ message: 'Worker deleted successfully' });
        } else {
            res.status(404).json({ message: 'Worker not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllWorkers,
    getWorkerById,
    createWorker,
    updateWorker,
    deleteWorker
};
