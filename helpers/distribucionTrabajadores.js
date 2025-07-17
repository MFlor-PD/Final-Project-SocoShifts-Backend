const obtenerDiasDelMes = require('./obtenerMes');
const { getNumeroSemana } = require('./utilsFechas');

function calcularMaxDiasSemana(horasPorDia, maxHorasSemana = 40) {
  return Math.min(Math.floor(maxHorasSemana / horasPorDia), 5);
}

function asignarDiaATrabajador(trabajador, dia, horasDia, semanaNum) {
  
  trabajador.diasTrabajados.push({ fecha: dia.fecha, dia: dia.dia });
  trabajador.horasCumplidas += horasDia;
  trabajador.diasPorSemana[semanaNum] = (trabajador.diasPorSemana[semanaNum] || 0) + 1;
}

function puedeTrabajarHoy(trabajador, fecha, maxDiasSemana, semanaNum) {
  const diasEstaSemana = trabajador.diasPorSemana[semanaNum] || 0;
  const yaAsignadoHoy = trabajador.diasTrabajados.some(d => d.fecha === fecha);
  return diasEstaSemana < maxDiasSemana && !yaAsignadoHoy;
}

function distribuirTrabajadoresAleatorio({
  mes,
  trabajadores,
  horasLegalesMes,
  socorristasPorDia,
  horasPorDiaFn = () => 8,
}) {
  const diasDelMes = obtenerDiasDelMes(mes);
  if (diasDelMes.length === 0) return [];

  const horasPrimerDia = horasPorDiaFn(diasDelMes[0].fecha);
  const maxDiasSemana = calcularMaxDiasSemana(horasPrimerDia);

  const asignaciones = trabajadores.map(({ id, nombre }) => ({
    id,
    nombre,
    diasTrabajados: [],
    horasCumplidas: 0,
    diasPorSemana: {},
  }));

  for (const dia of diasDelMes) {
    const { fecha } = dia;
    const horasDia = horasPorDiaFn(fecha);
    const semanaNum = getNumeroSemana(fecha, mes);

    asignaciones.sort((a, b) => a.horasCumplidas - b.horasCumplidas);

    let asignadosHoy = 0;

    // Primer intento con el límite normal
    for (const trabajador of asignaciones) {
      if (asignadosHoy >= socorristasPorDia) break;
      if (puedeTrabajarHoy(trabajador, fecha, maxDiasSemana, semanaNum)) {
        asignarDiaATrabajador(trabajador, dia, horasDia, semanaNum);
        asignadosHoy++;
      }
    }

    // Si faltan asignar y no se llegó al máximo, intento sin límite maxDiasSemana
    if (asignadosHoy < socorristasPorDia) {
      for (const trabajador of asignaciones) {
        if (asignadosHoy >= socorristasPorDia) break;
        // Permitir asignar incluso si supera maxDiasSemana
        const yaAsignadoHoy = trabajador.diasTrabajados.some(d => d.fecha === fecha);
        if (!yaAsignadoHoy) {
          asignarDiaATrabajador(trabajador, dia, horasDia, semanaNum);
          asignadosHoy++;
        }
      }
      if (asignadosHoy < socorristasPorDia) {
        console.warn(`⚠️ No se pudo asignar suficientes trabajadores para el día ${fecha}`);
      }
    }
  }

  return asignaciones.map(({ nombre, diasTrabajados, horasCumplidas }) => ({
    trabajador: nombre,
    dias_trabajados: diasTrabajados,
    horas_cumplidas: horasCumplidas,
    eficiencia: `${Math.round((horasCumplidas / horasLegalesMes) * 100)}%`,
  }));
}


module.exports = distribuirTrabajadoresAleatorio;

