const Unit = require('../models/Unit');

const getAllUnits = async () => {
    return await Unit.findAll();
};

const getUnitById = async (id) => {
    return await Unit.findByPk(id);
};

const createUnit = async (unit_abbreviation, unit_description) => {
    return await Unit.create({ unit_abbreviation, unit_description });
};

const updateUnit = async (id, unit_abbreviation, unit_description) => {
    const unit = await Unit.findByPk(id);
    if (unit) {
        unit.unit_abbreviation = unit_abbreviation;
        unit.unit_description = unit_description;
        await unit.save();
        return unit;
    }
    return null;
};

const deleteUnit = async (id) => {
    const unit = await Unit.findByPk(id);
    if (unit) {
        await unit.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllUnits,
    getUnitById,
    createUnit,
    updateUnit,
    deleteUnit
};
