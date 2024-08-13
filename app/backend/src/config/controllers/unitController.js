// src/controllers/unitController.js
const Unit = require("../models/Unit");

// Obtener todas las unidades
exports.getAllUnits = async (req, res) => {
	try {
		const units = await Unit.findAll();
		res.status(200).json(units);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Obtener una unidad por ID
exports.getUnitById = async (req, res) => {
	try {
		const { id } = req.params;
		const unit = await Unit.findByPk(id);
		if (!unit) {
			return res.status(404).json({ message: "Unit not found" });
		}
		res.status(200).json(unit);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Crear una nueva unidad
exports.createUnit = async (req, res) => {
	try {
		const { unit_abbreviation, unit_description } = req.body;
		const newUnit = await Unit.create({ unit_abbreviation, unit_description });
		res.status(201).json(newUnit);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Actualizar una unidad existente
exports.updateUnit = async (req, res) => {
	try {
		const { id } = req.params;
		const { unit_abbreviation, unit_description } = req.body;
		const updatedUnit = await Unit.update(
			{ unit_abbreviation, unit_description },
			{ where: { unit_id: id } }
		);
		if (updatedUnit[0] === 0) {
			return res.status(404).json({ message: "Unit not found" });
		}
		res.status(200).json({ message: "Unit updated successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Eliminar una unidad
exports.deleteUnit = async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await Unit.destroy({ where: { unit_id: id } });
		if (!deleted) {
			return res.status(404).json({ message: "Unit not found" });
		}
		res.status(200).json({ message: "Unit deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
