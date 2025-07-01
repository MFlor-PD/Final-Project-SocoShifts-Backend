function calcularHorasCumplidas(diasTrabajados, periodos) {
  let total = 0;

  for (const dia of diasTrabajados) {
    for (const periodo of periodos) {
      const fechaDia = new Date(dia.fecha).getTime();
      const inicioPeriodo = new Date(periodo.inicio).getTime();
      const finPeriodo = new Date(periodo.fin).getTime();

      if (fechaDia >= inicioPeriodo && fechaDia <= finPeriodo) {
        total += periodo.horasDiarias;
        break;
      }
    }
  }

  return total;
}

module.exports = calcularHorasCumplidas;
