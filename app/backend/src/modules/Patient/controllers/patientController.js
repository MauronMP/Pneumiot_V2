// src/controllers/patientController.js
const patientService = require('../services/patientService');

const getPatientSensors = async (req, res) => {
    const { patientId } = req.params; // Usamos el ID que viene en la URL
  
    try {
      const patientSensors = await patientService.getPatientSensors(patientId);
      res.status(200).json(patientSensors);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  };

const getSensorsByPatientAndBoard = async (req, res) => {
    try {
        const { patientId, boardId } = req.params;
        const sensors = await patientService.getSensorsByPatientAndBoard(patientId, boardId);
        res.status(200).json(sensors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getBoardByPatientId = async (req, res) => {
    try {
        const { id } = req.params;
        const boardData = await patientService.getBoardByPatientId(id);
        
        if (boardData) {
            res.status(200).json(boardData);
        } else {
            res.status(404).json({ message: "Patient or board not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

const countPatients = async (req, res) => {
    await patientService.countPatients(req, res);
};

module.exports = {
    countPatients,
    getPatientSensors,
    getSensorsByPatientAndBoard,
    getBoardByPatientId,
    getAllPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient
};
