const DoctorService = require('../services/doctorService');

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await DoctorService.getAllDoctors();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await DoctorService.getDoctorById(id);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.createDoctor = async (req, res) => {
    try {
        const doctor = await DoctorService.createDoctor(req.body);
        res.status(201).json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDoctor = await DoctorService.updateDoctor(id, req.body);
        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        await DoctorService.deleteDoctor(id);
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
