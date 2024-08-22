const WorkerAuth = require('../models/WorkerAuth');

const getAllWorkerAuths = async () => {
    return await WorkerAuth.findAll();
};

const getWorkerAuthById = async (id) => {
    return await WorkerAuth.findByPk(id);
};

const createWorkerAuth = async (worker_id, passwd_auth) => {
    return await WorkerAuth.create({ worker_id, passwd_auth });
};

const updateWorkerAuth = async (id, worker_id, passwd_auth) => {
    const workerAuth = await WorkerAuth.findByPk(id);
    if (workerAuth) {
        workerAuth.worker_id = worker_id;
        workerAuth.passwd_auth = passwd_auth;
        await workerAuth.save();
        return workerAuth;
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
