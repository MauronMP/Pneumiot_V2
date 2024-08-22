const doctorService = require('../services/doctorService');

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorService.getAllDoctors();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await doctorService.getDoctorById(id);
        if (doctor) {
            res.status(200).json(doctor);
        } else {
            res.status(404).json({ message: "Doctor not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createDoctor = async (req, res) => {
    try {
        const { patient_id, worker_id } = req.body;
        const newDoctor = await doctorService.createDoctor(patient_id, worker_id);
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { patient_id, worker_id } = req.body;
        const updatedDoctor = await doctorService.updateDoctor(id, patient_id, worker_id);
        if (updatedDoctor) {
            res.status(200).json(updatedDoctor);
        } else {
            res.status(404).json({ message: "Doctor not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await doctorService.deleteDoctor(id);
        if (result) {
            res.status(200).json({ message: "Doctor deleted successfully" });
        } else {
            res.status(404).json({ message: "Doctor not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
};
