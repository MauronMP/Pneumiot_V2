const dailyAverageService = require('../services/dailyAverageService');

const getAllDailyAverages = async (req, res) => {
    try {
        const dailyAverages = await dailyAverageService.getAllDailyAverages();
        res.json(dailyAverages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDailyAverageById = async (req, res) => {
    try {
        const dailyAverage = await dailyAverageService.getDailyAverageById(req.params.id);
        if (dailyAverage) {
            res.json(dailyAverage);
        } else {
            res.status(404).json({ message: 'Daily Average not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createDailyAverage = async (req, res) => {
    try {
        const newDailyAverage = await dailyAverageService.createDailyAverage(req.body);
        res.status(201).json(newDailyAverage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDailyAverage = async (req, res) => {
    try {
        const updatedDailyAverage = await dailyAverageService.updateDailyAverage(req.params.id, req.body);
        if (updatedDailyAverage) {
            res.json(updatedDailyAverage);
        } else {
            res.status(404).json({ message: 'Daily Average not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDailyAverage = async (req, res) => {
    try {
        const result = await dailyAverageService.deleteDailyAverage(req.params.id);
        if (result) {
            res.json({ message: 'Daily Average deleted successfully' });
        } else {
            res.status(404).json({ message: 'Daily Average not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllDailyAverages,
    getDailyAverageById,
    createDailyAverage,
    updateDailyAverage,
    deleteDailyAverage
};
