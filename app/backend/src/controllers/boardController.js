const Board = require("../models/Board");

// Obtener todos los boards
exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.findAll();
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un board por ID
exports.getBoardById = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await Board.findByPk(id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo board
exports.createBoard = async (req, res) => {
  try {
    const { board_code } = req.body;
    const newBoard = await Board.create({ board_code });
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un board existente
exports.updateBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { board_code } = req.body;
    const updatedBoard = await Board.update(
      { board_code },
      { where: { board_id: id } }
    );
    if (updatedBoard[0] === 0) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.status(200).json({ message: "Board updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un board
exports.deleteBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Board.destroy({ where: { board_id: id } });
    if (!deleted) {
      return res.status(404).json({ message: "Board not found" });
    }
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
