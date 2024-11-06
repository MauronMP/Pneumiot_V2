const { QueryTypes } = require('sequelize');
const sequelize = require('../../../config/db');
// Consultas SQL para los detalles del trabajador

const getWorkerDetailsById = async (workerId) => {
    return await sequelize.query(
        `SELECT 
                w.worker_id AS "worker_id",
                w.worker_email AS "worker_email", 
                w.worker_name AS "worker_name", 
                w.worker_surname AS "worker_surname", 
                wr.worker_role_name
         FROM pneumiot.worker AS w
         INNER JOIN pneumiot.worker_role AS wr ON wr.worker_role_id = w.worker_role_id
         WHERE w.worker_id = :worker_id`,
        {
            replacements: { worker_id: workerId },
            type: QueryTypes.SELECT
        }
    );
};

// Consultas SQL para los permisos del trabajador
const getWorkerPermissionsById = async (workerId) => {
    return await sequelize.query(
        `SELECT p.permission_name AS "worker_permission"
         FROM pneumiot.worker AS w
         INNER JOIN pneumiot.worker_role AS wr ON wr.worker_role_id = w.worker_role_id
         INNER JOIN pneumiot.role_permissions AS rp ON rp.worker_role_id = wr.worker_role_id
         INNER JOIN pneumiot.permissions AS p ON p.permission_id = rp.permission_id
         WHERE w.worker_id = :worker_id`,
        {
            replacements: { worker_id: workerId },
            type: QueryTypes.SELECT
        }
    );
};

module.exports = {
    getWorkerDetailsById,
    getWorkerPermissionsById
};
