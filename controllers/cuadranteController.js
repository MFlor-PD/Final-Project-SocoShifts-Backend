const { getUsuariosConAsignacionesObligatorias, crearAsignacion } = require('../models/cuadranteModel');
const generarCuadranteGlobal = require('../helpers/generarCuadranteGlobal');

const obtenerUsuariosConAsignaciones = async (req, res) => {
  try {
    const usuarios = await getUsuariosConAsignacionesObligatorias();

    const usuariosFormateados = usuarios.map(u => ({
      ...u,
      dias_obligatorios: u.dias_obligatorios.map(fecha => fecha.split('T')[0])
    }));

    res.json(usuariosFormateados);

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
    const { mes, periodos, horasMensuales } = req.body;

    if (!mes || typeof mes !== 'string' || !/^\d{4}-\d{2}$/.test(mes)) {
      return res.status(400).json({ error: 'El campo mes es obligatorio y debe ser un string con formato YYYY-MM' });
    }

    if (!Array.isArray(periodos) || periodos.length === 0) {
      return res.status(400).json({ error: 'El campo periodos es obligatorio y debe ser un array' });
    }

    if (typeof horasMensuales !== 'number') {
      return res.status(400).json({ error: 'El campo horasMensuales es obligatorio y debe ser un número' });
    }

    const resultado = await generarCuadranteGlobal({ mes, periodos, horasMensuales });
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
