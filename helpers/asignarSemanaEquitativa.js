const obtenerHorasParaDia = require('./obtenerHorasParaDia');
const estaEnPeriodos = require('./estaEnPeriodos');

function asignarSemanaEquitativa(semana, socorristas, periodos, horasTotales, socorristasPorDia, numeroSemana) {
  console.log(`=== ASIGNAR SEMANA ${numeroSemana + 1} EQUITATIVA ===`);
  console.log(`Socorristas por día requeridos: ${socorristasPorDia}`);
  
  const trabajadoresState = socorristas.map(t => ({
    ...t,
    diasAsignados: [...t.diasAsignados],
    horasAcumuladas: t.horasAcumuladas,
    horasSemanales: 0,
    ultimaSemanaCompleta: t.ultimaSemanaCompleta || -1
  }));

  // 1. Asignar días obligatorios primero
  asignarDiasObligatorios(semana, trabajadoresState, periodos);

  // 2. Para cada día, completar hasta alcanzar socorristasPorDia
  for (const dia of semana) {
    if (!estaEnPeriodos(dia.fecha, periodos)) continue;

    const yaAsignados = trabajadoresState.filter(t => 
      t.diasAsignados.some(d => d.fecha === dia.fecha)
    );

    console.log(`\nDía ${dia.fecha}: ${yaAsignados.length}/${socorristasPorDia} asignados`);

    const faltantes = socorristasPorDia - yaAsignados.length;
    if (faltantes <= 0) continue;

    // Obtener candidatos elegibles
    const candidatos = obtenerCandidatos(
      dia, 
      trabajadoresState, 
      periodos, 
      horasTotales, 
      numeroSemana
    );

    console.log(`Candidatos disponibles: ${candidatos.length}`);
    candidatos.forEach(c => {
      console.log(`  ${c.nombre}: ${c.horasAcumuladas}h acum, ${c.horasSemanales}h sem, última semana completa: ${c.ultimaSemanaCompleta}`);
    });

    // Asignar los faltantes
    const elegidos = candidatos.slice(0, faltantes);
    
    for (const elegido of elegidos) {
      const horasDia = obtenerHorasParaDia(dia.fecha, periodos);
      elegido.diasAsignados.push(dia);
      elegido.horasAcumuladas += horasDia;
      elegido.horasSemanales += horasDia;
      
      console.log(`  ✓ Asignado: ${elegido.nombre} (+${horasDia}h)`);
    }
  }

  // 3. Marcar quién trabajó semana completa (más de 35 horas en la semana)
  trabajadoresState.forEach(t => {
    if (t.horasSemanales >= 35) {
      t.ultimaSemanaCompleta = numeroSemana;
      console.log(`${t.nombre} trabajó semana completa (${t.horasSemanales}h) - semana ${numeroSemana + 1}`);
    }
  });

  return trabajadoresState;
}

function asignarDiasObligatorios(semana, trabajadores, periodos) {
  console.log('\n--- Asignando días obligatorios ---');
  
  for (const trabajador of trabajadores) {
    if (!trabajador.dias_obligatorios || trabajador.dias_obligatorios.length === 0) continue;

    for (const dia of semana) {
      const fechaMs = new Date(dia.fecha).getTime();
      const esObligatorio = trabajador.dias_obligatorios
        .map(d => new Date(d).getTime())
        .includes(fechaMs);

      if (esObligatorio && !trabajador.diasAsignados.some(d => d.fecha === dia.fecha)) {
        const horasDia = obtenerHorasParaDia(dia.fecha, periodos);
        trabajador.diasAsignados.push(dia);
        trabajador.horasAcumuladas += horasDia;
        trabajador.horasSemanales += horasDia;
        
        console.log(`  ✓ Día obligatorio: ${trabajador.nombre} - ${dia.fecha} (+${horasDia}h)`);
      }
    }
  }
}

function obtenerCandidatos(dia, trabajadores, periodos, horasTotales, numeroSemana) {
  const horasDia = obtenerHorasParaDia(dia.fecha, periodos);
  
  return trabajadores
    .filter(t => {
      // No debe estar ya asignado este día
      const yaAsignado = t.diasAsignados.some(d => d.fecha === dia.fecha);
      if (yaAsignado) return false;

      // Debe estar dentro del límite de horas totales
      if (t.horasAcumuladas >= horasTotales) return false;

      // No debe exceder 40 horas semanales
      if (t.horasSemanales + horasDia > 40) return false;

      // Evitar trabajar semanas seguidas (descanso mínimo de 1 semana)
      if (t.ultimaSemanaCompleta >= 0 && (numeroSemana - t.ultimaSemanaCompleta) < 2) {
        console.log(`  ${t.nombre} descansando - trabajó semana completa ${t.ultimaSemanaCompleta + 1}, ahora es semana ${numeroSemana + 1}`);
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Prioridad 1: Quien tiene menos horas acumuladas
      if (a.horasAcumuladas !== b.horasAcumuladas) {
        return a.horasAcumuladas - b.horasAcumuladas;
      }
      
      // Prioridad 2: Quien tiene menos horas esta semana
      if (a.horasSemanales !== b.horasSemanales) {
        return a.horasSemanales - b.horasSemanales;
      }
      
      // Prioridad 3: Quien hace más tiempo que no trabaja semana completa
      return a.ultimaSemanaCompleta - b.ultimaSemanaCompleta;
    });
}

module.exports = asignarSemanaEquitativa;