const permissionService = require('../services/permissionService');

const getAllPermissions = async (req, res) => {
    try {
        const permissions = await permissionService.getAllPermissions();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPermissionById = async (req, res) => {
    try {
        const permission = await permissionService.getPermissionById(req.params.id);
        if (permission) {
            res.json(permission);
        } else {
            res.status(404).json({ message: 'Permission not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPermission = async (req, res) => {
    try {
        const { permission_name, permission_description } = req.body;
        const newPermission = await permissionService.createPermission({ permission_name, permission_description });
        res.status(201).json(newPermission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePermission = async (req, res) => {
    try {
        const updatedPermission = await permissionService.updatePermission(req.params.id, req.body);
        if (updatedPermission) {
            res.json(updatedPermission);
        } else {
            res.status(404).json({ message: 'Permission not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePermission = async (req, res) => {
    try {
        const result = await permissionService.deletePermission(req.params.id);
        if (result) {
            res.json({ message: 'Permission deleted successfully' });
        } else {
            res.status(404).json({ message: 'Permission not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPermissions,
    getPermissionById,
    createPermission,
    updatePermission,
    deletePermission
};
