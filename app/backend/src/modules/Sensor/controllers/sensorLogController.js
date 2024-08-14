const SensorLog = require("../models/SensorLog");

// Obtener todos los logs de sensores
exports.getAllSensorLogs = async (req, res) => {
  try {
    const sensorLogs = await SensorLog.findAll();
    res.status(200).json(sensorLogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un log de sensor por ID
exports.getSensorLogById = async (req, res) => {
  try {
    const { id } = req.params;
    const sensorLog = await SensorLog.findByPk(id);
    if (!sensorLog) {
      return res.status(404).json({ message: "Sensor log not found" });
    }
    res.status(200).json(sensorLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo log de sensor
exports.createSensorLog = async (req, res) => {
  try {
    const { board_id, sensor_id, log_message } = req.body;
    const newSensorLog = await SensorLog.create({ board_id, sensor_id, log_message });
    res.status(201).json(newSensorLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un log de sensor existente
exports.updateSensorLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { board_id, sensor_id, log_message } = req.body;
    const updatedSensorLog = await SensorLog.update(
      { board_id, sensor_id, log_message },
      { where: { log_id: id } }
    );
    if (updatedSensorLog[0] === 0) {
      return res.status(404).json({ message: "Sensor log not found" });
    }
    res.status(200).json({ message: "Sensor log updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un log de sensor
exports.deleteSensorLog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await SensorLog.destroy({ where: { log_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Sensor log not found" });
    }
    res.status(200).json({ message: "Sensor log deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
