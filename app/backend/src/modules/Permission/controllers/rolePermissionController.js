const rolePermissionService = require('../services/rolePermissionService');

const getAllRolePermissions = async (req, res) => {
    try {
        const rolePermissions = await rolePermissionService.getAllRolePermissions();
        res.json(rolePermissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRolePermissionById = async (req, res) => {
    try {
        const rolePermission = await rolePermissionService.getRolePermissionById(req.params.id);
        if (rolePermission) {
            res.json(rolePermission);
        } else {
            res.status(404).json({ message: 'RolePermission not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createRolePermission = async (req, res) => {
    try {
        const { worker_role_id, permission_id } = req.body;
        const newRolePermission = await rolePermissionService.createRolePermission({ worker_role_id, permission_id });
        res.status(201).json(newRolePermission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateRolePermission = async (req, res) => {
    try {
        const updatedRolePermission = await rolePermissionService.updateRolePermission(req.params.id, req.body);
        if (updatedRolePermission) {
            res.json(updatedRolePermission);
        } else {
            res.status(404).json({ message: 'RolePermission not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRolePermission = async (req, res) => {
    try {
        const result = await rolePermissionService.deleteRolePermission(req.params.id);
        if (result) {
            res.json({ message: 'RolePermission deleted successfully' });
        } else {
            res.status(404).json({ message: 'RolePermission not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllRolePermissions,
    getRolePermissionById,
    createRolePermission,
    updateRolePermission,
    deleteRolePermission
};
