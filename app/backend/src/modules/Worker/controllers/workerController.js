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
        // Log para ver el cuerpo de la solicitud
        console.log("Request Body:", req.body);

        const { worker_dni, worker_email, worker_name, worker_surname, worker_role_id, passwd_auth } = req.body;

        // Validación de datos
        if (!worker_dni || !worker_email || !worker_name || !worker_surname || !worker_role_id || !passwd_auth) {
            console.error("Missing required fields:", {
                worker_dni,
                worker_email,
                worker_name,
                worker_surname,
                worker_role_id,
                passwd_auth
            });
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Intento de crear el trabajador
        console.log("Creating worker with data:", {
            worker_dni,
            worker_email,
            worker_name,
            worker_surname,
            worker_role_id
        });

        const newWorker = await workerService.createWorker({
            worker_dni,
            worker_email,
            worker_name,
            worker_surname,
            worker_role_id
        });

        console.log("Worker created:", newWorker);

        // Intento de crear la autenticación para el trabajador
        console.log("Creating worker auth for worker_id:", newWorker.worker_id);
        
        const newWorkerAuth = await workerAuthService.createWorkerAuth(newWorker.worker_id, passwd_auth);

        console.log("Worker Auth created:", newWorkerAuth);

        res.status(201).json({ newWorker, newWorkerAuth });
    } catch (error) {
        console.error("Error in createWorker:", error);
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
