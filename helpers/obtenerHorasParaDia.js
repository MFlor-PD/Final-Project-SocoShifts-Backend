function obtenerHorasParaDia(fecha, periodos) {
  const fechaMs = new Date(fecha).getTime();

  for (const periodo of periodos) {
    const inicioMs = new Date(periodo.inicio).getTime();
    const finMs = new Date(periodo.fin).getTime();

    if (fechaMs >= inicioMs && fechaMs <= finMs) {
      return periodo.horasDiarias;
    }
  }

  return 0;
}

module.exports = obtenerHorasParaDia;
