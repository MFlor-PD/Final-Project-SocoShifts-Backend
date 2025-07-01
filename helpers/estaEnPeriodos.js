function estaEnPeriodos(fechaStr, periodos) {
  const fecha = new Date(fechaStr).getTime();
  return periodos.some(({ inicio, fin }) => {
    const inicioMs = new Date(inicio).getTime();
    const finMs = new Date(fin).getTime();
    return fecha >= inicioMs && fecha <= finMs;
  });
}

module.exports = estaEnPeriodos;
