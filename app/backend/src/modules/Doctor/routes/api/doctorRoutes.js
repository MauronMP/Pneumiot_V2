const express = require('express');
const router = express.Router();
const doctorServices = require('../../services/doctorService');

router.get('/', doctorServices.getAllDoctors);
router.get('/:id', doctorServices.getDoctorById);
router.post('/', doctorServices.createDoctor);
router.put('/:id', doctorServices.updateDoctor);
router.delete('/:id', doctorServices.deleteDoctor);

module.exports = router;
