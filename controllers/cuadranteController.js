const cuadranteService = require('../services/cuadranteService');

function validarCampos(obj, campos) {
  for (const campo of campos) {
    if (obj[campo] === undefined || obj[campo] === null) {
      return `Falta el campo obligatorio: ${campo}`;
    }
  }
  return null;
}

async function generarCuadranteHandler(req, res) {
  const error = validarCampos(req.body, ['mes', 'horasDiarias', 'horasLegalesMes', 'socorristasPorDia']);
  if (error) return res.status(400).json({ error });

  try {
    const resultado = await cuadranteService.generarCuadrante(req.body);
    res.json(resultado);
  } catch (error) {
    console.error('Error generando cuadrante:', error);
    res.status(500).json({ error: 'Error generando cuadrante' });
  }
}

async function obtenerCuadranteHandler(req, res) {
  const { mes } = req.query;
  if (!mes) return res.status(400).json({ error: 'Parámetro mes es obligatorio (formato YYYY-MM)' });

  try {
    const cuadrante = await cuadranteService.obtenerCuadrante(mes);
    res.json(cuadrante);
  } catch (error) {
    console.error('Error al obtener cuadrante:', error);
    res.status(500).json({ error: 'Error al obtener cuadrante' });
  }
}

async function editarAsignacionHandler(req, res) {
  const error = validarCampos(req.body, ['usuario_id', 'fecha', 'es_obligatorio']);
  if (error) return res.status(400).json({ error });

  try {
    const asignacionEditada = await cuadranteService.editarAsignacion(req.body);
    res.json({ message: 'Asignación editada con éxito', asignacion: asignacionEditada });
  } catch (error) {
    console.error('Error al editar asignación:', error);
    res.status(500).json({ error: 'Error al editar asignación' });
  }
}

async function eliminarAsignacionHandler(req, res) {
  const error = validarCampos(req.body, ['usuario_id', 'fecha']);
  if (error) return res.status(400).json({ error });

  try {
    const asignacionEliminada = await cuadranteService.eliminarAsignacion(req.body);
    res.json({ message: 'Asignación eliminada con éxito', asignacion: asignacionEliminada });
  } catch (error) {
    console.error('Error al eliminar asignación:', error);
    res.status(500).json({ error: 'Error al eliminar asignación' });
  }
}

module.exports = {
  generarCuadranteHandler,
  obtenerCuadranteHandler,
  editarAsignacionHandler,
  eliminarAsignacionHandler,
};

