const Patient = require('../models/Patient');
const Board = require('../../Board/models/Board');
const BoardSensor = require('../../Board/models/BoardSensor');
const Sensor = require('../../Sensor/models/Sensor');
const Unit = require('../../Unit/models/Unit');
const { createLog } = require('../../Log/services/LogService'); // Import log service

// Log helper function to create logs with timestamps
const logAction = async (action, message) => {
    const currentTime = new Date().toISOString();
    await createLog(`[${
        currentTime
    }] ${action}: ${message}`); // Log action with timestamp and message
};

// Get patient sensors
const getPatientSensors = async (patientId) => {
    try {
        const patientData = await Patient.findOne({
            where: { patient_id: patientId },
            include: [
                {
                    model: Board,
                    attributes: ['board_code'],
                    include: [
                        {
                            model: Sensor,
                            attributes: ['sensor_code', 'sensor_type', 'min_value', 'max_value'],
                            include: [
                                {
                                    model: Unit,
                                    attributes: ['unit_abbreviation'],
                                },
                            ],
                        },
                    ],
                },
            ],
            attributes: [],
        });

        if (!patientData) {
            throw new Error(`Patient with ID ${patientId} not found`);
        }

        const result = patientData.Board.Sensors.map(sensor => ({
            board_code: patientData.Board.board_code,
            sensor_code: sensor.sensor_code,
            sensor_type: sensor.sensor_type,
            unit_abbreviation: sensor.Unit.unit_abbreviation,
            min_value: sensor.min_value,
            max_value: sensor.max_value,
        }));

        await logAction('Fetch Patient Sensors', `Successfully fetched sensors for patient with ID ${patientId}`);
        return result;
    } catch (error) {
        await logAction('Fetch Patient Sensors', `Error fetching sensors for patient with ID ${patientId}: ${error.message}`);
        throw new Error(`Error fetching patient sensors: ${error.message}`);
    }
};

// Get sensors by patient and board
const getSensorsByPatientAndBoard = async (patientId, boardId) => {
    try {
        const sensors = await Patient.findOne({
            where: { patient_id: patientId, board_id: boardId },
            include: {
                model: Board,
                include: {
                    model: Sensor,
                    attributes: ['sensor_type', 'sensor_id'],
                },
            },
        });

        if (!sensors) {
            throw new Error('No sensors found for the given patient and board.');
        }

        const result = sensors.Board.Sensors.map(sensor => ({
            sensor_type: sensor.sensor_type,
            sensor_id: sensor.sensor_id,
        }));

        await logAction('Fetch Sensors by Patient and Board', `Successfully fetched sensors for patient ID ${patientId} and board ID ${boardId}`);
        return result;
    } catch (error) {
        await logAction('Fetch Sensors by Patient and Board', `Error fetching sensors for patient ID ${patientId} and board ID ${boardId}: ${error.message}`);
        throw new Error(`Error fetching sensors for patient and board: ${error.message}`);
    }
};

// Get board by patient ID
const getBoardByPatientId = async (patientId) => {
    try {
        const patient = await Patient.findOne({
            where: { patient_id: patientId },
            include: {
                model: Board,
                attributes: ['board_code', 'board_id'],
            },
        });

        if (!patient) {
            return null;
        }

        const result = {
            board_code: patient.Board.board_code,
            board_id: patient.Board.board_id,
        };

        await logAction('Fetch Board by Patient ID', `Successfully fetched board for patient with ID ${patientId}`);
        return result;
    } catch (error) {
        await logAction('Fetch Board by Patient ID', `Error fetching board for patient with ID ${patientId}: ${error.message}`);
        throw new Error(`Error fetching board by patient ID: ${error.message}`);
    }
};

// Get all patients
const getAllPatients = async () => {
    try {
        const patients = await Patient.findAll();
        await logAction('Fetch All Patients', 'Successfully fetched all patients');
        return patients;
    } catch (error) {
        await logAction('Fetch All Patients', `Error fetching all patients: ${error.message}`);
        throw new Error(`Error fetching patients: ${error.message}`);
    }
};

// Get patient by ID
const getPatientById = async (id) => {
    try {
        const patient = await Patient.findByPk(id);
        if (patient) {
            await logAction('Fetch Patient by ID', `Successfully fetched patient with ID ${id}`);
        } else {
            await logAction('Fetch Patient by ID', `Patient with ID ${id} not found`);
        }
        return patient;
    } catch (error) {
        await logAction('Fetch Patient by ID', `Error fetching patient with ID ${id}: ${error.message}`);
        throw new Error(`Error fetching patient by ID: ${error.message}`);
    }
};

// Update patient details
const updatePatient = async (id, patient_dni, board_id, discharge_date, admission_date) => {
    try {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return null;
        }

        const updatedPatient = await patient.update({
            patient_dni: patient_dni || patient.patient_dni,
            board_id: board_id || patient.board_id,
            discharge_date: discharge_date || patient.discharge_date,
            admission_date: admission_date || patient.admission_date,
        });

        await logAction('Update Patient', `Successfully updated patient with ID ${id}`);
        return updatedPatient;
    } catch (error) {
        await logAction('Update Patient', `Error updating patient with ID ${id}: ${error.message}`);
        throw new Error(`Error updating patient: ${error.message}`);
    }
};

// Create a new patient
const createPatient = async (patient_dni, board_id, discharge_date, admission_date) => {
    try {
        const newPatient = await Patient.create({
            patient_dni,
            board_id,
            discharge_date: discharge_date || null,
            admission_date,
        });

        await logAction('Create Patient', `Successfully created patient with DNI ${patient_dni}`);
        return newPatient;
    } catch (error) {
        await logAction('Create Patient', `Error creating patient with DNI ${patient_dni}: ${error.message}`);
        throw new Error(`Error creating patient: ${error.message}`);
    }
};

// Count patients
const countPatients = async (req, res) => {
    try {
        const count = await Patient.count();
        res.status(200).json({ count });
        await logAction('Count Patients', `Successfully counted patients: ${count}`);
    } catch (error) {
        res.status(500).json({ message: error.message });
        await logAction('Count Patients', `Error counting patients: ${error.message}`);
    }
};

// Delete a patient
const deletePatient = async (id) => {
    try {
        const patient = await Patient.findByPk(id);
        if (patient) {
            await patient.destroy();
            await logAction('Delete Patient', `Successfully deleted patient with ID ${id}`);
            return true;
        }
        await logAction('Delete Patient', `Patient with ID ${id} not found for deletion`);
        return false;
    } catch (error) {
        await logAction('Delete Patient', `Error deleting patient with ID ${id}: ${error.message}`);
        throw new Error(`Error deleting patient: ${error.message}`);
    }
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
    deletePatient,
};
