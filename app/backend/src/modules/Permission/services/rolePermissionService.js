const RolePermission = require('../models/RolePermission');

const getAllRolePermissions = async () => {
    return await RolePermission.findAll();
};

const getRolePermissionById = async (id) => {
    return await RolePermission.findByPk(id);
};

const createRolePermission = async (worker_role_id, permission_id) => {
    return await RolePermission.create({
        worker_role_id,
        permission_id
    });
};

const updateRolePermission = async (id, worker_role_id, permission_id) => {
    const rolePermission = await RolePermission.findByPk(id);
    if (rolePermission) {
        rolePermission.worker_role_id = worker_role_id;
        rolePermission.permission_id = permission_id;
        await rolePermission.save();
        return rolePermission;
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
