const beachModel = require('../models/beachModel');

const getBeaches = async (req, res) => {
  try {
    const beaches = await beachModel.getAllBeaches();
    res.json(beaches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener playas' });
  }
};

const getBeachById = async (req, res) => {
  const id = req.params.id;
  try {
    const beach = await beachModel.getBeachById(id);
    if (!beach) return res.status(404).json({ error: 'Playa no encontrada' });
    res.json(beach);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la playa' });
  }
};

const createBeach = async (req, res) => {
  const { nombre } = req.body;
  try {
    const nuevaPlaya = await beachModel.createBeach({ nombre });
    res.status(201).json(nuevaPlaya);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la playa' });
  }
};

const editBeach = async (req, res) => {
  const id = req.params.id;
  const { nombre } = req.body;
  try {
    const beachUpdated = await beachModel.editBeach(id, { nombre });
    res.json(beachUpdated);
  } catch (error) {
    console.error(error);
    if (error.message === 'Playa no encontrada') {
      return res.status(404).json({ error: 'Playa no encontrada' });
    }
    res.status(500).json({ error: 'Error al actualizar la playa' });
  }
};

const deleteBeach = async (req, res) => {
  const id = req.params.id;
  try {
    await beachModel.deleteBeach(id);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.message === 'Playa no encontrada') {
      return res.status(404).json({ error: 'Playa no encontrada' });
    }
    res.status(500).json({ error: 'Error al eliminar la playa' });
  }
};

module.exports = {
  getBeaches,
  getBeachById,
  createBeach,
  editBeach,
  deleteBeach,
};
