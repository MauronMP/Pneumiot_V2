const patientService = require('../services/patientService');

const getAllPatients = async (req, res) => {
    try {
        const patients = await patientService.getAllPatients();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPatientById = async (req, res) => {
    try {
        const patient = await patientService.getPatientById(req.params.id);
        if (patient) {
            res.json(patient);
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPatient = async (req, res) => {
    try {
        const { patient_dni, board_id, discharge_date, admission_date } = req.body;
        const newPatient = await patientService.createPatient({ patient_dni, board_id, discharge_date, admission_date });
        res.status(201).json(newPatient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePatient = async (req, res) => {
    try {
        const updatedPatient = await patientService.updatePatient(req.params.id, req.body);
        if (updatedPatient) {
            res.json(updatedPatient);
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePatient = async (req, res) => {
    try {
        const result = await patientService.deletePatient(req.params.id);
        if (result) {
            res.json({ message: 'Patient deleted successfully' });
        } else {
            res.status(404).json({ message: 'Patient not found' });
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
