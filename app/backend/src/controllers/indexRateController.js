// src/controllers/indexRateController.js
const IndexRate = require("../models/IndexRate");

// Obtener todos los índices de tasa
exports.getAllIndexRates = async (req, res) => {
  try {
    const indexRates = await IndexRate.findAll();
    res.status(200).json(indexRates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un índice de tasa por ID
exports.getIndexRateById = async (req, res) => {
  try {
    const { id } = req.params;
    const indexRate = await IndexRate.findByPk(id);
    if (!indexRate) {
      return res.status(404).json({ message: "Index rate not found" });
    }
    res.status(200).json(indexRate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo índice de tasa
exports.createIndexRate = async (req, res) => {
  try {
    const { rate, rate_description } = req.body;
    const newIndexRate = await IndexRate.create({ rate, rate_description });
    res.status(201).json(newIndexRate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un índice de tasa existente
exports.updateIndexRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { rate, rate_description } = req.body;
    const updatedIndexRate = await IndexRate.update(
      { rate, rate_description },
      { where: { index_rate_id: id } }
    );
    if (updatedIndexRate[0] === 0) {
      return res.status(404).json({ message: "Index rate not found" });
    }
    res.status(200).json({ message: "Index rate updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un índice de tasa
exports.deleteIndexRate = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await IndexRate.destroy({ where: { index_rate_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Index rate not found" });
    }
    res.status(200).json({ message: "Index rate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
