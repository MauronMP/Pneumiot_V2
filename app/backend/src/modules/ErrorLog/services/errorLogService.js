const { ErrorLog } = require('../models/ErrorLog');

const getAllErrorLogs = async () => {
    return await ErrorLog.findAll();
};

const getErrorLogById = async (id) => {
    return await ErrorLog.findByPk(id);
};

const createErrorLog = async (errorLogData) => {
    return await ErrorLog.create(errorLogData);
};

const updateErrorLog = async (id, errorLogData) => {
    const errorLog = await ErrorLog.findByPk(id);
    if (errorLog) {
        return await errorLog.update(errorLogData);
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
