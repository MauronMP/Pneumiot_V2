const express = require('express');
const router = express.Router();
const patientAditionalInfoController = require('../../controllers/patientAditionalInfoController');

router.get('/:patientId', patientAditionalInfoController.getAditionalInfoByPatientId);
router.post('/', patientAditionalInfoController.createAditionalInfo);
router.put('/:patientId', patientAditionalInfoController.updateAditionalInfo);
router.delete('/:patientId', patientAditionalInfoController.deleteAditionalInfo);

module.exports = router;
