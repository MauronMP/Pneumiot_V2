const express = require('express');
const router = express.Router();
const patientController = require('../../controllers/patientController');

// Definir las rutas para el frontend de patient
router.get('/', patientController.getAllPatients);
router.get('/:measurement_id', patientController.getPatientById);
router.post('/', patientController.createPatient);
router.put('/:measurement_id', patientController.updatePatient);
router.delete('/:measurement_id', patientController.deletePatient);

module.exports = router;
