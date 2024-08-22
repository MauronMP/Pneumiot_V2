const Measurement = require('../models/Measurement');

const getAllMeasurements = async (req, res) => {
    try {
        const measurements = await Measurement.findAll();
        res.status(200).json(measurements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMeasurementById = async (req, res) => {
    try {
        const { measurement_id } = req.params;
        const measurement = await Measurement.findByPk(measurement_id);
        if (measurement) {
            res.status(200).json(measurement);
        } else {
            res.status(404).json({ message: "Measurement not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMeasurement = async (req, res) => {
    try {
        const { patient_id, board_id, sensor_id, sensor_value, log_time_utc, log_time_local } = req.body;
        const newMeasurement = await Measurement.create({ patient_id, board_id, sensor_id, sensor_value, log_time_utc, log_time_local });
        res.status(201).json(newMeasurement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMeasurement = async (req, res) => {
    try {
        const { measurement_id } = req.params;
        const { patient_id, board_id, sensor_id, sensor_value, log_time_utc, log_time_local } = req.body;
        
        const measurement = await Measurement.findByPk(measurement_id);

        if (measurement) {
            measurement.patient_id = patient_id;
            measurement.board_id = board_id;
            measurement.sensor_id = sensor_id;
            measurement.sensor_value = sensor_value;
            measurement.log_time_utc = log_time_utc;
            measurement.log_time_local = log_time_local;

            await measurement.save();
            res.status(200).json(measurement);
        } else {
            res.status(404).json({ message: "Measurement not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMeasurement = async (req, res) => {
    try {
        const { measurement_id } = req.params;

        const measurement = await Measurement.findByPk(measurement_id);

        if (measurement) {
            await measurement.destroy();
            res.status(200).json({ message: "Measurement deleted successfully" });
        } else {
            res.status(404).json({ message: "Measurement not found" });
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
