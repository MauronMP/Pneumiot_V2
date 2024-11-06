const Doctor = require('../models/Doctor');
const { createLog } = require('../../Log/services/LogService'); // Importing the log service

// Get all doctors from the database
const getAllDoctors = async () => {
    try {
        const currentTime = new Date().toISOString();
        
        // Log the action of fetching all doctors
        await createLog(`[${currentTime}] Fetching all doctors`);
        
        // Fetch all doctors from the database
        const doctors = await Doctor.findAll();
        return doctors;
    } catch (error) {
        // Log the error if something goes wrong
        await createLog(`[${currentTime}] Error fetching doctors: ${error.message}`);
        throw new Error(`Error fetching doctors: ${error.message}`);
    }
};

// Get a specific doctor by their ID
const getDoctorById = async (id) => {
    try {
        const currentTime = new Date().toISOString();
        
        // Log the action of fetching a specific doctor by ID
        await createLog(`[${currentTime}] Fetching doctor with ID: ${id}`);
        
        // Find the doctor by their primary key (ID)
        const doctor = await Doctor.findByPk(id);
        
        // Log if the doctor with the given ID was not found
        if (!doctor) {
            await createLog(`[${currentTime}] Doctor with ID: ${id} not found`);
        }
        
        return doctor;
    } catch (error) {
        // Log the error if something goes wrong
        await createLog(`[${currentTime}] Error fetching doctor with ID ${id}: ${error.message}`);
        throw new Error(`Error fetching doctor with ID ${id}: ${error.message}`);
    }
};

// Create a new doctor record
const createDoctor = async (patient_id, worker_id) => {
    try {
        const currentTime = new Date().toISOString();
        
        // Create a new doctor record in the database
        const newDoctor = await Doctor.create({
            patient_id,
            worker_id
        });
        
        // Log the action of creating a new doctor
        await createLog(`[${currentTime}] Created doctor for Patient ID: ${patient_id}, Worker ID: ${worker_id}`);
        
        return newDoctor;
    } catch (error) {
        // Log the error if the creation fails
        await createLog(`[${currentTime}] Error creating doctor: ${error.message}`);
        throw new Error(`Error creating doctor: ${error.message}`);
    }
};

// Update an existing doctor record by ID
const updateDoctor = async (id, patient_id, worker_id) => {
    try {
        const currentTime = new Date().toISOString();
        
        // Find the doctor by their ID
        const doctor = await Doctor.findByPk(id);

        if (doctor) {
            // If the doctor is found, update their details
            doctor.patient_id = patient_id;
            doctor.worker_id = worker_id;
            await doctor.save();
            
            // Log the action of updating the doctor
            await createLog(`[${currentTime}] Updated doctor with ID: ${id}, Patient ID: ${patient_id}, Worker ID: ${worker_id}`);
            return doctor;
        }

        // Log if the doctor with the given ID was not found for update
        await createLog(`[${currentTime}] Doctor with ID: ${id} not found for update`);
        return null;
    } catch (error) {
        // Log the error if something goes wrong during the update
        await createLog(`[${currentTime}] Error updating doctor with ID ${id}: ${error.message}`);
        throw new Error(`Error updating doctor with ID ${id}: ${error.message}`);
    }
};

// Delete a doctor record by ID
const deleteDoctor = async (id) => {
    try {
        const currentTime = new Date().toISOString();
        
        // Find the doctor by their ID
        const doctor = await Doctor.findByPk(id);

        if (doctor) {
            // If the doctor is found, delete their record
            await doctor.destroy();
            
            // Log the action of deleting the doctor
            await createLog(`[${currentTime}] Deleted doctor with ID: ${id}`);
            return true;
        }

        // Log if the doctor with the given ID was not found for deletion
        await createLog(`[${currentTime}] Doctor with ID: ${id} not found for deletion`);
        return false;
    } catch (error) {
        // Log the error if the deletion fails
        await createLog(`[${currentTime}] Error deleting doctor with ID ${id}: ${error.message}`);
        throw new Error(`Error deleting doctor with ID ${id}: ${error.message}`);
    }
};

module.exports = {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
};