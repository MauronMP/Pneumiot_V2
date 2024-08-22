const express = require('express');
const router = express.Router();
const patientController = require('../../controllers/patientController');

// Definir las rutas para el frontend de pacientes
router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.post('/', patientController.createPatient);
router.put('/:id', patientController.updatePatient);
router.delete('/:id', patientController.deletePatient);

module.exports = router;
