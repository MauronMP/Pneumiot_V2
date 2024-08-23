// src/services/patientService.js
const Patient = require('../models/Patient');

const getAllPatients = async () => {
    try {
        return await Patient.findAll();
    } catch (error) {
        throw new Error(`Error fetching patients: ${error.message}`);
    }
};

const getPatientById = async (id) => {
    try {
        return await Patient.findByPk(id);
    } catch (error) {
        throw new Error(`Error fetching patient by ID: ${error.message}`);
    }
};

const createPatient = async (patient_dni, board_id, discharge_date, admission_date) => {
    try {
        return await Patient.create({ patient_dni, board_id, discharge_date, admission_date });
    } catch (error) {
        throw new Error(`Error creating patient: ${error.message}`);
    }
};

const updatePatient = async (id, patient_dni, board_id, discharge_date, admission_date) => {
    try {
        const patient = await Patient.findByPk(id);
        if (patient) {
            patient.patient_dni = patient_dni;
            patient.board_id = board_id;
            patient.discharge_date = discharge_date;
            patient.admission_date = admission_date;
            await patient.save();
            return patient;
        }
        return null;
    } catch (error) {
        throw new Error(`Error updating patient: ${error.message}`);
    }
};

const deletePatient = async (id) => {
    try {
        const patient = await Patient.findByPk(id);
        if (patient) {
            await patient.destroy();
            return true;
        }
        return false;
    } catch (error) {
        throw new Error(`Error deleting patient: ${error.message}`);
    }
};

module.exports = {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};
