const { SensorLog } = require('../models/SensorLog');  // Asegúrate de que la conexión a Sequelize y el modelo estén correctamente configurados

const getAllSensorLogs = async () => {
    return await SensorLog.findAll();
};

const getSensorLogById = async (id) => {
    return await SensorLog.findByPk(id);
};

const createSensorLog = async (logData) => {
    return await SensorLog.create(logData);
};

const updateSensorLog = async (id, logData) => {
    const sensorLog = await SensorLog.findByPk(id);
    if (sensorLog) {
        return await sensorLog.update(logData);
    }
    return null;
};

const deleteSensorLog = async (id) => {
    const sensorLog = await SensorLog.findByPk(id);
    if (sensorLog) {
        await sensorLog.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllSensorLogs,
    getSensorLogById,
    createSensorLog,
    updateSensorLog,
    deleteSensorLog
};
