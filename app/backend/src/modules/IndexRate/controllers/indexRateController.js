const indexRateService = require('../services/indexRateService');

const getAllIndexRates = async (req, res) => {
    try {
        const indexRates = await indexRateService.getAllIndexRates();
        res.json(indexRates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getIndexRateById = async (req, res) => {
    try {
        const indexRate = await indexRateService.getIndexRateById(req.params.id);
        if (indexRate) {
            res.json(indexRate);
        } else {
            res.status(404).json({ message: 'IndexRate not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createIndexRate = async (req, res) => {
    try {
        const { rate, rate_description } = req.body;
        const newIndexRate = await indexRateService.createIndexRate({ rate, rate_description });
        res.status(201).json(newIndexRate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateIndexRate = async (req, res) => {
    try {
        const updatedIndexRate = await indexRateService.updateIndexRate(req.params.id, req.body);
        if (updatedIndexRate) {
            res.json(updatedIndexRate);
        } else {
            res.status(404).json({ message: 'IndexRate not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteIndexRate = async (req, res) => {
    try {
        const result = await indexRateService.deleteIndexRate(req.params.id);
        if (result) {
            res.json({ message: 'IndexRate deleted successfully' });
        } else {
            res.status(404).json({ message: 'IndexRate not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllIndexRates,
    getIndexRateById,
    createIndexRate,
    updateIndexRate,
    deleteIndexRate
};
