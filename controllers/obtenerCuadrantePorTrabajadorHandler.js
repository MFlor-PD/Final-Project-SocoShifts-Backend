const cuadranteService = require('../services/cuadranteService');
async function obtenerCuadrantePorTrabajadorHandler(req, res) {
  const { id } = req.params;
  const { mes } = req.query;

  if (!mes || !id) return res.status(400).json({ error: 'Mes e ID requeridos' });

  try {
    const resultado = await cuadranteService.obtenerCuadrantePorTrabajador(mes, id);
    res.json(resultado);
  } catch (error) {
    console.error('Error al obtener cuadrante por trabajador:', error);
    res.status(500).json({ error: 'Error interno' });
  }
}

module.exports = obtenerCuadrantePorTrabajadorHandler;
