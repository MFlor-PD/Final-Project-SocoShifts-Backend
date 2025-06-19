const weekModel= require ('../models/weekModel');


const getAllWeekDays = async (req, res) => {
  try {
    const dias = await weekModel.getAllDays();
    res.json(dias);
  } catch (error) {
    console.error('Error al obtener días de la semana:', error);
    res.status(500).json({ error: 'Error al obtener días de la semana' });
  }
};

const getWeekDayById = async (req, res) => {
  const { id } = req.params;
  try {
    const dia = await weekModel.getDayById(id);
    if (!dia) {
      return res.status(404).json({ error: 'Día de la semana no encontrado' });
    }
    res.json(dia);
  } catch (error) {
    console.error('Error al obtener día de la semana:', error);
    res.status(500).json({ error: 'Error al obtener día de la semana' });
  }
}

const createWeekDay = async (req, res) => {
  const { nombre, abreviatura } = req.body;
  try {
    const nuevoDia = await weekModel.createDay(nombre, abreviatura);
    res.status(201).json(nuevoDia);
  } catch (error) {
    console.error('Error al crear día de la semana:', error);
    res.status(500).json({ error: 'Error al crear día de la semana' });
  }
};

const updateWeekDay = async (req, res) => {
  const { id } = req.params;
  const { nombre, abreviatura } = req.body;
  try {
    const diaActualizado = await weekModel.updateDay(id, nombre, abreviatura);
    if (!diaActualizado) {
      return res.status(404).json({ error: 'Día de la semana no encontrado' });
    }
    res.json(diaActualizado);
  } catch (error) {
    console.error('Error al actualizar día de la semana:', error);
    res.status(500).json({ error: 'Error al actualizar día de la semana' });
  }
};

const deleteWeekDay = async (req, res) => {
  const { id } = req.params;
  try {
    const diaEliminado = await weekModel.deleteDay(id);
    if (!diaEliminado) {
      return res.status(404).json({ error: 'Día de la semana no encontrado' });
    }
    res.json({ message: 'Día de la semana eliminado', dia: diaEliminado });
  } catch (error) {
    console.error('Error al eliminar día de la semana:', error);
    res.status(500).json({ error: 'Error al eliminar día de la semana' });
  }
};
module.exports = {
  getAllWeekDays,
  getWeekDayById,
  createWeekDay,
  updateWeekDay,
  deleteWeekDay
};