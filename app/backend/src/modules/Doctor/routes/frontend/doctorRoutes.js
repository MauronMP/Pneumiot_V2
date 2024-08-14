const express = require('express');
const router = express.Router();
const doctorController = require('../../controllers/doctorController');

// Las rutas aquí pueden incluir validaciones adicionales o lógica específica para el frontend
router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);
router.post('/', doctorController.createDoctor);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
