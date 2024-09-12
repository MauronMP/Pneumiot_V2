const permissionService = require('../services/permissionService');

const getAllPermissions = async (req, res) => {
    try {
        const permissions = await permissionService.getAllPermissions();
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPermissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const permission = await permissionService.getPermissionById(id);
        if (permission) {
            res.status(200).json(permission);
        } else {
            res.status(404).json({ message: "Permission not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPermission = async (req, res) => {
    try {
        const { permission_name, permission_description } = req.body;
        const newPermission = await permissionService.createPermission(permission_name, permission_description);
        res.status(201).json(newPermission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { permission_name, permission_description } = req.body;
        const updatedPermission = await permissionService.updatePermission(id, permission_name, permission_description);
        if (updatedPermission) {
            res.status(200).json(updatedPermission);
        } else {
            res.status(404).json({ message: "Permission not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await permissionService.deletePermission(id);
        if (result) {
            res.status(200).json({ message: "Permission deleted successfully" });
        } else {
            res.status(404).json({ message: "Permission not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getWorkersWithPermissions = async (req, res) => {
    try {
        const workersWithPermissions = await permissionService.getWorkersWithPermissions();
        res.status(200).json(workersWithPermissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
