const obtenerDiasDelMes = require('./obtenerMes');
const { getNumeroSemana } = require('./utilsFechas');

function distribuirTrabajadoresAleatorio({
  mes,
  trabajadores,      // [{ id, nombre }]
  horasLegalesMes,
  socorristasPorDia,
  horasPorDiaFn,     // función (fecha) => número de horas, opcional, default 8h
  maxDiasSemana = 4, // máximo días trabajados por semana para cada trabajador
}) {
  const diasDelMes = obtenerDiasDelMes(mes);
  const totalDiasMes = diasDelMes.length;

  // Inicializamos asignaciones por trabajador
  const asignaciones = trabajadores.map(t => ({
    ...t,
    diasTrabajados: [],
    horasCumplidas: 0,
    diasPorSemana: {}, // { semanaNum: díasAsignados }
  }));

  for (const dia of diasDelMes) {
    const fecha = dia.fecha;
    const horasDia = horasPorDiaFn ? horasPorDiaFn(fecha) : 8;

    // Ordenar trabajadores por menos horas cumplidas para balancear carga
    asignaciones.sort((a, b) => a.horasCumplidas - b.horasCumplidas);

    let asignadosHoy = 0;

    for (const trabajador of asignaciones) {
      if (asignadosHoy >= socorristasPorDia) break;

      const semanaNum = getNumeroSemana(fecha, mes);
      const diasEstaSemana = trabajador.diasPorSemana[semanaNum] || 0;

      // Saltar si ya tiene max días esta semana o ya asignado este día
      if (
        diasEstaSemana >= maxDiasSemana ||
        trabajador.diasTrabajados.some(d => d.fecha === fecha)
      ) {
        continue;
      }

      // Asignar día
      trabajador.diasTrabajados.push({ fecha, dia: dia.dia });
      trabajador.horasCumplidas += horasDia;
      trabajador.diasPorSemana[semanaNum] = diasEstaSemana + 1;

      asignadosHoy++;
    }

    if (asignadosHoy < socorristasPorDia) {
      console.warn(`⚠️ No se pudo asignar suficientes trabajadores para el día ${fecha}`);
    }
  }

  return asignaciones.map(t => ({
    trabajador: t.nombre,
    dias_trabajados: t.diasTrabajados,
    horas_cumplidas: t.horasCumplidas,
    eficiencia: `${Math.round((t.horasCumplidas / horasLegalesMes) * 100)}%`
  }));
}

module.exports = distribuirTrabajadoresAleatorio;

