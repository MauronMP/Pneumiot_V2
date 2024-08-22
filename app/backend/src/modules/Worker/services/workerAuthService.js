const { WorkerAuth, Worker } = require('../models/WorkerAuth');

const getAllWorkerAuths = async () => {
    return await WorkerAuth.findAll({
        include: [
            { model: Worker, attributes: ['worker_id', 'worker_name', 'worker_surname'] }
        ]
    });
};

const getWorkerAuthById = async (id) => {
    return await WorkerAuth.findByPk(id, {
        include: [
            { model: Worker, attributes: ['worker_id', 'worker_name', 'worker_surname'] }
        ]
    });
};

const createWorkerAuth = async (workerAuthData) => {
    return await WorkerAuth.create(workerAuthData);
};

const updateWorkerAuth = async (id, workerAuthData) => {
    const workerAuth = await WorkerAuth.findByPk(id);
    if (workerAuth) {
        return await workerAuth.update(workerAuthData);
    }
    return null;
};

const deleteWorkerAuth = async (id) => {
    const workerAuth = await WorkerAuth.findByPk(id);
    if (workerAuth) {
        await workerAuth.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllWorkerAuths,
    getWorkerAuthById,
    createWorkerAuth,
    updateWorkerAuth,
    deleteWorkerAuth
};
