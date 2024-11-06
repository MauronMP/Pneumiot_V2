const Unit = require('../models/Unit');
const { createLog } = require('../../Log/services/LogService'); // Import log creation service

// Get all Unit records
const getAllUnits = async () => {
    try {
        const units = await Unit.findAll();
        const currentTime = new Date().toISOString(); // Get current time
        await createLog(`[${
            currentTime
        }] Successfully retrieved all Unit records.`); // Log creation for successful retrieval
        return units;
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error retrieving all Unit records: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

// Get a Unit record by its ID
const getUnitById = async (id) => {
    try {
        const unit = await Unit.findByPk(id);
        const currentTime = new Date().toISOString();
        if (unit) {
            await createLog(`[${
                currentTime
            }] Unit with ID ${id} found successfully.`); // Log creation for successful retrieval
            return unit;
        } else {
            await createLog(`[${
                currentTime
            }] Unit with ID ${id} not found.`); // Log creation when unit is not found
            return null;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error retrieving Unit with ID ${id}: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

// Create a new Unit record
const createUnit = async (unit_abbreviation, unit_description) => {
    try {
        const newUnit = await Unit.create({ unit_abbreviation, unit_description });
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Unit with abbreviation ${unit_abbreviation} created successfully.`); // Log creation for successful creation
        return newUnit;
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error creating Unit with abbreviation ${unit_abbreviation}: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

// Update an existing Unit record
const updateUnit = async (id, unit_abbreviation, unit_description) => {
    try {
        const unit = await Unit.findByPk(id);
        const currentTime = new Date().toISOString();
        if (unit) {
            unit.unit_abbreviation = unit_abbreviation;
            unit.unit_description = unit_description;
            await unit.save(); // Save the updated unit record
            await createLog(`[${
                currentTime
            }] Unit with ID ${id} updated successfully.`); // Log creation for successful update
            return unit;
        } else {
            await createLog(`[${
                currentTime
            }] Unit with ID ${id} not found for update.`); // Log creation when unit is not found for update
            return null;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error updating Unit with ID ${id}: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

// Delete a Unit record by its ID
const deleteUnit = async (id) => {
    try {
        const unit = await Unit.findByPk(id);
        const currentTime = new Date().toISOString();
        if (unit) {
            await unit.destroy(); // Delete the unit record if found
            await createLog(`[${
                currentTime
            }] Unit with ID ${id} deleted successfully.`); // Log creation for successful deletion
            return true;
        } else {
            await createLog(`[${
                currentTime
            }] Unit with ID ${id} not found for deletion.`); // Log creation when unit is not found for deletion
            return false;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error deleting Unit with ID ${id}: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

module.exports = {
    getAllUnits,
    getUnitById,
    createUnit,
    updateUnit,
    deleteUnit
};
