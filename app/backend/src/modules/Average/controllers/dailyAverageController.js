// src/controllers/dailyAverageController.js
const DailyAverage = require("../models/DailyAverage");

// Obtener todos los promedios diarios
exports.getAllDailyAverages = async (req, res) => {
  try {
    const dailyAverages = await DailyAverage.findAll();
    res.status(200).json(dailyAverages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un promedio diario por ID
exports.getDailyAverageById = async (req, res) => {
  try {
    const { id } = req.params;
    const dailyAverage = await DailyAverage.findByPk(id);
    if (!dailyAverage) {
      return res.status(404).json({ message: "Daily average not found" });
    }
    res.status(200).json(dailyAverage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo promedio diario
exports.createDailyAverage = async (req, res) => {
  try {
    const { patient_id, board_id, sensor_id, average_measure, index_rate_id, daily_day, month_id } = req.body;
    const newDailyAverage = await DailyAverage.create({ patient_id, board_id, sensor_id, average_measure, index_rate_id, daily_day, month_id });
    res.status(201).json(newDailyAverage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un promedio diario existente
exports.updateDailyAverage = async (req, res) => {
  try {
    const { id } = req.params;
    const { patient_id, board_id, sensor_id, average_measure, index_rate_id, daily_day, month_id } = req.body;
    const updatedDailyAverage = await DailyAverage.update(
      { patient_id, board_id, sensor_id, average_measure, index_rate_id, daily_day, month_id },
      { where: { daily_average_id: id } }
    );
    if (updatedDailyAverage[0] === 0) {
      return res.status(404).json({ message: "Daily average not found" });
    }
    res.status(200).json({ message: "Daily average updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un promedio diario
exports.deleteDailyAverage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await DailyAverage.destroy({ where: { daily_average_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Daily average not found" });
    }
    res.status(200).json({ message: "Daily average deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
