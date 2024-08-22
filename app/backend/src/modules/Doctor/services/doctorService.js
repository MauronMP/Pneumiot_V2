const Doctor = require('../models/Doctor');

const getAllDoctors = async () => {
    return await Doctor.findAll();
};

const getDoctorById = async (id) => {
    return await Doctor.findByPk(id);
};

const createDoctor = async (patient_id, worker_id) => {
    return await Doctor.create({
        patient_id,
        worker_id
    });
};

const updateDoctor = async (id, patient_id, worker_id) => {
    const doctor = await Doctor.findByPk(id);
    if (doctor) {
        doctor.patient_id = patient_id;
        doctor.worker_id = worker_id;
        await doctor.save();
        return doctor;
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
