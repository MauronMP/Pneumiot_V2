const Measurement = require("../models/Measurement");

// Obtener todas las mediciones
exports.getAllMeasurements = async (req, res) => {
  try {
    const measurements = await Measurement.findAll();
    res.status(200).json(measurements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una medición por ID
exports.getMeasurementById = async (req, res) => {
  try {
    const { id } = req.params;
    const measurement = await Measurement.findByPk(id);
    if (!measurement) {
      return res.status(404).json({ message: "Measurement not found" });
    }
    res.status(200).json(measurement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva medición
exports.createMeasurement = async (req, res) => {
  try {
    const { patient_id, board_id, sensor_id, sensor_value, log_time_utc, log_time_local } = req.body;
    const newMeasurement = await Measurement.create({ patient_id, board_id, sensor_id, sensor_value, log_time_utc, log_time_local });
    res.status(201).json(newMeasurement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una medición existente
exports.updateMeasurement = async (req, res) => {
  try {
    const { id } = req.params;
    const { patient_id, board_id, sensor_id, sensor_value, log_time_utc, log_time_local } = req.body;
    const updatedMeasurement = await Measurement.update(
      { patient_id, board_id, sensor_id, sensor_value, log_time_utc, log_time_local },
      { where: { measurement_id: id } }
    );
    if (updatedMeasurement[0] === 0) {
      return res.status(404).json({ message: "Measurement not found" });
    }
    res.status(200).json({ message: "Measurement updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una medición
exports.deleteMeasurement = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Measurement.destroy({ where: { measurement_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Measurement not found" });
    }
    res.status(200).json({ message: "Measurement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
