// src/services/workerRoleService.js
const WorkerRole = require('../models/WorkerRole');

const getAllWorkerRoles = async () => {
    try {
        return await WorkerRole.findAll();
    } catch (error) {
        throw new Error(`Error fetching worker roles: ${error.message}`);
    }
};

const getWorkerRoleById = async (id) => {
    try {
        return await WorkerRole.findByPk(id);
    } catch (error) {
        throw new Error(`Error fetching worker role by ID: ${error.message}`);
    }
};

const createWorkerRole = async (worker_role_name, worker_role_description) => {
    try {
        return await WorkerRole.create({ worker_role_name, worker_role_description });
    } catch (error) {
        throw new Error(`Error creating worker role: ${error.message}`);
    }
};

const updateWorkerRole = async (id, worker_role_name, worker_role_description) => {
    try {
        const workerRole = await WorkerRole.findByPk(id);
        if (workerRole) {
            workerRole.worker_role_name = worker_role_name;
            workerRole.worker_role_description = worker_role_description;
            await workerRole.save();
            return workerRole;
        }
        return null;
    } catch (error) {
        throw new Error(`Error updating worker role: ${error.message}`);
    }
};

const deleteWorkerRole = async (id) => {
    try {
        const workerRole = await WorkerRole.findByPk(id);
        if (workerRole) {
            await workerRole.destroy();
            return true;
        }
        return false;
    } catch (error) {
        throw new Error(`Error deleting worker role: ${error.message}`);
    }
};

module.exports = {
    getAllWorkerRoles,
    getWorkerRoleById,
    createWorkerRole,
    updateWorkerRole,
    deleteWorkerRole
};
