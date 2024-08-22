const IndexRate = require('../models/IndexRate');

const getAllIndexRates = async () => {
    return await IndexRate.findAll();
};

const getIndexRateById = async (id) => {
    return await IndexRate.findByPk(id);
};

const createIndexRate = async (rate, rate_description) => {
    return await IndexRate.create({ rate, rate_description });
};

const updateIndexRate = async (id, rate, rate_description) => {
    const indexRate = await IndexRate.findByPk(id);
    if (indexRate) {
        indexRate.rate = rate;
        indexRate.rate_description = rate_description;
        await indexRate.save();
        return indexRate;
    }
    return null;
};

const deleteIndexRate = async (id) => {
    const indexRate = await IndexRate.findByPk(id);
    if (indexRate) {
        await indexRate.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllIndexRates,
    getIndexRateById,
    createIndexRate,
    updateIndexRate,
    deleteIndexRate
};
