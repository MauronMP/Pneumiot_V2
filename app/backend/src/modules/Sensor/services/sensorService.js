const Sensor = require('../models/Sensor');
const Unit = require('../../Unit/models/Unit');
const { createLog } = require('../../Log/services/LogService'); // Import log creation service

// Get all Sensor records
const getAllSensors = async () => {
    try {
        const sensors = await Sensor.findAll();
        const currentTime = new Date().toISOString(); // Get current time
        await createLog(`[${
            currentTime
        }] Successfully retrieved all Sensor records.`); // Log creation for successful retrieval
        return sensors;
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error retrieving all Sensor records: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

// Get a Sensor record by its ID
const getSensorById = async (sensor_id) => {
    try {
        const sensor = await Sensor.findByPk(sensor_id);
        const currentTime = new Date().toISOString();
        if (sensor) {
            await createLog(`[${
                currentTime
            }] Sensor with ID ${sensor_id} found successfully.`); // Log creation for successful retrieval
            return sensor;
        } else {
            await createLog(`[${
                currentTime
            }] Sensor with ID ${sensor_id} not found.`); // Log creation when sensor is not found
            return null;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error retrieving Sensor with ID ${sensor_id}: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

// Create a new Sensor record
const createSensor = async (sensorData) => {
    try {
        const newSensor = await Sensor.create(sensorData);
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Sensor with ID ${newSensor.sensor_id} created successfully.`); // Log creation for successful creation
        return newSensor;
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error creating Sensor: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

// Update an existing Sensor record by its ID
const updateSensor = async (sensor_id, sensorData) => {
    try {
        const sensor = await Sensor.findByPk(sensor_id);
        const currentTime = new Date().toISOString();
        if (sensor) {
            await sensor.update(sensorData); // Update the sensor record
            await createLog(`[${
                currentTime
            }] Sensor with ID ${sensor_id} updated successfully.`); // Log creation for successful update
            return sensor;
        } else {
            await createLog(`[${
                currentTime
            }] Sensor with ID ${sensor_id} not found for update.`); // Log creation when sensor is not found for update
            return null;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error updating Sensor with ID ${sensor_id}: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

// Delete a Sensor record by its ID
const deleteSensor = async (sensor_id) => {
    try {
        const result = await Sensor.destroy({ where: { sensor_id } });
        const currentTime = new Date().toISOString();
        if (result === 1) {
            await createLog(`[${
                currentTime
            }] Sensor with ID ${sensor_id} deleted successfully.`); // Log creation for successful deletion
            return true;
        } else {
            await createLog(`[${
                currentTime
            }] Sensor with ID ${sensor_id} not found for deletion.`); // Log creation when sensor is not found for deletion
            return false;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error deleting Sensor with ID ${sensor_id}: ${error.message}`); // Log creation for error
        throw error; // Rethrow the error after logging it
    }
};

// Count total number of Sensor records
const countSensors = async (req, res) => {
    try {
        const count = await Sensor.count(); // Use the Sequelize count method
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Total number of Sensors: ${count}.`); // Log creation for successful count
        res.status(200).json({ count });
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error counting Sensors: ${error.message}`); // Log creation for error
        res.status(500).json({ message: error.message });
    }
};

// Obtener la información de un sensor con su unidad relacionada
const getSensorInformation = async (sensor_id) => {
    try {
        const sensor = await Sensor.findOne({
            where: { sensor_id },
            include: {
                model: Unit, // Incluir la relación con la unidad
                required: true, // Esto asegura que solo se devuelvan los sensores que tengan una unidad asociada
            },
        });

        const currentTime = new Date().toISOString();
        if (sensor) {
            await createLog(`[${
                currentTime
            }] Sensor with ID ${sensor_id} and its associated unit retrieved successfully.`); // Log successful retrieval
            return sensor;
        } else {
            await createLog(`[${
                currentTime
            }] Sensor with ID ${sensor_id} not found.`); // Log if sensor not found
            return null;
        }
    } catch (error) {
        const currentTime = new Date().toISOString();
        await createLog(`[${
            currentTime
        }] Error retrieving Sensor with ID ${sensor_id} and its unit: ${error.message}`); // Log error
        throw error; // Rethrow the error
    }
};


module.exports = {
    getSensorInformation,
    countSensors,
    getAllSensors,
    getSensorById,
    createSensor,
    updateSensor,
    deleteSensor,
};