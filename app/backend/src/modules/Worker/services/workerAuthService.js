const bcrypt = require('bcrypt');
const WorkerAuth = require('../models/WorkerAuth');

const saltRounds = 10; // Número de rondas de sal para el cifrado

const getAllWorkerAuths = async () => {
    return await WorkerAuth.findAll();
};

const getWorkerAuthById = async (id) => {
    return await WorkerAuth.findByPk(id);
};


const createWorkerAuth = async (worker_id, plainPassword) => {
    // Cifra la contraseña antes de guardarla
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return await WorkerAuth.create({ worker_id, passwd_auth: hashedPassword });
};


const updateWorkerAuth = async (id, worker_id, passwd_auth) => {
    const workerAuth = await WorkerAuth.findByPk(id);
    if (workerAuth) {
        workerAuth.worker_id = worker_id;
        // Si se proporciona una nueva contraseña, cifrarla antes de guardar
        if (passwd_auth) {
            workerAuth.passwd_auth = await bcrypt.hash(passwd_auth, saltRounds);
        }
        await workerAuth.save();
        return workerAuth;
    }
    return null;
};

const deleteWorkerAuth = async (id) => {
    const workerAuth = await WorkerAuth.findByPk(id);
    if (workerAuth) {
        await workerAuth.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllWorkerAuths,
    getWorkerAuthById,
    createWorkerAuth,
    updateWorkerAuth,
    deleteWorkerAuth
};
