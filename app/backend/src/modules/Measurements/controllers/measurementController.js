const measurementService = require('../services/measurementService');

const getAllMeasurements = async (req, res) => {
    await measurementService.getAllMeasurements(req, res);
};

const getMeasurementById = async (req, res) => {
    await measurementService.getMeasurementById(req, res);
};

const createMeasurement = async (req, res) => {
    await measurementService.createMeasurement(req, res);
};

const updateMeasurement = async (req, res) => {
    await measurementService.updateMeasurement(req, res);
};

const deleteMeasurement = async (req, res) => {
    await measurementService.deleteMeasurement(req, res);
};

module.exports = {
    getAllMeasurements,
    getMeasurementById,
    createMeasurement,
    updateMeasurement,
    deleteMeasurement
};
