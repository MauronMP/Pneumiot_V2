const WorkerRole = require('../models/WorkerRole');
const { createLog } = require('../../Log/services/LogService'); // Import log creation service

// Get all worker roles
const getAllWorkerRoles = async () => {
    try {
        const workerRoles = await WorkerRole.findAll();
        // Log successful retrieval of worker roles with timestamp
        await createLog(`Success: Retrieved all worker roles at ${new Date().toISOString()}`);
        return workerRoles;
    } catch (error) {
        // Log error in case of failure with timestamp
        await createLog(`Error: Failed to retrieve all worker roles at ${new Date().toISOString()} - ${error.message}`);
        throw new Error(`Error fetching worker roles: ${error.message}`);
    }
};

// Get a worker role by ID
const getWorkerRoleById = async (id) => {
    try {
        const workerRole = await WorkerRole.findByPk(id);
        if (workerRole) {
            // Log successful retrieval of a worker role by ID with timestamp
            await createLog(`Success: Retrieved worker role with ID ${id} at ${new Date().toISOString()}`);
            return workerRole;
        } else {
            // Log case where worker role is not found
            await createLog(`Warning: Worker role with ID ${id} not found at ${new Date().toISOString()}`);
            return null;
        }
    } catch (error) {
        // Log error in case of failure with timestamp
        await createLog(`Error: Failed to retrieve worker role with ID ${id} at ${new Date().toISOString()} - ${error.message}`);
        throw new Error(`Error fetching worker role by ID: ${error.message}`);
    }
};

// Create a new worker role
const createWorkerRole = async (worker_role_name, worker_role_description) => {
    try {
        const newWorkerRole = await WorkerRole.create({ worker_role_name, worker_role_description });
        // Log success of worker role creation with timestamp
        await createLog(`Success: Created new worker role with name ${worker_role_name} at ${new Date().toISOString()}`);
        return newWorkerRole;
    } catch (error) {
        // Log error during creation with timestamp
        await createLog(`Error: Failed to create worker role with name ${worker_role_name} at ${new Date().toISOString()} - ${error.message}`);
        throw new Error(`Error creating worker role: ${error.message}`);
    }
};

// Update a worker role
const updateWorkerRole = async (id, worker_role_name, worker_role_description) => {
    try {
        const workerRole = await WorkerRole.findByPk(id);
        if (workerRole) {
            workerRole.worker_role_name = worker_role_name;
            workerRole.worker_role_description = worker_role_description;
            await workerRole.save();
            // Log success of worker role update with timestamp
            await createLog(`Success: Updated worker role with ID ${id} at ${new Date().toISOString()}`);
            return workerRole;
        } else {
            // Log case where worker role is not found for update
            await createLog(`Warning: Worker role with ID ${id} not found for update at ${new Date().toISOString()}`);
            return null;
        }
    } catch (error) {
        // Log error during update with timestamp
        await createLog(`Error: Failed to update worker role with ID ${id} at ${new Date().toISOString()} - ${error.message}`);
        throw new Error(`Error updating worker role: ${error.message}`);
    }
};

// Delete a worker role
const deleteWorkerRole = async (id) => {
    try {
        const workerRole = await WorkerRole.findByPk(id);
        if (workerRole) {
            await workerRole.destroy();
            // Log success of worker role deletion with timestamp
            await createLog(`Success: Deleted worker role with ID ${id} at ${new Date().toISOString()}`);
            return true;
        } else {
            // Log case where worker role is not found for deletion
            await createLog(`Warning: Worker role with ID ${id} not found for deletion at ${new Date().toISOString()}`);
            return false;
        }
    } catch (error) {
        // Log error during deletion with timestamp
        await createLog(`Error: Failed to delete worker role with ID ${id} at ${new Date().toISOString()} - ${error.message}`);
        throw new Error(`Error deleting worker role: ${error.message}`);
    }
};

module.exports = {
    getAllWorkerRoles,
    getWorkerRoleById,
    createWorkerRole,
    updateWorkerRole,
    deleteWorkerRole
};
