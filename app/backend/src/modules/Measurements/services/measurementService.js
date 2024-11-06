const Measurement = require('../models/Measurement');
// Obtener todas las mediciones
const getAllMeasurements = async () => {
    return await Measurement.findAll();
};

const getMeasurementsByPatientId = async (patient_id) => {
    return await Measurement.findAll({
        where: { patient_id }
    });
};

// Obtener una medición por ID
const getMeasurementById = async (measurement_id) => {
    return await Measurement.findByPk(measurement_id);
};

// Crear una nueva medición
const createMeasurement = async (measurementData) => {
    return await Measurement.create(measurementData);
};

// Actualizar una medición existente
const updateMeasurement = async (measurement_id, updates) => {
    const measurement = await Measurement.findByPk(measurement_id);
    if (!measurement) return null;
    return await measurement.update(updates);
};

// Eliminar una medición
const deleteMeasurement = async (measurement_id) => {
    const measurement = await Measurement.findByPk(measurement_id);
    if (!measurement) return null;
    await measurement.destroy();
    return true;
};

module.exports = {
    getMeasurementsByPatientId,
    getAllMeasurements,
    getMeasurementById,
    createMeasurement,
    updateMeasurement,
    deleteMeasurement
};