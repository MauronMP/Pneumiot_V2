// src/controllers/hourlyAverageController.js
const HourlyAverage = require("../models/HourlyAverage");

// Obtener todos los promedios horarios
exports.getAllHourlyAverages = async (req, res) => {
  try {
    const hourlyAverages = await HourlyAverage.findAll();
    res.status(200).json(hourlyAverages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un promedio horario por ID
exports.getHourlyAverageById = async (req, res) => {
  try {
    const { id } = req.params;
    const hourlyAverage = await HourlyAverage.findByPk(id);
    if (!hourlyAverage) {
      return res.status(404).json({ message: "Hourly average not found" });
    }
    res.status(200).json(hourlyAverage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo promedio horario
exports.createHourlyAverage = async (req, res) => {
  try {
    const { patient_id, board_id, sensor_id, average_measure, index_rate_id, hour_time, day_date } = req.body;
    const newHourlyAverage = await HourlyAverage.create({ patient_id, board_id, sensor_id, average_measure, index_rate_id, hour_time, day_date });
    res.status(201).json(newHourlyAverage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un promedio horario existente
exports.updateHourlyAverage = async (req, res) => {
  try {
    const { id } = req.params;
    const { patient_id, board_id, sensor_id, average_measure, index_rate_id, hour_time, day_date } = req.body;
    const updatedHourlyAverage = await HourlyAverage.update(
      { patient_id, board_id, sensor_id, average_measure, index_rate_id, hour_time, day_date },
      { where: { hourly_average_id: id } }
    );
    if (updatedHourlyAverage[0] === 0) {
      return res.status(404).json({ message: "Hourly average not found" });
    }
    res.status(200).json({ message: "Hourly average updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un promedio horario
exports.deleteHourlyAverage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await HourlyAverage.destroy({ where: { hourly_average_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Hourly average not found" });
    }
    res.status(200).json({ message: "Hourly average deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
