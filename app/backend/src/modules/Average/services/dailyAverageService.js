const DailyAverage = require('../models/DailyAverage');

const getAllDailyAverages = async () => {
    return await DailyAverage.findAll();
};

const getDailyAverageById = async (id) => {
    return await DailyAverage.findByPk(id);
};

const createDailyAverage = async (patient_id, board_id, sensor_id, average_measure, index_rate_id, daily_day, month_id) => {
    return await DailyAverage.create({
        patient_id,
        board_id,
        sensor_id,
        average_measure,
        index_rate_id,
        daily_day,
        month_id
    });
};

const updateDailyAverage = async (id, patient_id, board_id, sensor_id, average_measure, index_rate_id, daily_day, month_id) => {
    const dailyAverage = await DailyAverage.findByPk(id);
    if (dailyAverage) {
        dailyAverage.patient_id = patient_id;
        dailyAverage.board_id = board_id;
        dailyAverage.sensor_id = sensor_id;
        dailyAverage.average_measure = average_measure;
        dailyAverage.index_rate_id = index_rate_id;
        dailyAverage.daily_day = daily_day;
        dailyAverage.month_id = month_id;
        await dailyAverage.save();
        return dailyAverage;
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
