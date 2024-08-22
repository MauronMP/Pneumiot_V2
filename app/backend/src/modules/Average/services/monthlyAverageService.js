const HourlyAverage = require('../models/HourlyAverage');
const Patient = require('../../Patient/models/Patient');
const Board = require('../../Board/models/Board');
const Sensor = require('../../Sensor/models/Sensor');
const IndexRate = require('../../IndexRate/models/IndexRate');

const getAllMonthlyAverages = async () => {
    return await MonthlyAverage.findAll({
        include: [
            { model: Patient, attributes: ['patient_id', 'patient_dni'] },
            { model: Board, attributes: ['board_id', 'board_code'] },
            { model: Sensor, attributes: ['sensor_id', 'sensor_code'] },
            { model: IndexRate, attributes: ['index_rate_id', 'rate'] }
        ]
    });
};

const getMonthlyAverageById = async (id) => {
    return await MonthlyAverage.findByPk(id, {
        include: [
            { model: Patient, attributes: ['patient_id', 'patient_dni'] },
            { model: Board, attributes: ['board_id', 'board_code'] },
            { model: Sensor, attributes: ['sensor_id', 'sensor_code'] },
            { model: IndexRate, attributes: ['index_rate_id', 'rate'] }
        ]
    });
};

const createMonthlyAverage = async (monthlyAverageData) => {
    return await MonthlyAverage.create(monthlyAverageData);
};

const updateMonthlyAverage = async (id, monthlyAverageData) => {
    const monthlyAverage = await MonthlyAverage.findByPk(id);
    if (monthlyAverage) {
        return await monthlyAverage.update(monthlyAverageData);
    }
    return null;
};

const deleteMonthlyAverage = async (id) => {
    const monthlyAverage = await MonthlyAverage.findByPk(id);
    if (monthlyAverage) {
        await monthlyAverage.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllMonthlyAverages,
    getMonthlyAverageById,
    createMonthlyAverage,
    updateMonthlyAverage,
    deleteMonthlyAverage
};
