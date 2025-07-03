const cuadranteService = require('../services/cuadranteService');

const generarCuadranteHandler = async (req, res) => {
  const { mes, horasDiarias, horasLegalesMes, socorristasPorDia } = req.body;

  // Validar que los parámetros obligatorios estén presentes
  if (!mes || !horasDiarias || !horasLegalesMes || !socorristasPorDia) {
    return res.status(400).json({ error: 'Faltan parámetros obligatorios' });
  }

  try {
    // Llamar al servicio sin enviar trabajadores (se obtienen dentro del servicio)
    const resultado = await cuadranteService.generarCuadrante({
      mes,
      horasDiarias,
      horasLegalesMes,
      socorristasPorDia
    });

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generando cuadrante' });
  }
};

const obtenerCuadranteHandler = async (req, res) => {
  try {
    const { mes } = req.query;
    if (!mes) {
      return res.status(400).json({ error: 'Parámetro mes es obligatorio (formato YYYY-MM)' });
    }

    // Suponiendo que tienes este método en el servicio para recuperar el cuadrante
    const cuadrante = await cuadranteService.obtenerCuadrante(mes);

    res.json(cuadrante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener cuadrante' });
  }
};

module.exports = {
  generarCuadranteHandler,
  obtenerCuadranteHandler,
};
