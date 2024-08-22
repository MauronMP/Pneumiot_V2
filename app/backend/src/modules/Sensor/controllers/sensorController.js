const sensorService = require('../services/sensorService');

const getAllSensors = async (req, res) => {
    try {
        const sensors = await sensorService.getAllSensors();
        res.json(sensors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSensorById = async (req, res) => {
    try {
        const sensor = await sensorService.getSensorById(req.params.id);
        if (sensor) {
            res.json(sensor);
        } else {
            res.status(404).json({ message: 'Sensor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSensor = async (req, res) => {
    try {
        const { sensor_code, sensor_type, unit_id, min_value, max_value } = req.body;
        const newSensor = await sensorService.createSensor({ sensor_code, sensor_type, unit_id, min_value, max_value });
        res.status(201).json(newSensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSensor = async (req, res) => {
    try {
        const updatedSensor = await sensorService.updateSensor(req.params.id, req.body);
        if (updatedSensor) {
            res.json(updatedSensor);
        } else {
            res.status(404).json({ message: 'Sensor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSensor = async (req, res) => {
    try {
        const result = await sensorService.deleteSensor(req.params.id);
        if (result) {
            res.json({ message: 'Sensor deleted successfully' });
        } else {
            res.status(404).json({ message: 'Sensor not found' });
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
