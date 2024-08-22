const rolePermissionService = require('../services/rolePermissionService');

const getAllRolePermissions = async (req, res) => {
    try {
        const rolePermissions = await rolePermissionService.getAllRolePermissions();
        res.status(200).json(rolePermissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRolePermissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const rolePermission = await rolePermissionService.getRolePermissionById(id);
        if (rolePermission) {
            res.status(200).json(rolePermission);
        } else {
            res.status(404).json({ message: "RolePermission not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createRolePermission = async (req, res) => {
    try {
        const { worker_role_id, permission_id } = req.body;
        const newRolePermission = await rolePermissionService.createRolePermission(worker_role_id, permission_id);
        res.status(201).json(newRolePermission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateRolePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { worker_role_id, permission_id } = req.body;
        const updatedRolePermission = await rolePermissionService.updateRolePermission(id, worker_role_id, permission_id);
        if (updatedRolePermission) {
            res.status(200).json(updatedRolePermission);
        } else {
            res.status(404).json({ message: "RolePermission not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRolePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await rolePermissionService.deleteRolePermission(id);
        if (result) {
            res.status(200).json({ message: "RolePermission deleted successfully" });
        } else {
            res.status(404).json({ message: "RolePermission not found" });
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
