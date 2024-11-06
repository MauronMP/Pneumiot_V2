const Log = require('../models/Log');

const getAllLogs = async () => {
    return await Log.findAll({
        order: [['log_id', 'DESC']] // Cambia 'createdAt' por la columna que desees ordenar
    });
};

const getLogById = async (id) => {
    return await Log.findByPk(id);
};

const createLog = async (log_message) => {
    return await Log.create({ log_message });
};

const updateLog = async (id, log_message) => {
    const Log = await Log.findByPk(id);
    if (Log) {
        Log.log_message = log_message;
        await Log.save();
        return Log;
    }
    return null;
};

const deleteLog = async (id) => {
    const Log = await Log.findByPk(id);
    if (Log) {
        await Log.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllLogs,
    getLogById,
    createLog,
    updateLog,
    deleteLog
};
