const WorkerLog = require('../models/WorkerLog');

// Obtener todos los logs de trabajadores
const getAllWorkerLogs = async () => {
    try {
        const workerLogs = await WorkerLog.findAll({
            order: [['log_id', 'DESC']] // Cambia 'createdAt' por la columna que desees ordenar
        });
        return workerLogs;
    } catch (error) {
        throw new Error('Error fetching worker logs: ' + error.message);
    }
};


// Obtener un log de trabajador por su ID
const getWorkerLogById = async (id) => {
    try {
        const workerLog = await WorkerLog.findByPk(id);
        return workerLog;
    } catch (error) {
        throw new Error('Error fetching worker log by ID: ' + error.message);
    }
};

// Crear un nuevo log de trabajador
const createWorkerLog = async (worker_id, log_message) => {
    try {
        const newWorkerLog = await WorkerLog.create({
            worker_id,
            log_message,
        });
        return newWorkerLog;
    } catch (error) {
        throw new Error('Error creating worker log: ' + error.message);
    }
};

// Actualizar un log de trabajador por su ID
const updateWorkerLog = async (id, worker_id, log_message) => {
    try {
        const workerLog = await WorkerLog.findByPk(id);
        if (workerLog) {
            workerLog.worker_id = worker_id;
            workerLog.log_message = log_message;
            await workerLog.save();
            return workerLog;
        }
        return null;
    } catch (error) {
        throw new Error('Error updating worker log: ' + error.message);
    }
};

// Eliminar un log de trabajador por su ID
const deleteWorkerLog = async (id) => {
    try {
        const result = await WorkerLog.destroy({ where: { log_id: id } });
        return result; // Devuelve 1 si se eliminó el registro, 0 si no se encontró
    } catch (error) {
        throw new Error('Error deleting worker log: ' + error.message);
    }
};

module.exports = {
    getAllWorkerLogs,
    getWorkerLogById,
    createWorkerLog,
    updateWorkerLog,
    deleteWorkerLog,
};
