const BoardSensor = require("../models/BoardSensor");

// Obtener todas las asociaciones board_sensor
exports.getAllBoardSensors = async (req, res) => {
  try {
    const boardSensors = await BoardSensor.findAll();
    res.status(200).json(boardSensors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una asociación board_sensor por board_id y sensor_id
exports.getBoardSensorByIds = async (req, res) => {
  try {
    const { boardId, sensorId } = req.params;
    const boardSensor = await BoardSensor.findOne({
      where: { board_id: boardId, sensor_id: sensorId }
    });
    if (!boardSensor) {
      return res.status(404).json({ message: "BoardSensor association not found" });
    }
    res.status(200).json(boardSensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva asociación board_sensor
exports.createBoardSensor = async (req, res) => {
  try {
    const { board_id, sensor_id } = req.body;
    const newBoardSensor = await BoardSensor.create({ board_id, sensor_id });
    res.status(201).json(newBoardSensor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una asociación board_sensor
exports.deleteBoardSensor = async (req, res) => {
  try {
    const { boardId, sensorId } = req.params;
    const deleted = await BoardSensor.destroy({
      where: { board_id: boardId, sensor_id: sensorId }
    });
    if (!deleted) {
      return res.status(404).json({ message: "BoardSensor association not found" });
    }
    res.status(200).json({ message: "BoardSensor association deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
