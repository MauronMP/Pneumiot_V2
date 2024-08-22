const express = require('express');
const router = express.Router();
const patientService = require('../../services/patientService');

// Definir las rutas para el servicio de pacientes
router.get('/', patientService.getAllPatients);
router.get('/:id', patientService.getPatientById);
router.post('/', patientService.createPatient);
router.put('/:id', patientService.updatePatient);
router.delete('/:id', patientService.deletePatient);

module.exports = router;
