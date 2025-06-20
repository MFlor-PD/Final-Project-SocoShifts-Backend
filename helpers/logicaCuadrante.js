// ===============================================
// ARCHIVO: helpers/logicaCuadrante.js
// ===============================================

function obtenerDiasDelMes(mes) {
  const [anio, mesStr] = mes.split('-');
  const mesNum = parseInt(mesStr, 10) - 1;
  const dias = [];
  let fecha = new Date(anio, mesNum, 1);

  while (fecha.getMonth() === mesNum) {
    const diaNombre = fecha.toLocaleDateString('es-ES', { weekday: 'long' });
    const diaFormateado = fecha.toISOString().slice(0, 10);
    dias.push({ fecha: diaFormateado, dia: diaNombre.toLowerCase() });
    fecha.setDate(fecha.getDate() + 1);
  }

  return dias;
}

function estaEnPeriodos(fechaStr, periodos) {
  const fecha = new Date(fechaStr).getTime();
  return periodos.some(({ inicio, fin }) => {
    const inicioMs = new Date(inicio).getTime();
    const finMs = new Date(fin).getTime();
    return fecha >= inicioMs && fecha <= finMs;
  });
}

function calcularHorasCumplidas(diasTrabajados, periodos) {
  let total = 0;

  for (const dia of diasTrabajados) {
    for (const periodo of periodos) {
      const fechaDia = new Date(dia.fecha).getTime();
      const inicioPeriodo = new Date(periodo.inicio).getTime();
      const finPeriodo = new Date(periodo.fin).getTime();

      if (fechaDia >= inicioPeriodo && fechaDia <= finPeriodo) {
        total += periodo.horasDiarias;
        break;
      }
    }
  }

  return total;
}

function generarCuadranteIndividual({
  nombre,
  apellido,
  rol,
  playaAsignada,
  diasPreferidos,
  mes,
  periodos,
  horasTotalesAsignadas,
}) {
  const todosLosDias = obtenerDiasDelMes(mes);

  const diasTrabajados = todosLosDias.filter(d =>
    diasPreferidos.includes(d.dia)
    && estaEnPeriodos(d.fecha, periodos)
  );

  const horasCumplidas = calcularHorasCumplidas(diasTrabajados, periodos);

  const diasLibres = todosLosDias.filter(d =>
    !diasTrabajados.some(dt => dt.fecha === d.fecha)
    && estaEnPeriodos(d.fecha, periodos)
  );

  return {
    trabajador: `${nombre} ${apellido}`,
    rol: rol.toLowerCase(),
    playa_asignada: playaAsignada,
    dias_trabajados: diasTrabajados,
    dias_libres: diasLibres,
    horas_totales: horasTotalesAsignadas,
    horas_cumplidas: horasCumplidas,
  };
}

module.exports = {
  generarCuadranteIndividual,
  obtenerDiasDelMes,
  estaEnPeriodos,
  calcularHorasCumplidas
};
