const hourlyAverageService = require('../services/hourlyAverageService');

const getAllHourlyAverages = async (req, res) => {
    try {
        const hourlyAverages = await hourlyAverageService.getAllHourlyAverages();
        res.json(hourlyAverages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getHourlyAverageById = async (req, res) => {
    try {
        const hourlyAverage = await hourlyAverageService.getHourlyAverageById(req.params.id);
        if (hourlyAverage) {
            res.json(hourlyAverage);
        } else {
            res.status(404).json({ message: 'Hourly Average not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createHourlyAverage = async (req, res) => {
    try {
        const newHourlyAverage = await hourlyAverageService.createHourlyAverage(req.body);
        res.status(201).json(newHourlyAverage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateHourlyAverage = async (req, res) => {
    try {
        const updatedHourlyAverage = await hourlyAverageService.updateHourlyAverage(req.params.id, req.body);
        if (updatedHourlyAverage) {
            res.json(updatedHourlyAverage);
        } else {
            res.status(404).json({ message: 'Hourly Average not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteHourlyAverage = async (req, res) => {
    try {
        const result = await hourlyAverageService.deleteHourlyAverage(req.params.id);
        if (result) {
            res.json({ message: 'Hourly Average deleted successfully' });
        } else {
            res.status(404).json({ message: 'Hourly Average not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllHourlyAverages,
    getHourlyAverageById,
    createHourlyAverage,
    updateHourlyAverage,
    deleteHourlyAverage
};
