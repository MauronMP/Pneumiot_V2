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


const updateWorkerAuth = async (worker_id, passwd_auth) => {
    // Buscar el registro de WorkerAuth usando worker_id en lugar de worker_auth_id
    const workerAuth = await WorkerAuth.findOne({ where: { worker_id } });
    
    if (workerAuth) {
        // Si se proporciona una nueva contraseña, cifrarla antes de guardar
        if (passwd_auth) {
            workerAuth.passwd_auth = await bcrypt.hash(passwd_auth, saltRounds);
        }
        
        await workerAuth.save(); // Guardar los cambios en la base de datos
        return workerAuth; // Devolver el objeto actualizado
    }
    
    return null; // Devuelve null si no se encuentra el registro de WorkerAuth
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
