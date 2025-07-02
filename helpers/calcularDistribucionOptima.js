const obtenerHorasParaDia = require('./obtenerHorasParaDia');
const estaEnPeriodos = require('./estaEnPeriodos');

function calcularDistribucionOptima(semanas, socorristas, periodos, horasObjetivo) {
  console.log('=== CALCULANDO DISTRIBUCIÓN ÓPTIMA ===');
  
  // Contar días laborables y horas totales disponibles
  let diasLaborables = 0;
  let horasTotalesDisponibles = 0;
  
  for (const semana of semanas) {
    for (const dia of semana) {
      if (estaEnPeriodos(dia.fecha, periodos)) {
        diasLaborables++;
        horasTotalesDisponibles += obtenerHorasParaDia(dia.fecha, periodos);
      }
    }
  }
  
  console.log(`Días laborables en el mes: ${diasLaborables}`);
  console.log(`Horas totales disponibles: ${horasTotalesDisponibles}`);
  console.log(`Socorristas disponibles: ${socorristas.length}`);
  console.log(`Horas objetivo por socorrista: ${horasObjetivo}`);
  
  // Calcular horas totales necesarias
  const horasTotalesNecesarias = socorristas.length * horasObjetivo;
  console.log(`Horas totales necesarias: ${horasTotalesNecesarias}`);
  
  // Calcular socorristas por día óptimo
  const socorristasPorDiaOptimo = Math.ceil(horasTotalesNecesarias / horasTotalesDisponibles);
  
  console.log(`Socorristas por día óptimo: ${socorristasPorDiaOptimo}`);
  
  // Verificar si es posible
  if (socorristasPorDiaOptimo > socorristas.length) {
    console.warn('⚠️ ADVERTENCIA: No hay suficientes socorristas para cubrir todas las horas');
    return {
      socorristasPorDia: socorristas.length,
      esFactible: false,
      horasRealesporPersona: Math.floor(horasTotalesDisponibles / socorristas.length),
      porcentajeCumplimiento: Math.round((horasTotalesDisponibles / horasTotalesNecesarias) * 100)
    };
  }
  
  // Calcular horas reales que conseguirá cada persona
  const puestosTotales = diasLaborables * socorristasPorDiaOptimo;
  const horasRealesPorPersona = Math.floor(puestosTotales * (horasTotalesDisponibles / diasLaborables) / socorristas.length);
  
  return {
    socorristasPorDia: socorristasPorDiaOptimo,
    esFactible: true,
    horasRealesporPersona: horasRealesPorPersona,
    porcentajeCumplimiento: Math.round((horasRealesPorPersona / horasObjetivo) * 100),
    puestosTotales,
    diasLaborables
  };
}

module.exports = calcularDistribucionOptima;