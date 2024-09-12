// /queries/workerQueries.js

const { QueryTypes } = require('sequelize');
const sequelize = require('../../../config/db');

// Función para obtener todos los trabajadores con su rol
const getAllWorkersWithRoleQuery = async (workerId) => {
    return await sequelize.query(
        `SELECT 
            w.worker_id, 
            w.worker_dni, 
            w.worker_email, 
            w.worker_name, 
            w.worker_surname, 
            wr.worker_role_name, 
            wr.worker_role_id
         FROM pneumiot.worker AS w
         INNER JOIN pneumiot.worker_role AS wr ON wr.worker_role_id = w.worker_role_id where w.worker_id != :worker_id`,
        {
            replacements: { worker_id: workerId },
            type: QueryTypes.SELECT
        }
    );
};

module.exports = {
    getAllWorkersWithRoleQuery
};
