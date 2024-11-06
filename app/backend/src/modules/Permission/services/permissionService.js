const Permission = require('../models/Permission');
const RolePermission = require('../models/RolePermission');
const Worker = require('../../Worker/models/Worker');
const WorkerRole = require('../../Worker/models/WorkerRole');
const { createLog } = require('../../Log/services/LogService'); // Import log creation service

// Get all Permission records
const getAllPermissions = async () => {
    try {
        const permissions = await Permission.findAll();
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Successfully retrieved all Permission records.`); // Log for successful retrieval
        return permissions;
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error retrieving all Permission records: ${error.message}`); // Log for error
        throw error; // Rethrow the error after logging it
    }
};

// Get Permission record by its ID
const getPermissionById = async (id) => {
    try {
        const permission = await Permission.findByPk(id);
        const currentTime = new Date().toISOString();
        if (permission) {
            await createLog(`[${
                currentTime
            }] Permission with ID ${id} found successfully.`); // Log for successful retrieval
            return permission;
        } else {
            await createLog(`[${
                currentTime
            }] Permission with ID ${id} not found.`); // Log when permission not found
            return null;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error retrieving Permission with ID ${id}: ${error.message}`); // Log for error
        throw error; // Rethrow the error after logging it
    }
};

// Create a new Permission record
const createPermission = async (permission_name, permission_description) => {
    try {
        const newPermission = await Permission.create({ permission_name, permission_description });
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Permission with name "${permission_name}" created successfully.`); // Log for successful creation
        return newPermission;
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error creating Permission: ${error.message}`); // Log for error
        throw error; // Rethrow the error after logging it
    }
};

// Update an existing Permission record by its ID
const updatePermission = async (id, permission_name, permission_description) => {
    try {
        const permission = await Permission.findByPk(id);
        const currentTime = new Date().toISOString();
        if (permission) {
            permission.permission_name = permission_name;
            permission.permission_description = permission_description;
            await permission.save();
            await createLog(`[${
                currentTime
            }] Permission with ID ${id} updated successfully.`); // Log for successful update
            return permission;
        } else {
            await createLog(`[${
                currentTime
            }] Permission with ID ${id} not found for update.`); // Log when permission not found
            return null;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error updating Permission with ID ${id}: ${error.message}`); // Log for error
        throw error; // Rethrow the error after logging it
    }
};

// Delete a Permission record by its ID
const deletePermission = async (id) => {
    try {
        const permission = await Permission.findByPk(id);
        const currentTime = new Date().toISOString();
        if (permission) {
            await permission.destroy();
            await createLog(`[${
                currentTime
            }] Permission with ID ${id} deleted successfully.`); // Log for successful deletion
            return true;
        } else {
            await createLog(`[${
                currentTime
            }] Permission with ID ${id} not found for deletion.`); // Log when permission not found
            return false;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error deleting Permission with ID ${id}: ${error.message}`); // Log for error
        throw error; // Rethrow the error after logging it
    }
};

// Get all Workers with their associated Permissions
const getWorkersWithPermissions = async () => {
    try {
        const workersWithPermissions = await Worker.findAll({
            attributes: ['worker_email'], // Get only the worker email
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
                                    attributes: ['permission_name'], // Get permission name
                                }
                            ]
                        }
                    ]
                }
            ],
            order: [['worker_id', 'ASC']], // Order by worker_id
            raw: true
        });

        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Successfully retrieved all Workers with their associated Permissions.`); // Log for successful retrieval
        return workersWithPermissions;
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error retrieving Workers with Permissions: ${error.message}`); // Log for error
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
