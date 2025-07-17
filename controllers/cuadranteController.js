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
  const { mes, periodos, horasMensuales, socorristasPorDia } = req.body;

 
  if (!mes) return res.status(400).json({ error: 'El campo "mes" es obligatorio' });

  try {
    const resultado = await cuadranteService.generarCuadranteService({
      mes,
      periodos,
      horasMensuales,
      socorristasPorDia,
    });
    

    res.json(resultado);
  } catch (error) {
    console.error('Error generando cuadrante:', error);
    res.status(500).json({ error: error.message });
  }
}


async function obtenerCuadranteHandler(req, res) {
  const { mes } = req.query;
  if (!mes) return res.status(400).json({ error: 'Parámetro mes es obligatorio (formato YYYY-MM)' });

  try {
    const cuadrante = await cuadranteService.obtenerCuadranteService(mes);
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
    const asignacionEditada = await cuadranteService.editarAsignacionService(req.body);
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
    const asignacionEliminada = await cuadranteService.eliminarAsignacionService(req.body);
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

