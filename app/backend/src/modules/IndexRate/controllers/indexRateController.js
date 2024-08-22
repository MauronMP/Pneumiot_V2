const indexRateService = require('../services/indexRateService');

const getAllIndexRates = async (req, res) => {
    try {
        const indexRates = await indexRateService.getAllIndexRates();
        res.status(200).json(indexRates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getIndexRateById = async (req, res) => {
    try {
        const { id } = req.params;
        const indexRate = await indexRateService.getIndexRateById(id);
        if (indexRate) {
            res.status(200).json(indexRate);
        } else {
            res.status(404).json({ message: "IndexRate not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createIndexRate = async (req, res) => {
    try {
        const { rate, rate_description } = req.body;
        const newIndexRate = await indexRateService.createIndexRate(rate, rate_description);
        res.status(201).json(newIndexRate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateIndexRate = async (req, res) => {
    try {
        const { id } = req.params;
        const { rate, rate_description } = req.body;
        const updatedIndexRate = await indexRateService.updateIndexRate(id, rate, rate_description);
        if (updatedIndexRate) {
            res.status(200).json(updatedIndexRate);
        } else {
            res.status(404).json({ message: "IndexRate not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteIndexRate = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await indexRateService.deleteIndexRate(id);
        if (result) {
            res.status(200).json({ message: "IndexRate deleted successfully" });
        } else {
            res.status(404).json({ message: "IndexRate not found" });
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
