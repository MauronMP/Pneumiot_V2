const RolePermission = require("../models/RolePermission");

// Obtener todos los permisos de roles
exports.getAllRolePermissions = async (req, res) => {
  try {
    const rolePermissions = await RolePermission.findAll();
    res.status(200).json(rolePermissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un permiso de rol por ID
exports.getRolePermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const rolePermission = await RolePermission.findByPk(id);
    if (!rolePermission) {
      return res.status(404).json({ message: "Role permission not found" });
    }
    res.status(200).json(rolePermission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo permiso de rol
exports.createRolePermission = async (req, res) => {
  try {
    const { worker_role_id, permission_id } = req.body;
    const newRolePermission = await RolePermission.create({ worker_role_id, permission_id });
    res.status(201).json(newRolePermission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un permiso de rol existente
exports.updateRolePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { worker_role_id, permission_id } = req.body;
    const updatedRolePermission = await RolePermission.update(
      { worker_role_id, permission_id },
      { where: { role_permission_id: id } }
    );
    if (updatedRolePermission[0] === 0) {
      return res.status(404).json({ message: "Role permission not found" });
    }
    res.status(200).json({ message: "Role permission updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un permiso de rol
exports.deleteRolePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await RolePermission.destroy({ where: { role_permission_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Role permission not found" });
    }
    res.status(200).json({ message: "Role permission deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
