const { Measurement } = require('../models/Measurement');

const getAllMeasurements = async () => {
    return await Measurement.findAll();
};

const getMeasurementById = async (id) => {
    return await Measurement.findByPk(id);
};

const createMeasurement = async (measurementData) => {
    return await Measurement.create(measurementData);
};

const updateMeasurement = async (id, measurementData) => {
    const measurement = await Measurement.findByPk(id);
    if (measurement) {
        return await measurement.update(measurementData);
    }
    return null;
};

const deleteMeasurement = async (id) => {
    const measurement = await Measurement.findByPk(id);
    if (measurement) {
        await measurement.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllMeasurements,
    getMeasurementById,
    createMeasurement,
    updateMeasurement,
    deleteMeasurement
};
