const Sensor = require('../models/Sensor');

// Obtener todos los sensores
const getAllSensors = async (req, res) => {
    try {
        const sensors = await Sensor.findAll();
        res.status(200).json(sensors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un sensor por ID
const getSensorById = async (req, res) => {
    try {
        const { id } = req.params;
        const sensor = await Sensor.findByPk(id);
        if (sensor) {
            res.status(200).json(sensor);
        } else {
            res.status(404).json({ message: "Sensor not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo sensor
const createSensor = async (req, res) => {
    try {
        const { sensor_code, sensor_type, unit_id, min_value, max_value } = req.body;
        const newSensor = await Sensor.create({ sensor_code, sensor_type, unit_id, min_value, max_value });
        res.status(201).json(newSensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un sensor existente
const updateSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const { sensor_code, sensor_type, unit_id, min_value, max_value } = req.body;
        const sensor = await Sensor.findByPk(id);
        if (sensor) {
            sensor.sensor_code = sensor_code;
            sensor.sensor_type = sensor_type;
            sensor.unit_id = unit_id;
            sensor.min_value = min_value;
            sensor.max_value = max_value;
            await sensor.save();
            res.status(200).json(sensor);
        } else {
            res.status(404).json({ message: "Sensor not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un sensor
const deleteSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const sensor = await Sensor.findByPk(id);
        if (sensor) {
            await sensor.destroy();
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
