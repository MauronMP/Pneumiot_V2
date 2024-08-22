const unitService = require('../services/unitService');

const getAllUnits = async (req, res) => {
    try {
        const units = await unitService.getAllUnits();
        res.status(200).json(units);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUnitById = async (req, res) => {
    try {
        const { id } = req.params;
        const unit = await unitService.getUnitById(id);
        if (unit) {
            res.status(200).json(unit);
        } else {
            res.status(404).json({ message: "Unit not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUnit = async (req, res) => {
    try {
        const { unit_abbreviation, unit_description } = req.body;
        const newUnit = await unitService.createUnit(unit_abbreviation, unit_description);
        res.status(201).json(newUnit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const { unit_abbreviation, unit_description } = req.body;
        const updatedUnit = await unitService.updateUnit(id, unit_abbreviation, unit_description);
        if (updatedUnit) {
            res.status(200).json(updatedUnit);
        } else {
            res.status(404).json({ message: "Unit not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUnit = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await unitService.deleteUnit(id);
        if (result) {
            res.status(200).json({ message: "Unit deleted successfully" });
        } else {
            res.status(404).json({ message: "Unit not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUnits,
    getUnitById,
    createUnit,
    updateUnit,
    deleteUnit
};
