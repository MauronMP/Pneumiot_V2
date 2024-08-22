const workerService = require('../services/workerService');

const getAllWorkers = async (req, res) => {
    try {
        const workers = await workerService.getAllWorkers();
        res.status(200).json(workers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWorkerById = async (req, res) => {
    try {
        const { id } = req.params;
        const worker = await workerService.getWorkerById(id);
        if (worker) {
            res.status(200).json(worker);
        } else {
            res.status(404).json({ message: "Worker not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createWorker = async (req, res) => {
    try {
        const { worker_dni, worker_email, worker_name, worker_surname, worker_role_id } = req.body;
        const newWorker = await workerService.createWorker(worker_dni, worker_email, worker_name, worker_surname, worker_role_id);
        res.status(201).json(newWorker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateWorker = async (req, res) => {
    try {
        const { id } = req.params;
        const { worker_dni, worker_email, worker_name, worker_surname, worker_role_id } = req.body;
        const updatedWorker = await workerService.updateWorker(id, worker_dni, worker_email, worker_name, worker_surname, worker_role_id);
        if (updatedWorker) {
            res.status(200).json(updatedWorker);
        } else {
            res.status(404).json({ message: "Worker not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteWorker = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await workerService.deleteWorker(id);
        if (result) {
            res.status(200).json({ message: "Worker deleted successfully" });
        } else {
            res.status(404).json({ message: "Worker not found" });
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
