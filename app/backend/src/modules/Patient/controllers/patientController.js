// src/controllers/patientController.js
const patientService = require('../services/patientService');

const getAllPatients = async (req, res) => {
    try {
        const patients = await patientService.getAllPatients();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await patientService.getPatientById(id);
        if (patient) {
            res.status(200).json(patient);
        } else {
            res.status(404).json({ message: "Patient not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPatient = async (req, res) => {
    try {
        const { patient_dni, board_id, discharge_date, admission_date } = req.body;
        const newPatient = await patientService.createPatient(patient_dni, board_id, discharge_date, admission_date);
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { patient_dni, board_id, discharge_date, admission_date } = req.body;
        const updatedPatient = await patientService.updatePatient(id, patient_dni, board_id, discharge_date, admission_date);
        if (updatedPatient) {
            res.status(200).json(updatedPatient);
        } else {
            res.status(404).json({ message: "Patient not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await patientService.deletePatient(id);
        if (result) {
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
