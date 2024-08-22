const MonthlyAverage = require('../models/MonthlyAverage');

const getAllMonthlyAverages = async () => {
    return await MonthlyAverage.findAll();
};

const getMonthlyAverageById = async (id) => {
    return await MonthlyAverage.findByPk(id);
};

const createMonthlyAverage = async (patient_id, board_id, sensor_id, average_measure, index_rate_id, month_number, year_date) => {
    return await MonthlyAverage.create({
        patient_id,
        board_id,
        sensor_id,
        average_measure,
        index_rate_id,
        month_number,
        year_date
    });
};

const updateMonthlyAverage = async (id, patient_id, board_id, sensor_id, average_measure, index_rate_id, month_number, year_date) => {
    const monthlyAverage = await MonthlyAverage.findByPk(id);
    if (monthlyAverage) {
        monthlyAverage.patient_id = patient_id;
        monthlyAverage.board_id = board_id;
        monthlyAverage.sensor_id = sensor_id;
        monthlyAverage.average_measure = average_measure;
        monthlyAverage.index_rate_id = index_rate_id;
        monthlyAverage.month_number = month_number;
        monthlyAverage.year_date = year_date;
        await monthlyAverage.save();
        return monthlyAverage;
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
