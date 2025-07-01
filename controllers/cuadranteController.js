const { 
  getUsuariosConAsignacionesObligatorias, 
  crearAsignacion 
} = require('../models/cuadranteModel');
const { generarCuadrante } = require('../services/cuadranteService');

const obtenerUsuariosConAsignaciones = async (req, res) => {
  try {
    const usuarios = await getUsuariosConAsignacionesObligatorias();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener asignaciones de usuarios' });
  }
};

const crearAsignacionHandler = async (req, res) => {
  try {
    const { usuario_id, fecha, es_obligatorio } = req.body;
    const result = await crearAsignacion({ usuario_id, fecha, es_obligatorio });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear asignación' });
  }
};

const generarCuadranteHandler = async (req, res) => {
  try {
    const { mes, periodos } = req.body;
    const resultado = await generarCuadrante({ mes, periodos });
    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar el cuadrante' });
  }
};

module.exports = {
  obtenerUsuariosConAsignaciones,
  crearAsignacionHandler,
  generarCuadranteHandler
};
