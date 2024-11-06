const workerService = require('../services/workerService');
const workerAuthService = require('../services/workerAuthService');

const getAllWorkersWithRole = async (req, res) => {
    try {
        const { worker_id } = req.params;
        const workers = await workerService.fetchAllWorkersWithRole(worker_id);
        res.status(200).json(workers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
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
        const { worker_dni, worker_email, worker_name, worker_surname, worker_role_id, passwd_auth } = req.body;
        
        // Crea el trabajador
        const newWorker = await workerService.createWorker({
            worker_dni,
            worker_email,
            worker_name,
            worker_surname,
            worker_role_id
        });

        // Crea la autenticación para el trabajador
        const newWorkerAuth = await workerAuthService.createWorkerAuth(newWorker.worker_id, passwd_auth);

        res.status(201).json({ newWorker, newWorkerAuth });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateWorker = async (req, res) => {
    try {
        const { id } = req.params;
        const workerData = req.body;

        const updatedWorker = await workerService.updateWorker(id, workerData);
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

const countWorkers = async (req, res) => {
    await workerService.countWorkers(req, res);
};

module.exports = {
    countWorkers,
    getAllWorkersWithRole,
    getAllWorkers,
    getWorkerById,
    createWorker,
    updateWorker,
    deleteWorker
};
