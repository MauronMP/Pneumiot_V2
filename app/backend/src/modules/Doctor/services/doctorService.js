const Doctor = require('../models/Doctor');
const Patient = require('../../Patient/models/Patient');
const Worker = require('../../Worker/models/Worker');

const getAllDoctors = async () => {
    return await Doctor.findAll({
        include: [
            { model: Patient, attributes: ['patient_id', 'patient_dni'] },
            { model: Worker, attributes: ['worker_id', 'worker_name', 'worker_surname'] }
        ]
    });
};

const getDoctorById = async (id) => {
    return await Doctor.findByPk(id, {
        include: [
            { model: Patient, attributes: ['patient_id', 'patient_dni'] },
            { model: Worker, attributes: ['worker_id', 'worker_name', 'worker_surname'] }
        ]
    });
};

const createDoctor = async (doctorData) => {
    return await Doctor.create(doctorData);
};

const updateDoctor = async (id, doctorData) => {
    const doctor = await Doctor.findByPk(id);
    if (doctor) {
        return await doctor.update(doctorData);
    }
    return null;
};

const deleteDoctor = async (id) => {
    const doctor = await Doctor.findByPk(id);
    if (doctor) {
        await doctor.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
};