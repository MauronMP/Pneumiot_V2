const monthlyAverageService = require('../services/monthlyAverageService');

const getAllMonthlyAverages = async (req, res) => {
    try {
        const monthlyAverages = await monthlyAverageService.getAllMonthlyAverages();
        res.json(monthlyAverages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMonthlyAverageById = async (req, res) => {
    try {
        const monthlyAverage = await monthlyAverageService.getMonthlyAverageById(req.params.id);
        if (monthlyAverage) {
            res.json(monthlyAverage);
        } else {
            res.status(404).json({ message: 'Monthly Average not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMonthlyAverage = async (req, res) => {
    try {
        const newMonthlyAverage = await monthlyAverageService.createMonthlyAverage(req.body);
        res.status(201).json(newMonthlyAverage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMonthlyAverage = async (req, res) => {
    try {
        const updatedMonthlyAverage = await monthlyAverageService.updateMonthlyAverage(req.params.id, req.body);
        if (updatedMonthlyAverage) {
            res.json(updatedMonthlyAverage);
        } else {
            res.status(404).json({ message: 'Monthly Average not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMonthlyAverage = async (req, res) => {
    try {
        const result = await monthlyAverageService.deleteMonthlyAverage(req.params.id);
        if (result) {
            res.json({ message: 'Monthly Average deleted successfully' });
        } else {
            res.status(404).json({ message: 'Monthly Average not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllMonthlyAverages,
    getMonthlyAverageById,
    createMonthlyAverage,
    updateMonthlyAverage,
    deleteMonthlyAverage
};
