const Permission = require('../models/Permission');

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

module.exports = {
    getAllPermissions,
    getPermissionById,
    createPermission,
    updatePermission,
    deletePermission
};
