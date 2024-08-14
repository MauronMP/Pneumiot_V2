const Sensor = require("../models/Sensor");

// Obtener todos los sensores
exports.getAllSensors = async (req, res) => {
  try {
    const sensors = await Sensor.findAll();
    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un sensor por ID
exports.getSensorById = async (req, res) => {
  try {
    const { id } = req.params;
    const sensor = await Sensor.findByPk(id);
    if (!sensor) {
      return res.status(404).json({ message: "Sensor not found" });
    }
    res.status(200).json(sensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo sensor
exports.createSensor = async (req, res) => {
  try {
    const { sensor_code, sensor_type, unit_id, min_value, max_value } = req.body;
    const newSensor = await Sensor.create({ sensor_code, sensor_type, unit_id, min_value, max_value });
    res.status(201).json(newSensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un sensor existente
exports.updateSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const { sensor_code, sensor_type, unit_id, min_value, max_value } = req.body;
    const updatedSensor = await Sensor.update(
      { sensor_code, sensor_type, unit_id, min_value, max_value },
      { where: { sensor_id: id } }
    );
    if (updatedSensor[0] === 0) {
      return res.status(404).json({ message: "Sensor not found" });
    }
    res.status(200).json({ message: "Sensor updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un sensor
exports.deleteSensor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Sensor.destroy({ where: { sensor_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Sensor not found" });
    }
    res.status(200).json({ message: "Sensor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
