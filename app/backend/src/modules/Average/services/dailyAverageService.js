const DailyAverage = require('../models/DailyAverage');
const Patient = require('../../Patient/models/Patient');
const Board = require('../../Board/models/Board');
const Sensor = require('../../Sensor/models/Sensor');
const IndexRate = require('../../IndexRate/models/IndexRate');


const getAllDailyAverages = async () => {
    return await DailyAverage.findAll({
        include: [
            { model: Patient, attributes: ['patient_id', 'patient_dni'] },
            { model: Board, attributes: ['board_id', 'board_code'] },
            { model: Sensor, attributes: ['sensor_id', 'sensor_code'] },
            { model: IndexRate, attributes: ['index_rate_id', 'rate'] }
        ]
    });
};

const getDailyAverageById = async (id) => {
    return await DailyAverage.findByPk(id, {
        include: [
            { model: Patient, attributes: ['patient_id', 'patient_dni'] },
            { model: Board, attributes: ['board_id', 'board_code'] },
            { model: Sensor, attributes: ['sensor_id', 'sensor_code'] },
            { model: IndexRate, attributes: ['index_rate_id', 'rate'] }
        ]
    });
};

const createDailyAverage = async (dailyAverageData) => {
    return await DailyAverage.create(dailyAverageData);
};

const updateDailyAverage = async (id, dailyAverageData) => {
    const dailyAverage = await DailyAverage.findByPk(id);
    if (dailyAverage) {
        return await dailyAverage.update(dailyAverageData);
    }
    return null;
};

const deleteDailyAverage = async (id) => {
    const dailyAverage = await DailyAverage.findByPk(id);
    if (dailyAverage) {
        await dailyAverage.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllDailyAverages,
    getDailyAverageById,
    createDailyAverage,
    updateDailyAverage,
    deleteDailyAverage
};
