const obtenerDiasDelMes = require('./obtenerDiasDelMes');
const estaEnPeriodos = require('./estaEnPeriodos');
const calcularHorasCumplidas = require('./calcularHorasCumplidas');

function obtenerHorasParaDia(fecha, periodos) {
  for (const periodo of periodos) {
    const fechaMs = new Date(fecha).getTime();
    const inicioMs = new Date(periodo.inicio).getTime();
    const finMs = new Date(periodo.fin).getTime();
    if (fechaMs >= inicioMs && fechaMs <= finMs) {
      return periodo.horasDiarias;
    }
  }
  return 0;
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

  const diasAsignadosIniciales = todosLosDias.filter(d =>
    dias_obligatorios.includes(d.fecha)
  );

  const horasCumplidas = calcularHorasCumplidas(diasAsignadosIniciales, periodos);
  const horasFaltantes = horasTotalesAsignadas - horasCumplidas;

  const diasLibres = todosLosDias.filter(d =>
    !diasAsignadosIniciales.some(asignado => asignado.fecha === d.fecha) &&
    estaEnPeriodos(d.fecha, periodos)
  );

  const diasAdicionales = [];
  let horasAcumuladas = horasCumplidas;

  for (const dia of diasLibres) {
    const horasEseDia = obtenerHorasParaDia(dia.fecha, periodos);
    if (horasAcumuladas < horasTotalesAsignadas) {
      diasAdicionales.push(dia);
      horasAcumuladas += horasEseDia;
    } else {
      break;
    }
  }

  const diasTrabajados = [...diasAsignadosIniciales, ...diasAdicionales];

  return {
    trabajador: `${nombre} ${apellido}`,
    rol: rol.toLowerCase(),
    playa_asignada: playa,
    dias_trabajados: diasTrabajados,
    horas_totales: horasTotalesAsignadas,
    horas_cumplidas: horasAcumuladas
  };
}

module.exports = generarCuadranteDesdeObligatorios;
