const monthModel = require('../models/monthModel');


const getAllMonths = async (req, res) => {
  try {
    const meses = await monthModel.getAllMonths();
    res.json(meses);
  } catch (error) {
    console.error('Error al obtener meses:', error);
    res.status(500).json({ error: 'Error al obtener meses' });
  }
};

const getMonthById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const mes = await monthModel.getMonthById(id);
    if (!mes) {
      return res.status(404).json({ error: 'Mes no encontrado' });
    }
    res.json(mes);
  } catch (error) {
    console.error('Error al obtener mes:', error);
    res.status(500).json({ error: 'Error al obtener mes' });
  }
};


const createMonth = async (req, res) => {
  const { nombre, dias_totales } = req.body;
  if (!nombre || !dias_totales) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  try {
    const nuevoMes = await monthModel.createMonth(nombre, dias_totales);
    res.status(201).json(nuevoMes);
  } catch (error) {
    console.error('Error al crear mes:', error);
    res.status(500).json({ error: 'Error al crear mes' });
  }
};


const updateMonth = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nombre, dias_totales } = req.body;
  if (!nombre || !dias_totales) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  try {
    const mesActualizado = await monthModel.updateMonth(id, nombre, dias_totales);
    if (!mesActualizado) {
      return res.status(404).json({ error: 'Mes no encontrado para actualizar' });
    }
    res.json(mesActualizado);
  } catch (error) {
    console.error('Error al actualizar mes:', error);
    res.status(500).json({ error: 'Error al actualizar mes' });
  }
};

const deleteMonth = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const mesEliminado = await monthModel.deleteMonth(id);
    if (!mesEliminado) {
      return res.status(404).json({ error: 'Mes no encontrado para eliminar' });
    }
    res.json({ message: 'Mes eliminado correctamente', mes: mesEliminado });
  } catch (error) {
    console.error('Error al eliminar mes:', error);
    res.status(500).json({ error: 'Error al eliminar mes' });
  }
};

module.exports = {
  getAllMonths,
  getMonthById,
  createMonth,
  updateMonth,
  deleteMonth,
};
