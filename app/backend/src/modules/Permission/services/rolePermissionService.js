const { RolePermission } = require('../models/RolePermission');  // Asegúrate de que la conexión a Sequelize y el modelo estén correctamente configurados

const getAllRolePermissions = async () => {
    return await RolePermission.findAll();
};

const getRolePermissionById = async (id) => {
    return await RolePermission.findByPk(id);
};

const createRolePermission = async (rolePermissionData) => {
    return await RolePermission.create(rolePermissionData);
};

const updateRolePermission = async (id, rolePermissionData) => {
    const rolePermission = await RolePermission.findByPk(id);
    if (rolePermission) {
        return await rolePermission.update(rolePermissionData);
    }
    return null;
};

const deleteRolePermission = async (id) => {
    const rolePermission = await RolePermission.findByPk(id);
    if (rolePermission) {
        await rolePermission.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllRolePermissions,
    getRolePermissionById,
    createRolePermission,
    updateRolePermission,
    deleteRolePermission
};
