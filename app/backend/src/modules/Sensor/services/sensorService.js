const { Sensor } = require('../models/Sensor');  // Asegúrate de que la conexión a Sequelize y el modelo estén correctamente configurados

const getAllSensors = async () => {
    return await Sensor.findAll();
};

const getSensorById = async (id) => {
    return await Sensor.findByPk(id);
};

const createSensor = async (sensorData) => {
    return await Sensor.create(sensorData);
};

const updateSensor = async (id, sensorData) => {
    const sensor = await Sensor.findByPk(id);
    if (sensor) {
        return await sensor.update(sensorData);
    }
    return null;
};

const deleteSensor = async (id) => {
    const sensor = await Sensor.findByPk(id);
    if (sensor) {
        await sensor.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllSensors,
    getSensorById,
    createSensor,
    updateSensor,
    deleteSensor
};
