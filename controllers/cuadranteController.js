const { generarCuadrante } = require('../services/cuadranteService');

const cuadranteController = async (req, res) => {
  try {
    // Detectar datos según método
    const dataSource = req.method === 'POST' ? req.body : req.query;

    const mes = dataSource.mes || "2025-06";

    // periodos puede venir como JSON string si es GET, o como array si es POST
    let periodos = dataSource.periodos || [
      { inicio: `${mes}-01`, fin: `${mes}-15`, horasDiarias: 8 },
      { inicio: `${mes}-16`, fin: `${mes}-30`, horasDiarias: 8 }
    ];

    // Si periodos viene como string JSON en query, parsearlo
    if (typeof periodos === 'string') {
      try {
        periodos = JSON.parse(periodos);
      } catch {
        // dejar los valores por defecto si parse falla
      }
    }

    const cuadrante = await generarCuadrante({ mes, periodos });
    res.status(200).json(cuadrante);
  } catch (error) {
    console.error('Error al generar el cuadrante:', error.message);
    res.status(500).json({ error: 'Error al generar el cuadrante' });
  }
};

const getCuadranteController = async (req, res) => cuadranteController(req, res);

module.exports = {
  cuadranteController,
  getCuadranteController
};
