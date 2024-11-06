const monthlyAverageService = require('../services/monthlyAverageService');

const getMonthlyAveragesWithConditions = async (req, res) => {
    const { patientId, boardId, sensorId, yearNumber } = req.query;
  
    try {
      // Llamamos al servicio con los parámetros correctos
      const averages = await monthlyAverageService.getMonthlyAveragesWithConditions(
        patientId,
        boardId,
        sensorId,
        yearNumber
      );
  
      if (averages.length === 0) {
        return res.status(404).json({ message: 'No se encontraron resultados' });
      }
  
      res.json(averages);
    } catch (error) {
      console.error('Error al obtener los promedios mensuales:', error);
      res.status(500).json({ error: 'Error al obtener los promedios mensuales' });
    }
  };

const getAllMonthlyAverages = async (req, res) => {
    try {
        const monthlyAverages = await monthlyAverageService.getAllMonthlyAverages();
        res.status(200).json(monthlyAverages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMonthlyAverageById = async (req, res) => {
    try {
        const { id } = req.params;
        const monthlyAverage = await monthlyAverageService.getMonthlyAverageById(id);
        if (monthlyAverage) {
            res.status(200).json(monthlyAverage);
        } else {
            res.status(404).json({ message: "Monthly Average not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMonthlyAverage = async (req, res) => {
    try {
        const { patient_id, board_id, sensor_id, average_measure, index_rate_id, month_number, year_date } = req.body;
        const newMonthlyAverage = await monthlyAverageService.createMonthlyAverage(patient_id, board_id, sensor_id, average_measure, index_rate_id, month_number, year_date);
        res.status(201).json(newMonthlyAverage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMonthlyAverage = async (req, res) => {
    try {
        const { id } = req.params;
        const { patient_id, board_id, sensor_id, average_measure, index_rate_id, month_number, year_date } = req.body;
        const updatedMonthlyAverage = await monthlyAverageService.updateMonthlyAverage(id, patient_id, board_id, sensor_id, average_measure, index_rate_id, month_number, year_date);
        if (updatedMonthlyAverage) {
            res.status(200).json(updatedMonthlyAverage);
        } else {
            res.status(404).json({ message: "Monthly Average not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMonthlyAverage = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await monthlyAverageService.deleteMonthlyAverage(id);
        if (result) {
            res.status(200).json({ message: "Monthly Average deleted successfully" });
        } else {
            res.status(404).json({ message: "Monthly Average not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMonthlyAveragesWithConditions,
    getAllMonthlyAverages,
    getMonthlyAverageById,
    createMonthlyAverage,
    updateMonthlyAverage,
    deleteMonthlyAverage
};
