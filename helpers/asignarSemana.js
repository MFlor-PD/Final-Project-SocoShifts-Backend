const obtenerHorasParaDia = require('./obtenerHorasParaDia');
const estaEnPeriodos = require('./estaEnPeriodos');

function asignarSemana(semana, trabajadores, periodos, horasTotales) {
  console.log('=== INICIO asignarSemana ===');
  console.log('Días de la semana recibidos:', semana.map(d => d.fecha));
  console.log('Períodos:', JSON.stringify(periodos, null, 2));
  
  // Crear copia profunda manteniendo horasAcumuladas
  const trabajadoresState = trabajadores.map(t => ({
    ...t,
    diasAsignados: [...(t.diasAsignados || [])],
    horasAcumuladas: typeof t.horasAcumuladas === 'number' ? t.horasAcumuladas : 0
  }));

  console.log('Estado inicial trabajadores:', trabajadoresState.map(t => ({
    nombre: t.nombre,
    horasAcumuladas: t.horasAcumuladas,
    tipo: typeof t.horasAcumuladas
  })));

  // Asignar días obligatorios primero
  for (const trabajador of trabajadoresState) {
    if (!trabajador.dias_obligatorios) continue;
    
    for (const dia of semana) {
      const fechaMs = new Date(dia.fecha).getTime();
      const esObligatorio = trabajador.dias_obligatorios
        .map(d => new Date(d).getTime())
        .includes(fechaMs);

      if (esObligatorio && !trabajador.diasAsignados.some(d => d.fecha === dia.fecha)) {
        const horasDia = obtenerHorasParaDia(dia.fecha, periodos);
        console.log(`Día obligatorio - ${trabajador.nombre}: ${dia.fecha}, horas obtenidas: ${horasDia}, tipo: ${typeof horasDia}`);
        
        if (typeof horasDia === 'number' && !isNaN(horasDia)) {
          trabajador.diasAsignados.push(dia);
          trabajador.horasAcumuladas += horasDia;
          console.log(`${trabajador.nombre} ahora tiene ${trabajador.horasAcumuladas} horas acumuladas`);
        } else {
          console.error(`ERROR: obtenerHorasParaDia devolvió un valor inválido: ${horasDia}`);
        }
      }
    }
  }

  // Asignar días libres equilibrando las horas
  for (const dia of semana) {
    console.log(`\nProcesando día: ${dia.fecha}`);
    console.log(`estaEnPeriodos(${dia.fecha}):`, estaEnPeriodos(dia.fecha, periodos));
    
    const candidatos = trabajadoresState
      .filter(t => {
        const yaAsignado = t.diasAsignados.some(d => d.fecha === dia.fecha);
        const enPeriodos = estaEnPeriodos(dia.fecha, periodos);
        const dentroLimite = t.horasAcumuladas < horasTotales;
        
        console.log(`  ${t.nombre}: yaAsignado=${yaAsignado}, enPeriodos=${enPeriodos}, dentroLimite=${dentroLimite} (${t.horasAcumuladas}/${horasTotales})`);
        
        return !yaAsignado && dentroLimite && enPeriodos;
      })
      .sort((a, b) => a.horasAcumuladas - b.horasAcumuladas);

    console.log(`Candidatos para ${dia.fecha}:`, candidatos.map(c => c.nombre));

    if (candidatos.length === 0) {
      console.log(`No hay candidatos para el día ${dia.fecha}`);
      continue;
    }

    const elegido = candidatos[0];
    const horasDia = obtenerHorasParaDia(dia.fecha, periodos);
    console.log(`Día libre - ${elegido.nombre}: ${dia.fecha}, horas obtenidas: ${horasDia}, tipo: ${typeof horasDia}`);
    
    if (typeof horasDia === 'number' && !isNaN(horasDia)) {
      elegido.diasAsignados.push(dia);
      elegido.horasAcumuladas += horasDia;
      console.log(`${elegido.nombre} ahora tiene ${elegido.horasAcumuladas} horas acumuladas`);
    } else {
      console.error(`ERROR: obtenerHorasParaDia devolvió un valor inválido: ${horasDia}`);
    }
  }

  console.log('=== FIN asignarSemana ===');
  console.log('Estado final trabajadores:', trabajadoresState.map(t => ({
    nombre: t.nombre,
    horasAcumuladas: t.horasAcumuladas,
    diasCount: t.diasAsignados.length,
    tipo: typeof t.horasAcumuladas
  })));

  return trabajadoresState;
}

module.exports = asignarSemana;



/*const obtenerHorasParaDia = require('./obtenerHorasParaDia');
const estaEnPeriodos = require('./estaEnPeriodos');

function asignarSemana(semana, trabajadores, periodos, horasTotales) {
  const trabajadoresState = trabajadores.map(t => ({
    ...t,
    diasAsignados: [...(t.diasAsignados || [])],
    horasAcumuladas: t.horasAcumuladas || 0
  }));

  // Asignar días obligatorios primero
  for (const trabajador of trabajadoresState) {
    for (const dia of semana) {
      const fechaMs = new Date(dia.fecha).getTime();
      const esObligatorio = trabajador.dias_obligatorios
        .map(d => new Date(d).getTime())
        .includes(fechaMs);

      if (esObligatorio && !trabajador.diasAsignados.some(d => d.fecha === dia.fecha)) {
        trabajador.diasAsignados.push(dia);
        trabajador.horasAcumuladas += obtenerHorasParaDia(dia.fecha, periodos);
      }
    }
  }

  // Asignar días libres equilibrando las horas
  for (const dia of semana) {
    const candidatos = trabajadoresState
      .filter(t => t.horasAcumuladas < horasTotales && estaEnPeriodos(dia.fecha, periodos))
      .sort((a, b) => a.horasAcumuladas - b.horasAcumuladas);

    if (candidatos.length === 0) continue;

    const elegido = candidatos[0];
    elegido.diasAsignados.push(dia);
    elegido.horasAcumuladas += obtenerHorasParaDia(dia.fecha, periodos);
  }

  return trabajadoresState;
}

module.exports = asignarSemana;
*/