// src/controllers/monthlyAverageController.js
const MonthlyAverage = require("../models/MonthlyAverage");

// Obtener todos los promedios mensuales
exports.getAllMonthlyAverages = async (req, res) => {
  try {
    const monthlyAverages = await MonthlyAverage.findAll();
    res.status(200).json(monthlyAverages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un promedio mensual por ID
exports.getMonthlyAverageById = async (req, res) => {
  try {
    const { id } = req.params;
    const monthlyAverage = await MonthlyAverage.findByPk(id);
    if (!monthlyAverage) {
      return res.status(404).json({ message: "Monthly average not found" });
    }
    res.status(200).json(monthlyAverage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo promedio mensual
exports.createMonthlyAverage = async (req, res) => {
  try {
    const { patient_id, board_id, sensor_id, average_measure, index_rate_id, month_number, year_date } = req.body;
    const newMonthlyAverage = await MonthlyAverage.create({ patient_id, board_id, sensor_id, average_measure, index_rate_id, month_number, year_date });
    res.status(201).json(newMonthlyAverage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un promedio mensual existente
exports.updateMonthlyAverage = async (req, res) => {
  try {
    const { id } = req.params;
    const { patient_id, board_id, sensor_id, average_measure, index_rate_id, month_number, year_date } = req.body;
    const updatedMonthlyAverage = await MonthlyAverage.update(
      { patient_id, board_id, sensor_id, average_measure, index_rate_id, month_number, year_date },
      { where: { monthly_average_id: id } }
    );
    if (updatedMonthlyAverage[0] === 0) {
      return res.status(404).json({ message: "Monthly average not found" });
    }
    res.status(200).json({ message: "Monthly average updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un promedio mensual
exports.deleteMonthlyAverage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MonthlyAverage.destroy({ where: { monthly_average_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Monthly average not found" });
    }
    res.status(200).json({ message: "Monthly average deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
