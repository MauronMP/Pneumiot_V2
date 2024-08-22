const sensorService = require('../services/sensorService');

const getAllSensors = async (req, res) => {
    try {
        const sensors = await sensorService.getAllSensors();
        res.status(200).json(sensors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSensorById = async (req, res) => {
    try {
        const { id } = req.params;
        const sensor = await sensorService.getSensorById(id);
        if (sensor) {
            res.status(200).json(sensor);
        } else {
            res.status(404).json({ message: "Sensor not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSensor = async (req, res) => {
    try {
        const { sensor_code, sensor_type, unit_id, min_value, max_value } = req.body;
        const newSensor = await sensorService.createSensor(sensor_code, sensor_type, unit_id, min_value, max_value);
        res.status(201).json(newSensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const { sensor_code, sensor_type, unit_id, min_value, max_value } = req.body;
        const updatedSensor = await sensorService.updateSensor(id, sensor_code, sensor_type, unit_id, min_value, max_value);
        if (updatedSensor) {
            res.status(200).json(updatedSensor);
        } else {
            res.status(404).json({ message: "Sensor not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sensorService.deleteSensor(id);
        if (result) {
            res.status(200).json({ message: "Sensor deleted successfully" });
        } else {
            res.status(404).json({ message: "Sensor not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSensors,
    getSensorById,
    createSensor,
    updateSensor,
    deleteSensor
};
