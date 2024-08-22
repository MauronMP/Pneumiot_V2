const { Permission } = require('../models/Permission');  // Asegúrate de que la conexión a Sequelize y el modelo estén correctamente configurados

const getAllPermissions = async () => {
    return await Permission.findAll();
};

const getPermissionById = async (id) => {
    return await Permission.findByPk(id);
};

const createPermission = async (permissionData) => {
    return await Permission.create(permissionData);
};

const updatePermission = async (id, permissionData) => {
    const permission = await Permission.findByPk(id);
    if (permission) {
        return await permission.update(permissionData);
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

module.exports = {
    getAllPermissions,
    getPermissionById,
    createPermission,
    updatePermission,
    deletePermission
};
