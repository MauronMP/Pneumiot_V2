const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');  // Importa los modelos relacionados si es necesario
const Worker = require('../models/Worker');

class DoctorService {
    async getAllDoctors() {
        try {
            return await Doctor.findAll({
                include: [
                    { model: Patient, as: 'patient' }, // Incluye la relación con el modelo Patient
                    { model: Worker, as: 'worker' }    // Incluye la relación con el modelo Worker
                ]
            });
        } catch (error) {
            throw new Error('Error retrieving doctors: ' + error.message);
        }
    }

    async getDoctorById(doctor_patient_id) {
        try {
            const doctor = await Doctor.findByPk(doctor_patient_id, {
                include: [
                    { model: Patient, as: 'patient' }, // Incluye la relación con el modelo Patient
                    { model: Worker, as: 'worker' }    // Incluye la relación con el modelo Worker
                ]
            });

            if (!doctor) {
                throw new Error('Doctor not found');
            }
            return doctor;
        } catch (error) {
            throw new Error('Error retrieving doctor: ' + error.message);
        }
    }

    async createDoctor(data) {
        try {
            return await Doctor.create(data);
        } catch (error) {
            throw new Error('Error creating doctor: ' + error.message);
        }
    }

    async updateDoctor(doctor_patient_id, data) {
        try {
            const doctor = await Doctor.findByPk(doctor_patient_id);

            if (!doctor) {
                throw new Error('Doctor not found');
            }

            return await doctor.update(data);
        } catch (error) {
            throw new Error('Error updating doctor: ' + error.message);
        }
    }

    async deleteDoctor(doctor_patient_id) {
        try {
            const doctor = await Doctor.findByPk(doctor_patient_id);

            if (!doctor) {
                throw new Error('Doctor not found');
            }

            await doctor.destroy();
            return doctor;
        } catch (error) {
            throw new Error('Error deleting doctor: ' + error.message);
        }
    }
}

module.exports = new DoctorService();
