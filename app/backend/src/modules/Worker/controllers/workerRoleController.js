const workerRoleService = require('../services/workerRoleService');

const getAllWorkerRoles = async (req, res) => {
    try {
        const workerRoles = await workerRoleService.getAllWorkerRoles();
        res.json(workerRoles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWorkerRoleById = async (req, res) => {
    try {
        const workerRole = await workerRoleService.getWorkerRoleById(req.params.id);
        if (workerRole) {
            res.json(workerRole);
        } else {
            res.status(404).json({ message: 'WorkerRole not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createWorkerRole = async (req, res) => {
    try {
        const newWorkerRole = await workerRoleService.createWorkerRole(req.body);
        res.status(201).json(newWorkerRole);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateWorkerRole = async (req, res) => {
    try {
        const updatedWorkerRole = await workerRoleService.updateWorkerRole(req.params.id, req.body);
        if (updatedWorkerRole) {
            res.json(updatedWorkerRole);
        } else {
            res.status(404).json({ message: 'WorkerRole not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteWorkerRole = async (req, res) => {
    try {
        const result = await workerRoleService.deleteWorkerRole(req.params.id);
        if (result) {
            res.json({ message: 'WorkerRole deleted successfully' });
        } else {
            res.status(404).json({ message: 'WorkerRole not found' });
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
