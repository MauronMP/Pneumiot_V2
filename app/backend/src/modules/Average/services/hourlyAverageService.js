const HourlyAverage = require('../models/HourlyAverage');
const Patient = require('../../Patient/models/Patient');
const Board = require('../../Board/models/Board');
const Sensor = require('../../Sensor/models/Sensor');
const IndexRate = require('../../IndexRate/models/IndexRate');

const getAllHourlyAverages = async () => {
    return await HourlyAverage.findAll({
        include: [
            { model: Patient, attributes: ['patient_id', 'patient_dni'] },
            { model: Board, attributes: ['board_id', 'board_code'] },
            { model: Sensor, attributes: ['sensor_id', 'sensor_code'] },
            { model: IndexRate, attributes: ['index_rate_id', 'rate'] }
        ]
    });
};

const getHourlyAverageById = async (id) => {
    return await HourlyAverage.findByPk(id, {
        include: [
            { model: Patient, attributes: ['patient_id', 'patient_dni'] },
            { model: Board, attributes: ['board_id', 'board_code'] },
            { model: Sensor, attributes: ['sensor_id', 'sensor_code'] },
            { model: IndexRate, attributes: ['index_rate_id', 'rate'] }
        ]
    });
};

const createHourlyAverage = async (hourlyAverageData) => {
    return await HourlyAverage.create(hourlyAverageData);
};

const updateHourlyAverage = async (id, hourlyAverageData) => {
    const hourlyAverage = await HourlyAverage.findByPk(id);
    if (hourlyAverage) {
        return await hourlyAverage.update(hourlyAverageData);
    }
    return null;
};

const deleteHourlyAverage = async (id) => {
    const hourlyAverage = await HourlyAverage.findByPk(id);
    if (hourlyAverage) {
        await hourlyAverage.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllHourlyAverages,
    getHourlyAverageById,
    createHourlyAverage,
    updateHourlyAverage,
    deleteHourlyAverage
};
