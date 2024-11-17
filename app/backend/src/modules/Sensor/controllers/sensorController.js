const sensorService = require('../services/sensorService');

// Obtener todos los sensores
const getAllSensors = async (req, res) => {
    try {
        const sensors = await sensorService.getAllSensors();
        res.status(200).json(sensors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un sensor por su ID
const getSensorById = async (req, res) => {
    try {
        const { id } = req.params;
        const sensor = await sensorService.getSensorById(id);
        if (sensor) {
            res.status(200).json(sensor);
        } else {
            res.status(404).json({ message: 'Sensor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo sensor
const createSensor = async (req, res) => {
    try {
        const sensorData = req.body;
        const newSensor = await sensorService.createSensor(sensorData);
        res.status(201).json(newSensor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un sensor existente
const updateSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const sensorData = req.body;
        const updatedSensor = await sensorService.updateSensor(id, sensorData);
        if (updatedSensor) {
            res.status(200).json(updatedSensor);
        } else {
            res.status(404).json({ message: 'Sensor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un sensor
const deleteSensor = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sensorService.deleteSensor(id);
        if (result) {
            res.status(200).json({ message: 'Sensor deleted successfully' });
        } else {
            res.status(404).json({ message: 'Sensor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const countSensors = async (req, res) => {
    await sensorService.countSensors(req, res);
};

// Obtener información de un sensor y su unidad asociada
const getSensorInformation = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID del parámetro de la URL
        const sensor = await sensorService.getSensorInformation(id);
        if (sensor) {
            res.status(200).json(sensor); // Retorna el sensor con su unidad asociada
        } else {
            res.status(404).json({ message: 'Sensor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getSensorInformation,
    countSensors,
    getAllSensors,
    getSensorById,
    createSensor,
    updateSensor,
    deleteSensor,
};
