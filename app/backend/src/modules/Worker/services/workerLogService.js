const WorkerRole = require('../models/WorkerRole');

const getAllWorkerRoles = async () => {
    return await WorkerRole.findAll();
};

const getWorkerRoleById = async (id) => {
    return await WorkerRole.findByPk(id);
};

const createWorkerRole = async (worker_role_name, worker_role_description) => {
    return await WorkerRole.create({ worker_role_name, worker_role_description });
};

const updateWorkerRole = async (id, worker_role_name, worker_role_description) => {
    const workerRole = await WorkerRole.findByPk(id);
    if (workerRole) {
        workerRole.worker_role_name = worker_role_name;
        workerRole.worker_role_description = worker_role_description;
        await workerRole.save();
        return workerRole;
    }
    return null;
};

const deleteWorkerRole = async (id) => {
    const workerRole = await WorkerRole.findByPk(id);
    if (workerRole) {
        await workerRole.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllWorkerRoles,
    getWorkerRoleById,
    createWorkerRole,
    updateWorkerRole,
    deleteWorkerRole
};
