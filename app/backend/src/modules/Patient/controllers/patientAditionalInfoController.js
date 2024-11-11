const patientAditionalInfoService = require('../services/patientAditionalInfoService');

const getAditionalInfoByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const info = await patientAditionalInfoService.getAditionalInfoByPatientId(patientId);
    if (info) {
      res.status(200).json(info);
    } else {
      res.status(404).json({ message: "Additional info not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAditionalInfo = async (req, res) => {
  try {
    const data = req.body;
    const newInfo = await patientAditionalInfoService.createAditionalInfo(data);
    res.status(201).json(newInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAditionalInfo = async (req, res) => {
  try {
    const { patientId } = req.params;
    const data = req.body;
    const updatedInfo = await patientAditionalInfoService.updateAditionalInfo(patientId, data);
    if (updatedInfo) {
      res.status(200).json(updatedInfo);
    } else {
      res.status(404).json({ message: "Additional info not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAditionalInfo = async (req, res) => {
  try {
    const { patientId } = req.params;
    const result = await patientAditionalInfoService.deleteAditionalInfo(patientId);
    if (result) {
      res.status(200).json({ message: "Additional info deleted successfully" });
    } else {
      res.status(404).json({ message: "Additional info not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener la información completa del paciente
const getPatientCompleteInfo = async (req, res) => {
  try {
    const patientInfo = await patientAditionalInfoService.getPatientCompleteInfo();
    res.status(200).json(patientInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPatientCompleteInfo,
  getAditionalInfoByPatientId,
  createAditionalInfo,
  updateAditionalInfo,
  deleteAditionalInfo,
};
