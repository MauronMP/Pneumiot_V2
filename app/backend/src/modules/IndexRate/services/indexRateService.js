const IndexRate = require('../models/IndexRate');
const { createLog } = require('../../Log/services/LogService'); // Importing the log service

// Get all index rates from the database
const getAllIndexRates = async () => {
    try {
        const currentTime = new Date().toISOString();
        
        // Log the action of fetching all index rates
        await createLog(`[${currentTime}] Fetching all Index Rates`);
        
        // Fetch all index rates from the database
        const indexRates = await IndexRate.findAll();
        return indexRates;
    } catch (error) {
        // Log the error if something goes wrong
        await createLog(`[${currentTime}] Error fetching Index Rates: ${error.message}`);
        throw new Error(`Error fetching Index Rates: ${error.message}`);
    }
};

// Get a specific index rate by its ID
const getIndexRateById = async (id) => {
    try {
        const currentTime = new Date().toISOString();
        
        // Log the action of fetching a specific index rate by ID
        await createLog(`[${currentTime}] Fetching Index Rate with ID: ${id}`);
        
        // Find the index rate by its primary key (ID)
        const indexRate = await IndexRate.findByPk(id);
        
        // Log if the index rate with the given ID was not found
        if (!indexRate) {
            await createLog(`[${currentTime}] Index Rate with ID: ${id} not found`);
        }
        
        return indexRate;
    } catch (error) {
        // Log the error if something goes wrong
        await createLog(`[${currentTime}] Error fetching Index Rate with ID ${id}: ${error.message}`);
        throw new Error(`Error fetching Index Rate with ID ${id}: ${error.message}`);
    }
};

// Create a new index rate
const createIndexRate = async (rate, rate_description) => {
    try {
        const currentTime = new Date().toISOString();
        
        // Create a new index rate record in the database
        const newIndexRate = await IndexRate.create({ rate, rate_description });
        
        // Log the action of creating a new index rate
        await createLog(`[${currentTime}] Created Index Rate: Rate = ${rate}, Description = ${rate_description}`);
        
        return newIndexRate;
    } catch (error) {
        // Log the error if the creation fails
        await createLog(`[${currentTime}] Error creating Index Rate: ${error.message}`);
        throw new Error(`Error creating Index Rate: ${error.message}`);
    }
};

// Update an existing index rate by its ID
const updateIndexRate = async (id, rate, rate_description) => {
    try {
        const currentTime = new Date().toISOString();
        
        // Find the index rate by its ID
        const indexRate = await IndexRate.findByPk(id);

        if (indexRate) {
            // If the index rate is found, update its values
            indexRate.rate = rate;
            indexRate.rate_description = rate_description;
            await indexRate.save();
            
            // Log the action of updating the index rate
            await createLog(`[${currentTime}] Updated Index Rate with ID: ${id}`);
            return indexRate;
        }

        // If no index rate was found for updating, log this situation
        await createLog(`[${currentTime}] Index Rate with ID: ${id} not found for update`);
        return null;
    } catch (error) {
        // Log the error if something goes wrong during the update
        await createLog(`[${currentTime}] Error updating Index Rate with ID ${id}: ${error.message}`);
        throw new Error(`Error updating Index Rate with ID ${id}: ${error.message}`);
    }
};

// Delete an index rate by its ID
const deleteIndexRate = async (id) => {
    try {
        const currentTime = new Date().toISOString();
        
        // Find the index rate by its ID
        const indexRate = await IndexRate.findByPk(id);
        
        if (indexRate) {
            // If the index rate is found, delete it
            await indexRate.destroy();
            
            // Log the action of deleting the index rate
            await createLog(`[${currentTime}] Deleted Index Rate with ID: ${id}`);
            return true;
        }

        // Log if the index rate was not found for deletion
        await createLog(`[${currentTime}] Index Rate with ID: ${id} not found for deletion`);
        return false;
    } catch (error) {
        // Log the error if the deletion fails
        await createLog(`[${currentTime}] Error deleting Index Rate with ID ${id}: ${error.message}`);
        throw new Error(`Error deleting Index Rate with ID ${id}: ${error.message}`);
    }
};

module.exports = {
    getAllIndexRates,
    getIndexRateById,
    createIndexRate,
    updateIndexRate,
    deleteIndexRate
};