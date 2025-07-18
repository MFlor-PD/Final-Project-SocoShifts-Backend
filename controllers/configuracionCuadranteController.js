const cuadranteService = require('../services/cuadranteService');

const validarMes = (mes) => {
  if (!mes) throw new Error('Parámetro "mes" obligatorio (formato YYYY-MM)');
};

const obtenerConfiguracionHandler = async (req, res) => {
  try {
    const { mes } = req.query;
    if (mes) {

    validarMes(mes);
    const config = await cuadranteService.obtenerConfiguracionService(mes);

    if (!config) {
      return res.status(404).json({ error: 'No hay configuración registrada para este mes' });
    }

    res.json(config);
  }else  {
    const todasConfigs = await cuadranteService.obtenerTodasConfiguracionesService();
    return res.json(todasConfigs);
  }
}  catch (error) {
    console.error('Error al obtener configuración:', error.message);
    res.status(error.message.includes('obligatorio') ? 400 : 500).json({ error: error.message });
  }

};

const actualizarConfiguracionHandler = async (req, res) => {
  try {
    const { mes, horas_diarias, horas_legales_mes, socorristas_por_dia } = req.body;

    if (!mes || !horas_diarias || !horas_legales_mes || !socorristas_por_dia) {
      return res.status(400).json({ error: 'Faltan campos obligatorios para actualizar la configuración' });
    }

    const config = await cuadranteService.guardarConfiguracionService({
      mes,
      horas_diarias,
      horas_legales_mes,
      socorristas_por_dia
    });

    res.json({ message: 'Configuración actualizada con éxito', config });
  } catch (error) {
    console.error('Error al actualizar configuración:', error.message);
    res.status(500).json({ error: 'Error actualizando configuración' });
  }
};

const borrarMesHandler = async (req, res) => {
  try {
    const { mes } = req.params;
    validarMes(mes);

    await cuadranteService.borrarMesService(mes);
    res.json({ message: `Datos del mes ${mes} borrados correctamente` });
    
  } catch (error) {
    console.error('Error borrando mes:', error.message);
    res.status(error.message.includes('obligatorio') ? 400 : 500).json({ error: error.message || 'Error borrando datos del mes' });
  }
};

module.exports = {
  obtenerConfiguracionHandler,
  actualizarConfiguracionHandler,
  borrarMesHandler
};

