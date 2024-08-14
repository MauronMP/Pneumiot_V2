const Patient = require("../models/Patient");

// Obtener todos los pacientes
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un paciente por ID
exports.getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo paciente
exports.createPatient = async (req, res) => {
  try {
    const { patient_dni, board_id, discharge_date, admission_date } = req.body;
    const newPatient = await Patient.create({ patient_dni, board_id, discharge_date, admission_date });
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un paciente existente
exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { patient_dni, board_id, discharge_date, admission_date } = req.body;
    const updatedPatient = await Patient.update(
      { patient_dni, board_id, discharge_date, admission_date },
      { where: { patient_id: id } }
    );
    if (updatedPatient[0] === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un paciente
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Patient.destroy({ where: { patient_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
