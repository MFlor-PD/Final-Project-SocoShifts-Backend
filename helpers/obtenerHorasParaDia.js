function obtenerHorasParaDia(fecha, periodos) {
  const [year, month, day] = fecha.split('-').map(Number);
  const fechaMs = Date.UTC(year, month - 1, day);

  for (const periodo of periodos) {
    const [inicioYear, inicioMonth, inicioDay] = periodo.inicio.split('-').map(Number);
    const [finYear, finMonth, finDay] = periodo.fin.split('-').map(Number);

    const inicioMs = Date.UTC(inicioYear, inicioMonth - 1, inicioDay);
    const finMs = Date.UTC(finYear, finMonth - 1, finDay);

    if (fechaMs >= inicioMs && fechaMs <= finMs) {
      // CORREGIDO: cambié periodo.horasDiarias por periodo.horasPorDia
      return periodo.horasPorDia;
    }
  }

  return 0;
}

module.exports = obtenerHorasParaDia;



/*function obtenerHorasParaDia(fecha, periodos) {
 
  const [year, month, day] = fecha.split('-').map(Number);
  const fechaMs = Date.UTC(year, month - 1, day);

  for (const periodo of periodos) {
    const [inicioYear, inicioMonth, inicioDay] = periodo.inicio.split('-').map(Number);
    const [finYear, finMonth, finDay] = periodo.fin.split('-').map(Number);

    const inicioMs = Date.UTC(inicioYear, inicioMonth - 1, inicioDay);
    const finMs = Date.UTC(finYear, finMonth - 1, finDay);

    if (fechaMs >= inicioMs && fechaMs <= finMs) {
      return periodo.horasDiarias;
    }
  }

  return 0;
}

module.exports = obtenerHorasParaDia;*/
