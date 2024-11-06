const SensorLog = require('../models/SensorLog');

const getAllSensorLogs = async () => {
    return await SensorLog.findAll({
        order: [['log_id', 'DESC']] // Cambia 'createdAt' por la columna que desees ordenar
    });
};

const getSensorLogById = async (id) => {
    return await SensorLog.findByPk(id);
};

const createSensorLog = async (board_id, sensor_id, log_message) => {
    return await SensorLog.create({ board_id, sensor_id, log_message });
};

const updateSensorLog = async (id, board_id, sensor_id, log_message) => {
    const sensorLog = await SensorLog.findByPk(id);
    if (sensorLog) {
        sensorLog.board_id = board_id;
        sensorLog.sensor_id = sensor_id;
        sensorLog.log_message = log_message;
        await sensorLog.save();
        return sensorLog;
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
