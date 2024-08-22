const patientService = require('../services/patientService');

const getAllPatients = async (req, res) => {
    await patientService.getAllPatients(req, res);
};

const getPatientById = async (req, res) => {
    await patientService.getPatientById(req, res);
};

const createPatient = async (req, res) => {
    await patientService.createPatient(req, res);
};

const updatePatient = async (req, res) => {
    await patientService.updatePatient(req, res);
};

const deletePatient = async (req, res) => {
    await patientService.deletePatient(req, res);
};

module.exports = {
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};
