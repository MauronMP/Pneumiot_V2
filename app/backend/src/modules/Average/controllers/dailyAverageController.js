const dailyAverageService = require('../services/dailyAverageService');

const getDailyAveragesController = async (req, res) => {
    try {
        const { patientId, boardId, sensorId, startDate, endDate } = req.query;
        const dailyAverages = await dailyAverageService.getDailyAverages(patientId, boardId, sensorId, startDate, endDate);
        res.status(200).json(dailyAverages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllDailyAverages = async (req, res) => {
    try {
        const dailyAverages = await dailyAverageService.getAllDailyAverages();
        res.status(200).json(dailyAverages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDailyAverageById = async (req, res) => {
    try {
        const { id } = req.params;
        const dailyAverage = await dailyAverageService.getDailyAverageById(id);
        if (dailyAverage) {
            res.status(200).json(dailyAverage);
        } else {
            res.status(404).json({ message: "Daily Average not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createDailyAverage = async (req, res) => {
    try {
        const { patient_id, board_id, sensor_id, average_measure, index_rate_id, daily_day, month_id } = req.body;
        const newDailyAverage = await dailyAverageService.createDailyAverage(patient_id, board_id, sensor_id, average_measure, index_rate_id, daily_day, month_id);
        res.status(201).json(newDailyAverage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDailyAverage = async (req, res) => {
    try {
        const { id } = req.params;
        const { patient_id, board_id, sensor_id, average_measure, index_rate_id, daily_day, month_id } = req.body;
        const updatedDailyAverage = await dailyAverageService.updateDailyAverage(id, patient_id, board_id, sensor_id, average_measure, index_rate_id, daily_day, month_id);
        if (updatedDailyAverage) {
            res.status(200).json(updatedDailyAverage);
        } else {
            res.status(404).json({ message: "Daily Average not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDailyAverage = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await dailyAverageService.deleteDailyAverage(id);
        if (result) {
            res.status(200).json({ message: "Daily Average deleted successfully" });
        } else {
            res.status(404).json({ message: "Daily Average not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDailyAveragesController,
    getAllDailyAverages,
    getDailyAverageById,
    createDailyAverage,
    updateDailyAverage,
    deleteDailyAverage
};
