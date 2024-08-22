const ErrorLog = require('../models/ErrorLog');

const getAllErrorLogs = async () => {
    return await ErrorLog.findAll();
};

const getErrorLogById = async (id) => {
    return await ErrorLog.findByPk(id);
};

const createErrorLog = async (log_message) => {
    return await ErrorLog.create({ log_message });
};

const updateErrorLog = async (id, log_message) => {
    const errorLog = await ErrorLog.findByPk(id);
    if (errorLog) {
        errorLog.log_message = log_message;
        await errorLog.save();
        return errorLog;
    }
    return null;
};

const deleteErrorLog = async (id) => {
    const errorLog = await ErrorLog.findByPk(id);
    if (errorLog) {
        await errorLog.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllErrorLogs,
    getErrorLogById,
    createErrorLog,
    updateErrorLog,
    deleteErrorLog
};
