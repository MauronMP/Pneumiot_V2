const WorkerLog = require("../models/WorkerLog");

// Obtener todos los logs de trabajadores
exports.getAllWorkerLogs = async (req, res) => {
  try {
    const workerLogs = await WorkerLog.findAll();
    res.status(200).json(workerLogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un log de trabajador por ID
exports.getWorkerLogById = async (req, res) => {
  try {
    const { id } = req.params;
    const workerLog = await WorkerLog.findByPk(id);
    if (!workerLog) {
      return res.status(404).json({ message: "Worker log not found" });
    }
    res.status(200).json(workerLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo log de trabajador
exports.createWorkerLog = async (req, res) => {
  try {
    const { worker_id, log_message } = req.body;
    const newWorkerLog = await WorkerLog.create({ worker_id, log_message });
    res.status(201).json(newWorkerLog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un log de trabajador existente
exports.updateWorkerLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { worker_id, log_message } = req.body;
    const updatedWorkerLog = await WorkerLog.update(
      { worker_id, log_message },
      { where: { log_id: id } }
    );
    if (updatedWorkerLog[0] === 0) {
      return res.status(404).json({ message: "Worker log not found" });
    }
    res.status(200).json({ message: "Worker log updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un log de trabajador
exports.deleteWorkerLog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await WorkerLog.destroy({ where: { log_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Worker log not found" });
    }
    res.status(200).json({ message: "Worker log deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
