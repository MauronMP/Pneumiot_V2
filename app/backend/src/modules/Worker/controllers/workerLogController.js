const workerRoleService = require('../services/workerRoleService');

const getAllWorkerRoles = async (req, res) => {
    try {
        const workerRoles = await workerRoleService.getAllWorkerRoles();
        res.status(200).json(workerRoles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWorkerRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const workerRole = await workerRoleService.getWorkerRoleById(id);
        if (workerRole) {
            res.status(200).json(workerRole);
        } else {
            res.status(404).json({ message: "WorkerRole not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createWorkerRole = async (req, res) => {
    try {
        const { worker_role_name, worker_role_description } = req.body;
        const newWorkerRole = await workerRoleService.createWorkerRole(worker_role_name, worker_role_description);
        res.status(201).json(newWorkerRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateWorkerRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { worker_role_name, worker_role_description } = req.body;
        const updatedWorkerRole = await workerRoleService.updateWorkerRole(id, worker_role_name, worker_role_description);
        if (updatedWorkerRole) {
            res.status(200).json(updatedWorkerRole);
        } else {
            res.status(404).json({ message: "WorkerRole not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteWorkerRole = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await workerRoleService.deleteWorkerRole(id);
        if (result) {
            res.status(200).json({ message: "WorkerRole deleted successfully" });
        } else {
            res.status(404).json({ message: "WorkerRole not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllWorkerRoles,
    getWorkerRoleById,
    createWorkerRole,
    updateWorkerRole,
    deleteWorkerRole
};
