const Worker = require('../models/Worker');
const WorkerAuth = require('../models/WorkerAuth');
const { getAllWorkersWithRoleQuery } = require('../queries/workerQueries'); // Importa la consulta


const fetchAllWorkersWithRole = async (worker_id) => {
    try {
        const workersWithRoles = await getAllWorkersWithRoleQuery(worker_id);
        return workersWithRoles;
    } catch (error) {
        console.log(error);
        throw new Error('Error executing query');
    }
};

const createWorker = async (workerData) => {
    return await Worker.create(workerData);
};

const getAllWorkers = async () => {
    return await Worker.findAll();
};

const getWorkerById = async (id) => {
    return await Worker.findByPk(id);
};
const updateWorkerAuth = async (worker_id, workerData) => {
    // Buscar el registro de autenticación del trabajador utilizando 'worker_id'
    const workerAuth = await WorkerAuth.findOne({ where: { worker_id: worker_id } });

    if (workerAuth) {
        // Actualizar el registro con los nuevos datos proporcionados
        await workerAuth.update(workerData);
        return workerAuth;
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

const updateWorker = async (id, workerData) => {
    // Buscar al trabajador utilizando el 'worker_id'
    const worker = await Worker.findByPk(id);
    if (worker) {
        // Actualizar los datos del trabajador con la información proporcionada
        await worker.update(workerData);
        return worker;
    }

    return null; // Devuelve null si no se encuentra el trabajador
};

module.exports = {
    getAllWorkers,
    getWorkerById,
    createWorker,
    updateWorkerAuth,
    deleteWorker,
    updateWorker,
    fetchAllWorkersWithRole
};
