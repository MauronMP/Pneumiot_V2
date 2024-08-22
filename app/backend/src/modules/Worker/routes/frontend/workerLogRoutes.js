const express = require('express');
const router = express.Router();
const workerLogController = require('../../controllers/workerLogController');

router.get('/', workerLogController.getAllWorkerLogs);
router.get('/:id', workerLogController.getWorkerLogById);
router.post('/', workerLogController.createWorkerLog);
router.put('/:id', workerLogController.updateWorkerLog);
router.delete('/:id', workerLogController.deleteWorkerLog);

module.exports = router;
