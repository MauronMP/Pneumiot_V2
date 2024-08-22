const HourlyAverage = require('../models/HourlyAverage');

const getAllHourlyAverages = async () => {
    return await HourlyAverage.findAll();
};

const getHourlyAverageById = async (id) => {
    return await HourlyAverage.findByPk(id);
};

const createHourlyAverage = async (patient_id, board_id, sensor_id, average_measure, index_rate_id, hour_time, day_date) => {
    return await HourlyAverage.create({
        patient_id,
        board_id,
        sensor_id,
        average_measure,
        index_rate_id,
        hour_time,
        day_date
    });
};

const updateHourlyAverage = async (id, patient_id, board_id, sensor_id, average_measure, index_rate_id, hour_time, day_date) => {
    const hourlyAverage = await HourlyAverage.findByPk(id);
    if (hourlyAverage) {
        hourlyAverage.patient_id = patient_id;
        hourlyAverage.board_id = board_id;
        hourlyAverage.sensor_id = sensor_id;
        hourlyAverage.average_measure = average_measure;
        hourlyAverage.index_rate_id = index_rate_id;
        hourlyAverage.hour_time = hour_time;
        hourlyAverage.day_date = day_date;
        await hourlyAverage.save();
        return hourlyAverage;
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
