const RolePermission = require('../models/RolePermission');
const { createLog } = require('../../Log/services/LogService'); // Import log creation service

// Get all RolePermission records
const getAllRolePermissions = async () => {
    try {
        const rolePermissions = await RolePermission.findAll();
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Successfully retrieved all RolePermission records.`); // Log for successful retrieval
        return rolePermissions;
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error retrieving all RolePermission records: ${error.message}`); // Log for error
        throw error; // Rethrow the error after logging it
    }
};

// Get RolePermission by its ID
const getRolePermissionById = async (id) => {
    try {
        const rolePermission = await RolePermission.findByPk(id);
        const currentTime = new Date().toISOString();
        if (rolePermission) {
            await createLog(`[${
                currentTime
            }] RolePermission with ID ${id} found successfully.`); // Log for successful retrieval
            return rolePermission;
        } else {
            await createLog(`[${
                currentTime
            }] RolePermission with ID ${id} not found.`); // Log when RolePermission not found
            return null;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error retrieving RolePermission with ID ${id}: ${error.message}`); // Log for error
        throw error; // Rethrow the error after logging it
    }
};

// Create a new RolePermission record
const createRolePermission = async (worker_role_id, permission_id) => {
    try {
        const newRolePermission = await RolePermission.create({
            worker_role_id,
            permission_id
        });
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] RolePermission with worker_role_id ${worker_role_id} and permission_id ${permission_id} created successfully.`); // Log for successful creation
        return newRolePermission;
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error creating RolePermission with worker_role_id ${worker_role_id} and permission_id ${permission_id}: ${error.message}`); // Log for error
        throw error; // Rethrow the error after logging it
    }
};

// Update an existing RolePermission record by its ID
const updateRolePermission = async (id, worker_role_id, permission_id) => {
    try {
        const rolePermission = await RolePermission.findByPk(id);
        const currentTime = new Date().toISOString();
        if (rolePermission) {
            rolePermission.worker_role_id = worker_role_id;
            rolePermission.permission_id = permission_id;
            await rolePermission.save();
            await createLog(`[${
                currentTime
            }] RolePermission with ID ${id} updated successfully with worker_role_id ${worker_role_id} and permission_id ${permission_id}.`); // Log for successful update
            return rolePermission;
        } else {
            await createLog(`[${
                currentTime
            }] RolePermission with ID ${id} not found for update.`); // Log when RolePermission not found for update
            return null;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error updating RolePermission with ID ${id}: ${error.message}`); // Log for error
        throw error; // Rethrow the error after logging it
    }
};

// Delete a RolePermission record by its ID
const deleteRolePermission = async (id) => {
    try {
        const rolePermission = await RolePermission.findByPk(id);
        const currentTime = new Date().toISOString();
        if (rolePermission) {
            await rolePermission.destroy();
            await createLog(`[${
                currentTime
            }] RolePermission with ID ${id} deleted successfully.`); // Log for successful deletion
            return true;
        } else {
            await createLog(`[${
                currentTime
            }] RolePermission with ID ${id} not found for deletion.`); // Log when RolePermission not found
            return false;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error deleting RolePermission with ID ${id}: ${error.message}`); // Log for error
        throw error; // Rethrow the error after logging it
    }
};

module.exports = {
    getAllRolePermissions,
    getRolePermissionById,
    createRolePermission,
    updateRolePermission,
    deleteRolePermission
};
