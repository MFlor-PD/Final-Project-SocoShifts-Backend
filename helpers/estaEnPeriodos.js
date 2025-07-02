function estaEnPeriodos(fechaStr, periodos) {
 
  const [year, month, day] = fechaStr.split('-').map(Number);
  const fechaMs = Date.UTC(year, month - 1, day);
  
  return periodos.some(({ inicio, fin }) => {
    const [inicioYear, inicioMonth, inicioDay] = inicio.split('-').map(Number);
    const [finYear, finMonth, finDay] = fin.split('-').map(Number);
    
    const inicioMs = Date.UTC(inicioYear, inicioMonth - 1, inicioDay);
    const finMs = Date.UTC(finYear, finMonth - 1, finDay);
    
    return fechaMs >= inicioMs && fechaMs <= finMs;
  });
}

module.exports = estaEnPeriodos;


/*function estaEnPeriodos(fechaStr, periodos) {
  const fecha = new Date(fechaStr).getTime();
  return periodos.some(({ inicio, fin }) => {
    const inicioMs = new Date(inicio).getTime();
    const finMs = new Date(fin).getTime();
    return fecha >= inicioMs && fecha <= finMs;
  });
}

module.exports = estaEnPeriodos;*/
