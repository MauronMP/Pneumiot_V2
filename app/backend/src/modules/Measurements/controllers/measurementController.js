const measurementService = require('../services/measurementService');

const getAllMeasurements = async (req, res) => {
    try {
        const measurements = await measurementService.getAllMeasurements();
        res.json(measurements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMeasurementById = async (req, res) => {
    try {
        const measurement = await measurementService.getMeasurementById(req.params.id);
        if (measurement) {
            res.json(measurement);
        } else {
            res.status(404).json({ message: 'Measurement not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMeasurement = async (req, res) => {
    try {
        const { patient_id, board_id, sensor_id, sensor_value, log_time_utc, log_time_local } = req.body;
        const newMeasurement = await measurementService.createMeasurement({ patient_id, board_id, sensor_id, sensor_value, log_time_utc, log_time_local });
        res.status(201).json(newMeasurement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMeasurement = async (req, res) => {
    try {
        const updatedMeasurement = await measurementService.updateMeasurement(req.params.id, req.body);
        if (updatedMeasurement) {
            res.json(updatedMeasurement);
        } else {
            res.status(404).json({ message: 'Measurement not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMeasurement = async (req, res) => {
    try {
        const result = await measurementService.deleteMeasurement(req.params.id);
        if (result) {
            res.json({ message: 'Measurement deleted successfully' });
        } else {
            res.status(404).json({ message: 'Measurement not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllMeasurements,
    getMeasurementById,
    createMeasurement,
    updateMeasurement,
    deleteMeasurement
};
