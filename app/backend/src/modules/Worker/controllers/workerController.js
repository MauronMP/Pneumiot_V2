const Worker = require("../models/Worker");

// Obtener todos los trabajadores
exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.findAll();
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un trabajador por ID
exports.getWorkerById = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await Worker.findByPk(id);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json(worker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo trabajador
exports.createWorker = async (req, res) => {
  try {
    const { worker_dni, worker_email, worker_name, worker_surname, worker_role_id } = req.body;
    const newWorker = await Worker.create({ worker_dni, worker_email, worker_name, worker_surname, worker_role_id });
    res.status(201).json(newWorker);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un trabajador existente
exports.updateWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const { worker_dni, worker_email, worker_name, worker_surname, worker_role_id } = req.body;
    const updatedWorker = await Worker.update(
      { worker_dni, worker_email, worker_name, worker_surname, worker_role_id },
      { where: { worker_id: id } }
    );
    if (updatedWorker[0] === 0) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json({ message: "Worker updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un trabajador
exports.deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Worker.destroy({ where: { worker_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json({ message: "Worker deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
