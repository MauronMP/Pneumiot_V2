const PatientAditionalInfo = require('../models/PatientAditionalInfo');
const Patient = require('../models/Patient');
const { createLog } = require('../../Log/services/LogService');

const logAction = async (action, message) => {
  const currentTime = new Date().toISOString();
  await createLog(`[${currentTime}] ${action}: ${message}`);
};

const getAditionalInfoByPatientId = async (patientId) => {
  try {
    const info = await PatientAditionalInfo.findOne({ where: { patient_id: patientId } });
    await logAction('Fetch Additional Info', `Fetched info for patient ID ${patientId}`);
    return info;
  } catch (error) {
    await logAction('Fetch Additional Info', `Error fetching info: ${error.message}`);
    throw new Error(`Error fetching info: ${error.message}`);
  }
};

const createAditionalInfo = async (data) => {
  try {
    const newInfo = await PatientAditionalInfo.create(data);
    await logAction('Create Additional Info', `Created info for patient ID ${data.patient_id}`);
    return newInfo;
  } catch (error) {
    await logAction('Create Additional Info', `Error creating info: ${error.message}`);
    throw new Error(`Error creating info: ${error.message}`);
  }
};

const updateAditionalInfo = async (patientId, data) => {
  try {
    const info = await PatientAditionalInfo.findOne({ where: { patient_id: patientId } });
    if (!info) return null;
    const updatedInfo = await info.update(data);
    await logAction('Update Additional Info', `Updated info for patient ID ${patientId}`);
    return updatedInfo;
  } catch (error) {
    await logAction('Update Additional Info', `Error updating info: ${error.message}`);
    throw new Error(`Error updating info: ${error.message}`);
  }
};

const deleteAditionalInfo = async (patientId) => {
  try {
    const info = await PatientAditionalInfo.findOne({ where: { patient_id: patientId } });
    if (info) {
      await info.destroy();
      await logAction('Delete Additional Info', `Deleted info for patient ID ${patientId}`);
      return true;
    }
    return false;
  } catch (error) {
    await logAction('Delete Additional Info', `Error deleting info: ${error.message}`);
    throw new Error(`Error deleting info: ${error.message}`);
  }
};

// Servicio para obtener la información completa del paciente
const getPatientCompleteInfo = async () => {
  try {
    // Usando Sequelize para hacer la consulta JOIN
    const patientsInfo = await PatientAditionalInfo.findAll({
      include: [{
        model: Patient,
        attributes: ['patient_id', 'patient_dni', 'admission_date', 'discharge_date'],
      }],
      attributes: [
        'patient_id',
        'patient_name',
        'patient_surname',
        'date_birth',
      ],
    });

    // Transformación de los datos obtenidos para aplanar el JSON
    return patientsInfo.map((info) => ({
      patient_id: info.patient_id,
      patient_name: info.patient_name,
      patient_surname: info.patient_surname,
      date_birth: info.date_birth,
      patient_dni: info.Patient.patient_dni,
      admission_date: info.Patient.admission_date,
      discharge_date: info.Patient.discharge_date,
    }));
  } catch (error) {
    throw new Error(`Error al obtener información completa del paciente: ${error.message}`);
  }
};

module.exports = {
  getPatientCompleteInfo,
  getAditionalInfoByPatientId,
  createAditionalInfo,
  updateAditionalInfo,
  deleteAditionalInfo,
};
