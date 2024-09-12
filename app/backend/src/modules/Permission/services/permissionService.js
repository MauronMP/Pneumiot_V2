const Permission = require('../models/Permission');
const RolePermission = require('../models/RolePermission');
const Worker = require('../../Worker/models/Worker');
const WorkerRole = require('../../Worker/models/WorkerRole');


const getAllPermissions = async () => {
    return await Permission.findAll();
};

const getPermissionById = async (id) => {
    return await Permission.findByPk(id);
};

const createPermission = async (permission_name, permission_description) => {
    return await Permission.create({ permission_name, permission_description });
};

const updatePermission = async (id, permission_name, permission_description) => {
    const permission = await Permission.findByPk(id);
    if (permission) {
        permission.permission_name = permission_name;
        permission.permission_description = permission_description;
        await permission.save();
        return permission;
    }
    return null;
};

const deletePermission = async (id) => {
    const permission = await Permission.findByPk(id);
    if (permission) {
        await permission.destroy();
        return true;
    }
    return false;
};


const getWorkersWithPermissions = async () => {
    try {
        const workersWithPermissions = await Worker.findAll({
            attributes: ['worker_email'], // Obtener solo el correo del trabajador
            include: [
                {
                    model: WorkerRole,
                    attributes: [],
                    include: [
                        {
                            model: RolePermission,
                            attributes: [],
                            include: [
                                {
                                    model: Permission,
                                    attributes: ['permission_name'], // Obtener el nombre del permiso
                                }
                            ]
                        }
                    ]
                }
            ],
            order: [['worker_id', 'ASC']], // Ordenar por worker_id
            raw: true
        });

        return workersWithPermissions;
    } catch (error) {
        console.error('Error retrieving workers with permissions:', error);
        throw new Error('Error retrieving workers with permissions');
    }
};


module.exports = {
    getWorkersWithPermissions,
    getAllPermissions,
    getPermissionById,
    createPermission,
    updatePermission,
    deletePermission
};
