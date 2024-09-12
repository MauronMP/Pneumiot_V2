const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const Worker = require('../../Worker/models/Worker');
const WorkerAuth = require('../../Worker/models/WorkerAuth');
const { getWorkerDetailsById, getWorkerPermissionsById } = require('../queries/loginQueries');

const authenticateUser = async (emailOrDni, plainPassword) => {
    const worker = await Worker.findOne({
        where: {
            [Op.or]: [
                { worker_email: emailOrDni },
                { worker_dni: emailOrDni }
            ]
        }
    });

    if (!worker) {
        throw new Error('Worker not found');
    }

    const workerAuth = await WorkerAuth.findOne({
        where: { worker_id: worker.worker_id }
    });

    if (!workerAuth) {
        throw new Error('WorkerAuth record not found');
    }

    const isPasswordValid = await bcrypt.compare(plainPassword.trim(), workerAuth.passwd_auth.trim());

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    // Obtener detalles del trabajador
    const workerDetails = await getWorkerDetailsById(worker.worker_id);

    // Obtener permisos del trabajador
    const workerPermissions = await getWorkerPermissionsById(worker.worker_id);

    return { 
        message: 'Login successful', 
        workerDetails: workerDetails[0], 
        workerPermissions 
    };
};

module.exports = {
    authenticateUser
};
