const Worker = require('../models/Worker');
const WorkerAuth = require('../models/WorkerAuth');
const { getAllWorkersWithRoleQuery } = require('../queries/workerQueries'); // Import the query
const LogService = require('../../Log/services/LogService'); // Ensure log service is imported

// Function to get current timestamp
const getCurrentTimestamp = () => new Date().toISOString();

// Fetch all workers with their roles by worker_id
const fetchAllWorkersWithRole = async (worker_id) => {
    try {
        const workersWithRoles = await getAllWorkersWithRoleQuery(worker_id);
        await LogService.createLog(`[${getCurrentTimestamp()}] Successfully fetched all workers with roles for worker ID: ${worker_id}`); // Log success with timestamp
        return workersWithRoles;
    } catch (error) {
        console.log(error);
        await LogService.createLog(`[${getCurrentTimestamp()}] Error fetching workers with roles for worker ID: ${worker_id} - Error: ${error.message}`); // Log error with timestamp
        throw new Error('Error executing query');
    }
};

// Create a new worker record
const createWorker = async (workerData) => {
    try {
        const newWorker = await Worker.create(workerData);
        await LogService.createLog(`[${getCurrentTimestamp()}] Worker created successfully: ${JSON.stringify(workerData)}`); // Log success with timestamp
        return newWorker;
    } catch (error) {
        await LogService.createLog(`[${getCurrentTimestamp()}] Error creating worker: ${error.message}`); // Log error with timestamp
        throw new Error('Error creating worker');
    }
};

// Get all worker records
const getAllWorkers = async () => {
    try {
        const workers = await Worker.findAll();
        await LogService.createLog(`[${getCurrentTimestamp()}] Successfully retrieved all workers`); // Log success with timestamp
        return workers;
    } catch (error) {
        await LogService.createLog(`[${getCurrentTimestamp()}] Error retrieving workers: ${error.message}`); // Log error with timestamp
        throw new Error('Error fetching workers');
    }
};

// Get a worker by its ID
const getWorkerById = async (id) => {
    try {
        const worker = await Worker.findByPk(id);
        if (worker) {
            await LogService.createLog(`[${getCurrentTimestamp()}] Successfully retrieved worker with ID: ${id}`); // Log success with timestamp
            return worker;
        } else {
            await LogService.createLog(`[${getCurrentTimestamp()}] Worker with ID: ${id} not found`); // Log not found with timestamp
            return null;
        }
    } catch (error) {
        await LogService.createLog(`[${getCurrentTimestamp()}] Error retrieving worker with ID: ${id} - Error: ${error.message}`); // Log error with timestamp
        throw new Error(`Error fetching worker by ID`);
    }
};

// Update a worker's authentication data
const updateWorkerAuth = async (worker_id, workerData) => {
    try {
        const workerAuth = await WorkerAuth.findOne({ where: { worker_id: worker_id } });
        if (workerAuth) {
            await workerAuth.update(workerData);
            await LogService.createLog(`[${getCurrentTimestamp()}] Successfully updated worker authentication data for worker ID: ${worker_id}`); // Log success with timestamp
            return workerAuth;
        } else {
            await LogService.createLog(`[${getCurrentTimestamp()}] No worker authentication found for worker ID: ${worker_id}`); // Log not found with timestamp
            return null;
        }
    } catch (error) {
        await LogService.createLog(`[${getCurrentTimestamp()}] Error updating worker authentication for worker ID: ${worker_id} - Error: ${error.message}`); // Log error with timestamp
        throw new Error('Error updating worker authentication');
    }
};

// Delete a worker record by ID
const deleteWorker = async (id) => {
    try {
        const worker = await Worker.findByPk(id);
        if (worker) {
            await worker.destroy();
            await LogService.createLog(`[${getCurrentTimestamp()}] Successfully deleted worker with ID: ${id}`); // Log success with timestamp
            return true;
        } else {
            await LogService.createLog(`[${getCurrentTimestamp()}] Worker with ID: ${id} not found for deletion`); // Log not found with timestamp
            return false;
        }
    } catch (error) {
        await LogService.createLog(`[${getCurrentTimestamp()}] Error deleting worker with ID: ${id} - Error: ${error.message}`); // Log error with timestamp
        throw new Error('Error deleting worker');
    }
};

// Update a worker record
const updateWorker = async (id, workerData) => {
    try {
        const worker = await Worker.findByPk(id);
        if (worker) {
            await worker.update(workerData);
            await LogService.createLog(`[${getCurrentTimestamp()}] Successfully updated worker with ID: ${id}`); // Log success with timestamp
            return worker;
        } else {
            await LogService.createLog(`[${getCurrentTimestamp()}] Worker with ID: ${id} not found for update`); // Log not found with timestamp
            return null;
        }
    } catch (error) {
        await LogService.createLog(`[${getCurrentTimestamp()}] Error updating worker with ID: ${id} - Error: ${error.message}`); // Log error with timestamp
        throw new Error('Error updating worker');
    }
};

// Count the total number of workers
const countWorkers = async (req, res) => {
    try {
        const count = await Worker.count(); // Use Sequelize count method
        await LogService.createLog(`[${getCurrentTimestamp()}] Successfully counted the total number of workers: ${count}`); // Log success with timestamp
        res.status(200).json({ count });
    } catch (error) {
        await LogService.createLog(`[${getCurrentTimestamp()}] Error counting workers - Error: ${error.message}`); // Log error with timestamp
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    countWorkers,
    getAllWorkers,
    getWorkerById,
    createWorker,
    updateWorkerAuth,
    deleteWorker,
    updateWorker,
    fetchAllWorkersWithRole
};
