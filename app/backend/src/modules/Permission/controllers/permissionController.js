const Permission = require("../models/Permission");

// Obtener todos los permisos
exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.findAll();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un permiso por ID
exports.getPermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByPk(id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo permiso
exports.createPermission = async (req, res) => {
  try {
    const { permission_name, permission_description } = req.body;
    const newPermission = await Permission.create({ permission_name, permission_description });
    res.status(201).json(newPermission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un permiso existente
exports.updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { permission_name, permission_description } = req.body;
    const updatedPermission = await Permission.update(
      { permission_name, permission_description },
      { where: { permission_id: id } }
    );
    if (updatedPermission[0] === 0) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.status(200).json({ message: "Permission updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un permiso
exports.deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Permission.destroy({ where: { permission_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.status(200).json({ message: "Permission deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
