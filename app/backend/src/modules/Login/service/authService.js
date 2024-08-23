// /login/services/authService.js
const bcrypt = require('bcrypt'); // Asegúrate de requerir bcrypt
const { Op } = require('sequelize');
const Worker = require('../../Worker/models/Worker');
const WorkerAuth = require('../../Worker/models/WorkerAuth');

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

    console.log("Type of plainPassword:", typeof plainPassword); // debería ser 'string'
    console.log("Type of workerAuth.passwd_auth:", typeof workerAuth.passwd_auth); // debería ser 'string'
    

    const isPasswordValid = await bcrypt.compare(plainPassword, workerAuth.passwd_auth);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    return { message: 'Login successful', workerId: worker.worker_id };
};

module.exports = {
    authenticateUser
};
