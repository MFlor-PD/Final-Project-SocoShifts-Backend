function calcularHorasCumplidas(diasTrabajados, periodos) {
  if (!Array.isArray(diasTrabajados) || !Array.isArray(periodos)) {
    throw new Error('diasTrabajados y periodos deben ser arreglos');
  }

  let total = 0;

  for (const dia of diasTrabajados) {
    const fechaDia = new Date(dia.fecha).getTime();
    if (isNaN(fechaDia)) continue;

    for (const periodo of periodos) {
      const inicioPeriodo = new Date(periodo.inicio).getTime();
      const finPeriodo = new Date(periodo.fin).getTime();

      if (isNaN(inicioPeriodo) || isNaN(finPeriodo)) continue;

      if (fechaDia >= inicioPeriodo && fechaDia <= finPeriodo) {
        total += periodo.horasDiarias;
        break; 
      }
    }
  }

  return total;
}

module.exports = calcularHorasCumplidas;