const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const Worker = require('../../Worker/models/Worker');
const WorkerAuth = require('../../Worker/models/WorkerAuth');
const { getWorkerDetailsById, getWorkerPermissionsById } = require('../queries/loginQueries');
const { createLog } = require('../../Log/services/LogService'); // Import log creation service

const authenticateUser = async (emailOrDni, plainPassword) => {
    try {
        const cleanedInput = emailOrDni.trim();
        const cleanedPassword = plainPassword.trim();
        const currentTime = new Date().toISOString(); // Current timestamp

        // Log the start of the authentication process with specific user info
        await createLog(`[${currentTime}] Authentication attempt for user: ${cleanedInput}`);

        // Find worker by email or DNI
        const worker = await Worker.findOne({
            where: {
                [Op.or]: [
                    { worker_email: cleanedInput },
                    { worker_dni: cleanedInput }
                ]
            }
        });

        // If no worker is found, log and throw an error
        if (!worker) {
            await createLog(`[${currentTime}] Authentication failed: Worker not found for ${cleanedInput}`);
            throw new Error('Worker not found');
        }

        // Log that worker was found with ID
        await createLog(`[${currentTime}] Worker found: ID ${worker.worker_id} for ${cleanedInput}`);

        // Find the corresponding WorkerAuth record
        const workerAuth = await WorkerAuth.findOne({
            where: { worker_id: worker.worker_id }
        });

        // If no WorkerAuth record exists, log and throw an error
        if (!workerAuth) {
            await createLog(`[${currentTime}] Authentication failed: WorkerAuth not found for worker ID ${worker.worker_id}`);
            throw new Error('WorkerAuth record not found');
        }

        // Validate the password using bcrypt
        const isPasswordValid = await bcrypt.compare(cleanedPassword, workerAuth.passwd_auth.trim());

        // If the password is incorrect, log and throw an error
        if (!isPasswordValid) {
            await createLog(`[${currentTime}] Authentication failed: Invalid password for worker ID ${worker.worker_id}`);
            throw new Error('Invalid password');
        }

        // Log successful password validation
        await createLog(`[${currentTime}] Password validated successfully for worker ID ${worker.worker_id}`);

        // Get worker details and permissions
        const workerDetails = await getWorkerDetailsById(worker.worker_id);
        const workerPermissions = await getWorkerPermissionsById(worker.worker_id);

        // Log successful login
        await createLog(`[${currentTime}] Login successful for worker ID ${worker.worker_id}`);

        return {
            message: 'Login successful',
            workerDetails: workerDetails[0],
            workerPermissions
        };

    } catch (error) {
        // Log any errors encountered
        const currentTime = new Date().toISOString(); // Update timestamp for error log
        await createLog(`[${currentTime}] Authentication error: ${error.message}`);
        throw new Error(error.message);
    }
};

module.exports = {
    authenticateUser
};
