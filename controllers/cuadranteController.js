const { generarCuadrante } = require('../services/cuadranteService');

const cuadranteController = async (req, res) => {
  const { mes, periodos } = req.body;

  try {
    const cuadrante = await generarCuadrante({ mes, periodos });
    res.status(200).json(cuadrante);
  } catch (error) {
    console.error('Error al generar el cuadrante:', error.message);
    res.status(500).json({ error: 'Error al generar el cuadrante' });
  }
};

module.exports = {
  cuadranteController
};
