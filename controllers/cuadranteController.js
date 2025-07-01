const { getUsuariosConAsignacionesObligatorias, crearAsignacion } = require('../models/cuadranteModel');

const obtenerUsuariosConAsignaciones = async (req, res) => {
  try {
    const usuarios = await getUsuariosConAsignacionesObligatorias();
    res.json(usuarios);
  } catch (error) {
    console.error('Error obteniendo usuarios con asignaciones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const crearAsignacionHandler = async (req, res) => {
  try {
    const { usuarioId, fecha, esObligatorio } = req.body;
    if (!usuarioId || !fecha) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const nuevaAsignacion = await crearAsignacion(usuarioId, fecha, esObligatorio || false);
    res.status(201).json(nuevaAsignacion);
  } catch (error) {
    console.error('Error creando asignación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  obtenerUsuariosConAsignaciones,
  crearAsignacionHandler
};
