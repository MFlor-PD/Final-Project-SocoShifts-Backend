const obtenerDiasDelMes = require('./obtenerDiasDelMes');
const estaEnPeriodos = require('./estaEnPeriodos');
const calcularHorasCumplidas = require('./calcularHorasCumplidas');
const obtenerHorasParaDia = require('./obtenerHorasParaDia');

function agruparPorSemanas(dias) {
  const semanas = [];
  let semanaActual = [];

  for (const dia of dias) {
    semanaActual.push(dia);
    if (semanaActual.length === 7) {
      semanas.push(semanaActual);
      semanaActual = [];
    }
  }

  if (semanaActual.length > 0) semanas.push(semanaActual);

  return semanas;
}

function generarCuadranteDesdeObligatorios({
  nombre,
  apellido,
  rol,
  playa,
  dias_obligatorios,
  mes,
  periodos,
  horasTotalesAsignadas
}) {

  const todosLosDias = obtenerDiasDelMes(mes);
  const obligatoriosMs = dias_obligatorios.map(d => new Date(d).getTime());

  const diasAsignadosIniciales = todosLosDias.filter(d =>
    obligatoriosMs.includes(new Date(d.fecha).getTime())

  );

  let horasAcumuladas = calcularHorasCumplidas(diasAsignadosIniciales, periodos);
  const asignadosInicialesMs = diasAsignadosIniciales.map(d => new Date(d.fecha).getTime());

  const diasRestantes = todosLosDias.filter(d => !asignadosInicialesMs.includes(new Date(d.fecha).getTime()) && estaEnPeriodos(d.fecha, periodos)

  );

  const semanas = agruparPorSemanas(diasRestantes);
  const diasAdicionales = [];

  for (const semana of semanas) {
    let horasSemana = 0;
    const diasSemana = [];

    for (const dia of semana) {
      const horasDia = obtenerHorasParaDia(dia.fecha, periodos);
      if (horasAcumuladas >= horasTotalesAsignadas) break;
      if (horasSemana + horasDia > 40) continue;

      diasSemana.push(dia);
      horasSemana += horasDia;
      horasAcumuladas += horasDia;
    }

    diasAdicionales.push(...diasSemana);

    if (horasAcumuladas >= horasTotalesAsignadas) break;
  }

  const diasTrabajados = [...diasAsignadosIniciales, ...diasAdicionales].sort(
    (a, b) => new Date(a.fecha) - new Date(b.fecha)
  );

  return {
    trabajador: `${nombre} ${apellido}`,
    rol: rol.toLowerCase(),
    playa_asignada: playa,
    dias_trabajados: diasTrabajados,
    horas_totales: horasTotalesAsignadas,
    horas_cumplidas: parseFloat(horasAcumuladas.toFixed(2))
  };
}

module.exports = generarCuadranteDesdeObligatorios;

