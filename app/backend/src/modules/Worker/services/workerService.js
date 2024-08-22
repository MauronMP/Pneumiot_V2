const Worker = require('../models/Worker');

const getAllWorkers = async () => {
    return await Worker.findAll();
};

const getWorkerById = async (id) => {
    return await Worker.findByPk(id);
};

const createWorker = async (worker_dni, worker_email, worker_name, worker_surname, worker_role_id) => {
    return await Worker.create({ worker_dni, worker_email, worker_name, worker_surname, worker_role_id });
};

const updateWorker = async (id, worker_dni, worker_email, worker_name, worker_surname, worker_role_id) => {
    const worker = await Worker.findByPk(id);
    if (worker) {
        worker.worker_dni = worker_dni;
        worker.worker_email = worker_email;
        worker.worker_name = worker_name;
        worker.worker_surname = worker_surname;
        worker.worker_role_id = worker_role_id;
        await worker.save();
        return worker;
    }
    return null;
};

const deleteWorker = async (id) => {
    const worker = await Worker.findByPk(id);
    if (worker) {
        await worker.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllWorkers,
    getWorkerById,
    createWorker,
    updateWorker,
    deleteWorker
};
