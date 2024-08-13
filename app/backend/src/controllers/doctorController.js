// src/controllers/doctorController.js
const Doctor = require("../models/Doctor");

// Obtener todos los doctores
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un doctor por ID
exports.getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo doctor
exports.createDoctor = async (req, res) => {
  try {
    const { patient_id, worker_id } = req.body;
    const newDoctor = await Doctor.create({ patient_id, worker_id });
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un doctor existente
exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { patient_id, worker_id } = req.body;
    const updatedDoctor = await Doctor.update(
      { patient_id, worker_id },
      { where: { doctor_patient_id: id } }
    );
    if (updatedDoctor[0] === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Doctor.destroy({ where: { doctor_patient_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
