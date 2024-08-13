const WorkerAuth = require("../models/WorkerAuth");

// Obtener todas las autenticaciones de trabajadores
exports.getAllWorkerAuths = async (req, res) => {
  try {
    const workerAuths = await WorkerAuth.findAll();
    res.status(200).json(workerAuths);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una autenticación de trabajador por ID
exports.getWorkerAuthById = async (req, res) => {
  try {
    const { id } = req.params;
    const workerAuth = await WorkerAuth.findByPk(id);
    if (!workerAuth) {
      return res.status(404).json({ message: "Worker auth not found" });
    }
    res.status(200).json(workerAuth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva autenticación de trabajador
exports.createWorkerAuth = async (req, res) => {
  try {
    const { worker_id, passwd_auth } = req.body;
    const newWorkerAuth = await WorkerAuth.create({ worker_id, passwd_auth });
    res.status(201).json(newWorkerAuth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar una autenticación de trabajador existente
exports.updateWorkerAuth = async (req, res) => {
  try {
    const { id } = req.params;
    const { worker_id, passwd_auth } = req.body;
    const updatedWorkerAuth = await WorkerAuth.update(
      { worker_id, passwd_auth },
      { where: { worker_auth_id: id } }
    );
    if (updatedWorkerAuth[0] === 0) {
      return res.status(404).json({ message: "Worker auth not found" });
    }
    res.status(200).json({ message: "Worker auth updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una autenticación de trabajador
exports.deleteWorkerAuth = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await WorkerAuth.destroy({ where: { worker_auth_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Worker auth not found" });
    }
    res.status(200).json({ message: "Worker auth deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
