const WorkerRole = require("../models/WorkerRole");

// Obtener todos los roles de trabajador
exports.getAllWorkerRoles = async (req, res) => {
  try {
    const workerRoles = await WorkerRole.findAll();
    res.status(200).json(workerRoles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un rol de trabajador por ID
exports.getWorkerRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const workerRole = await WorkerRole.findByPk(id);
    if (!workerRole) {
      return res.status(404).json({ message: "Worker role not found" });
    }
    res.status(200).json(workerRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo rol de trabajador
exports.createWorkerRole = async (req, res) => {
  try {
    const { worker_role_name, worker_role_description } = req.body;
    const newWorkerRole = await WorkerRole.create({ worker_role_name, worker_role_description });
    res.status(201).json(newWorkerRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un rol de trabajador existente
exports.updateWorkerRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { worker_role_name, worker_role_description } = req.body;
    const updatedWorkerRole = await WorkerRole.update(
      { worker_role_name, worker_role_description },
      { where: { worker_role_id: id } }
    );
    if (updatedWorkerRole[0] === 0) {
      return res.status(404).json({ message: "Worker role not found" });
    }
    res.status(200).json({ message: "Worker role updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un rol de trabajador
exports.deleteWorkerRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await WorkerRole.destroy({ where: { worker_role_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Worker role not found" });
    }
    res.status(200).json({ message: "Worker role deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
