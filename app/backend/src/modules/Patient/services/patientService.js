const Patient = require('../models/Patient');

// Obtener todos los pacientes
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un paciente por ID
const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByPk(id);
        if (patient) {
            res.status(200).json(patient);
        } else {
            res.status(404).json({ message: "Patient not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo paciente
const createPatient = async (req, res) => {
    try {
        const { patient_dni, board_id, discharge_date, admission_date } = req.body;
        const newPatient = await Patient.create({ patient_dni, board_id, discharge_date, admission_date });
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un paciente existente
const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { patient_dni, board_id, discharge_date, admission_date } = req.body;
        const patient = await Patient.findByPk(id);
        if (patient) {
            patient.patient_dni = patient_dni;
            patient.board_id = board_id;
            patient.discharge_date = discharge_date;
            patient.admission_date = admission_date;
            await patient.save();
            res.status(200).json(patient);
        } else {
            res.status(404).json({ message: "Patient not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un paciente
const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByPk(id);
        if (patient) {
            await patient.destroy();
            res.status(200).json({ message: "Patient deleted successfully" });
        } else {
            res.status(404).json({ message: "Patient not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};
