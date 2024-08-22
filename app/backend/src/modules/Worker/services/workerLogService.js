const { WorkerLog, Worker } = require('../models');

const getAllWorkerLogs = async () => {
    return await WorkerLog.findAll({
        include: [
            { model: Worker, attributes: ['worker_id', 'worker_name', 'worker_surname'] }
        ]
    });
};

const getWorkerLogById = async (id) => {
    return await WorkerLog.findByPk(id, {
        include: [
            { model: Worker, attributes: ['worker_id', 'worker_name', 'worker_surname'] }
        ]
    });
};

const createWorkerLog = async (workerLogData) => {
    return await WorkerLog.create(workerLogData);
};

const updateWorkerLog = async (id, workerLogData) => {
    const workerLog = await WorkerLog.findByPk(id);
    if (workerLog) {
        return await workerLog.update(workerLogData);
    }
    return null;
};

const deleteWorkerLog = async (id) => {
    const workerLog = await WorkerLog.findByPk(id);
    if (workerLog) {
        await workerLog.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllWorkerLogs,
    getWorkerLogById,
    createWorkerLog,
    updateWorkerLog,
    deleteWorkerLog
};
