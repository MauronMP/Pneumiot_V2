const doctorService = require('../services/doctorService');

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorService.getAllDoctors();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDoctorById = async (req, res) => {
    try {
        const doctor = await doctorService.getDoctorById(req.params.id);
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createDoctor = async (req, res) => {
    try {
        const newDoctor = await doctorService.createDoctor(req.body);
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDoctor = async (req, res) => {
    try {
        const updatedDoctor = await doctorService.updateDoctor(req.params.id, req.body);
        if (updatedDoctor) {
            res.json(updatedDoctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDoctor = async (req, res) => {
    try {
        const result = await doctorService.deleteDoctor(req.params.id);
        if (result) {
            res.json({ message: 'Doctor deleted successfully' });
        } else {
            res.status(404).json({ message: 'Doctor not found' });
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
