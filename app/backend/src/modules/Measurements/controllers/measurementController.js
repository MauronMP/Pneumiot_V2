const measurementService = require('../services/measurementService');

const Measurement = require('../models/Measurement');

const getMeasurementsByPatientId = async (req, res) => {
    try {
        const { patient_id } = req.params;
        const measurements = await measurementService.getMeasurementsByPatientId(patient_id);
        res.status(200).json(measurements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las mediciones
const getAllMeasurements = async (req, res) => {
    try {
        const measurements = await measurementService.getAllMeasurements();
        res.status(200).json(measurements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una medición por ID
const getMeasurementById = async (req, res) => {
    try {
        const { measurement_id } = req.params;
        const measurement = await measurementService.getMeasurementById(measurement_id);
        if (!measurement) {
            return res.status(404).json({ message: 'Measurement not found' });
        }
        res.status(200).json(measurement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva medición
const createMeasurement = async (req, res) => {
    try {
        const { patient_id, board_id, sensor_id, sensor_value, log_time_utc, log_time_local } = req.body;
        const newMeasurement = await measurementService.createMeasurement({
            patient_id, board_id, sensor_id, sensor_value, log_time_utc, log_time_local
        });
        res.status(201).json(newMeasurement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una medición existente
const updateMeasurement = async (req, res) => {
    try {
        const { measurement_id } = req.params;
        const updates = req.body;
        const updatedMeasurement = await measurementService.updateMeasurement(measurement_id, updates);
        if (!updatedMeasurement) {
            return res.status(404).json({ message: 'Measurement not found' });
        }
        res.status(200).json(updatedMeasurement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una medición
const deleteMeasurement = async (req, res) => {
    try {
        const { measurement_id } = req.params;
        const deleted = await measurementService.deleteMeasurement(measurement_id);
        if (!deleted) {
            return res.status(404).json({ message: 'Measurement not found' });
        }
        res.status(204).json(); // No content
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getMeasurementsByPatientId,
    getAllMeasurements,
    getMeasurementById,
    createMeasurement,
    updateMeasurement,
    deleteMeasurement
};
