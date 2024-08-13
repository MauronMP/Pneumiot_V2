// src/controllers/errorLogController.js
const ErrorLog = require("../models/ErrorLog");

// Obtener todos los registros de errores
exports.getAllErrorLogs = async (req, res) => {
  try {
    const errorLogs = await ErrorLog.findAll();
    res.status(200).json(errorLogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un registro de error por ID
exports.getErrorLogById = async (req, res) => {
  try {
    const { id } = req.params;
    const errorLog = await ErrorLog.findByPk(id);
    if (!errorLog) {
      return res.status(404).json({ message: "Error log not found" });
    }
    res.status(200).json(errorLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo registro de error
exports.createErrorLog = async (req, res) => {
  try {
    const { log_message } = req.body;
    const newErrorLog = await ErrorLog.create({ log_message });
    res.status(201).json(newErrorLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un registro de error existente
exports.updateErrorLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { log_message } = req.body;
    const updatedErrorLog = await ErrorLog.update(
      { log_message },
      { where: { log_id: id } }
    );
    if (updatedErrorLog[0] === 0) {
      return res.status(404).json({ message: "Error log not found" });
    }
    res.status(200).json({ message: "Error log updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un registro de error
exports.deleteErrorLog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ErrorLog.destroy({ where: { log_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Error log not found" });
    }
    res.status(200).json({ message: "Error log deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
