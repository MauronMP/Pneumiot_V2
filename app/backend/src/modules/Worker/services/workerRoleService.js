const { WorkerRole } = require('../models');

const getAllWorkerRoles = async () => {
    return await WorkerRole.findAll();
};

const getWorkerRoleById = async (id) => {
    return await WorkerRole.findByPk(id);
};

const createWorkerRole = async (workerRoleData) => {
    return await WorkerRole.create(workerRoleData);
};

const updateWorkerRole = async (id, workerRoleData) => {
    const workerRole = await WorkerRole.findByPk(id);
    if (workerRole) {
        return await workerRole.update(workerRoleData);
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
