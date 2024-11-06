const HourlyAverage = require('../models/HourlyAverage');
const Sensor = require('../../Sensor/models/Sensor');

const getHourlyAverages = async (patientId, boardId, sensorId, dayDate) => {
    try {
        const results = await HourlyAverage.findAll({
            where: {
                patient_id: patientId,
                board_id: boardId,
                sensor_id: sensorId,
                day_date: dayDate,
            },
            include: [{
                model: Sensor,
                attributes: ['sensor_type'], // Obtenemos sensor_type
            }],
            order: [
                ['hour_time', 'ASC'], // Ordenar por hour_time
            ],
            attributes: ['sensor_id', 'hour_time', 'average_measure', 'index_rate_id', 'day_date'],
        });

        // Mapeo para devolver en el orden deseado
        return results.map(result => ({
            sensor_type: result.Sensor.sensor_type, // Primero sensor_type
            sensor_id: result.sensor_id,            // Luego sensor_id
            hour_time: result.hour_time,            // Luego hour_time
            average_measure: result.average_measure, // Luego average_measure
            index_rate_id: result.index_rate_id,    // Luego index_rate_id
            day_date: result.day_date,              // Finalmente day_date
        }));
    } catch (error) {
        throw new Error(`Error fetching hourly averages: ${error.message}`);
    }
};


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
    getHourlyAverages,
    getAllHourlyAverages,
    getHourlyAverageById,
    createHourlyAverage,
    updateHourlyAverage,
    deleteHourlyAverage
};
