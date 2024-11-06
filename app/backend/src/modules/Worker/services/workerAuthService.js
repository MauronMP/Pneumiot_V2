const bcrypt = require('bcrypt');
const WorkerAuth = require('../models/WorkerAuth');
const { createLog } = require('../../Log/services/LogService'); // Import log creation service

const saltRounds = 10; // Number of rounds for salt in password encryption

// Get all WorkerAuth records
const getAllWorkerAuths = async () => {
    try {
        const workerAuths = await WorkerAuth.findAll();
        const currentTime = new Date().toISOString(); // Get current time
        await createLog(`[${
            currentTime
        }] Successfully retrieved all WorkerAuth records.`); // Log creation
        return workerAuths;
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error retrieving WorkerAuths: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

// Get a WorkerAuth record by its ID
const getWorkerAuthById = async (id) => {
    try {
        const workerAuth = await WorkerAuth.findByPk(id);
        const currentTime = new Date().toISOString();
        if (workerAuth) {
            await createLog(`[${
                currentTime
            }] WorkerAuth with ID ${id} found successfully.`); // Log creation for success
            return workerAuth;
        } else {
            await createLog(`[${
                currentTime
            }] WorkerAuth with ID ${id} not found.`); // Log creation when record is not found
            return null;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error retrieving WorkerAuth by ID ${id}: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

// Create a new WorkerAuth record
const createWorkerAuth = async (worker_id, plainPassword) => {
    try {
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        const newWorkerAuth = await WorkerAuth.create({ worker_id, passwd_auth: hashedPassword });
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] WorkerAuth for worker ID ${worker_id} created successfully.`); // Log creation
        return newWorkerAuth;
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error creating WorkerAuth for worker ID ${worker_id}: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

// Update an existing WorkerAuth record
const updateWorkerAuth = async (worker_id, passwd_auth) => {
    try {
        const workerAuth = await WorkerAuth.findOne({ where: { worker_id } });
        const currentTime = new Date().toISOString();
        if (workerAuth) {
            // If a new password is provided, hash it before saving
            if (passwd_auth) {
                workerAuth.passwd_auth = await bcrypt.hash(passwd_auth, saltRounds);
            }
            await workerAuth.save(); // Save the updated WorkerAuth record
            await createLog(`[${
                currentTime
            }] WorkerAuth for worker ID ${worker_id} updated successfully.`); // Log creation
            return workerAuth;
        } else {
            await createLog(`[${
                currentTime
            }] WorkerAuth for worker ID ${worker_id} not found for update.`); // Log creation when not found
            return null;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error updating WorkerAuth for worker ID ${worker_id}: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

// Delete a WorkerAuth record by its ID
const deleteWorkerAuth = async (id) => {
    try {
        const workerAuth = await WorkerAuth.findByPk(id);
        const currentTime = new Date().toISOString();
        if (workerAuth) {
            await workerAuth.destroy(); // Delete the WorkerAuth record if found
            await createLog(`[${
                currentTime
            }] WorkerAuth with ID ${id} deleted successfully.`); // Log creation
            return true;
        } else {
            await createLog(`[${
                currentTime
            }] WorkerAuth with ID ${id} not found for deletion.`); // Log creation when not found
            return false;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error deleting WorkerAuth with ID ${id}: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

module.exports = {
    getAllWorkerAuths,
    getWorkerAuthById,
    createWorkerAuth,
    updateWorkerAuth,
    deleteWorkerAuth
};
