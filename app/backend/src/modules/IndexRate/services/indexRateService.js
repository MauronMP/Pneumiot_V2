const { IndexRate } = require('../models/IndexRate');

const getAllIndexRates = async () => {
    return await IndexRate.findAll();
};

const getIndexRateById = async (id) => {
    return await IndexRate.findByPk(id);
};

const createIndexRate = async (indexRateData) => {
    return await IndexRate.create(indexRateData);
};

const updateIndexRate = async (id, indexRateData) => {
    const indexRate = await IndexRate.findByPk(id);
    if (indexRate) {
        return await indexRate.update(indexRateData);
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
