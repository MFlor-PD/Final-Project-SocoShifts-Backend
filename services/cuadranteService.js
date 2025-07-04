const distribuirTrabajadoresAleatorio = require('../helpers/distribucionTrabajadores');
const {
  guardarCuadranteEnBD,
  obtenerConfiguracionCuadrante,
  guardarConfiguracionCuadrante,
  editarAsignacion,
  eliminarAsignacion,
  borrarMesCompleto
} = require('../helpers/guardarCuadranteEnBD');

const pool = require('../config/postgredb');

async function obtenerTrabajadoresActivos() {
  const query = 'SELECT id, nombre FROM usuarios';
  const { rows } = await pool.query(query);
  if (!rows.length) throw new Error('No hay trabajadores activos para asignar');
  return rows;
}

function transformarFilasACuadrante(rows) {
  const resultadoMap = new Map();

  rows.forEach(({ trabajador, fecha }) => {
    if (!resultadoMap.has(trabajador)) {
      resultadoMap.set(trabajador, []);
    }
    resultadoMap.get(trabajador).push({
      fecha: fecha.toISOString().slice(0, 10),
      dia: fecha.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
    });
  });

  return Array.from(resultadoMap, ([trabajador, dias_trabajados]) => ({ trabajador, dias_trabajados }));
}

async function generarCuadranteService({ mes }) {
  try {
    const config = await obtenerConfiguracionCuadrante(mes);
    if (!config) throw new Error('No hay configuración cargada para este mes');

    const { horas_diarias, horas_legales_mes, socorristas_por_dia } = config;
    const trabajadores = await obtenerTrabajadoresActivos();

    const resultado = distribuirTrabajadoresAleatorio({
      mes,
      trabajadores,
      horasLegalesMes: horas_legales_mes,
      socorristasPorDia: socorristas_por_dia,
      horasPorDiaFn: () => horas_diarias
    });

    await guardarCuadranteEnBD(resultado);
    return resultado;
  } catch (error) {
    throw new Error(`Error generando cuadrante: ${error.message}`);
  }
}

async function obtenerCuadranteService(mes) {
  try {
    const query = `
      SELECT u.nombre AS trabajador, at.fecha
      FROM asignaciones_trabajo at
      JOIN usuarios u ON u.id = at.usuario_id
      WHERE to_char(at.fecha, 'YYYY-MM') = $1
      ORDER BY u.nombre, at.fecha
    `;
    const { rows } = await pool.query(query, [mes]);
    return transformarFilasACuadrante(rows);
  } catch (error) {
    throw new Error(`Error obteniendo cuadrante: ${error.message}`);
  }
}

async function editarAsignacionService({ usuario_id, fecha, es_obligatorio }) {
  try {
    return await editarAsignacion({ usuario_id, fecha, es_obligatorio });
  } catch (error) {
    throw new Error(`Error editando asignación: ${error.message}`);
  }
}

async function eliminarAsignacionService({ usuario_id, fecha }) {
  try {
    return await eliminarAsignacion({ usuario_id, fecha });
  } catch (error) {
    throw new Error(`Error eliminando asignación: ${error.message}`);
  }
}

async function guardarConfiguracionService({ mes, horas_diarias, horas_legales_mes, socorristas_por_dia }) {
  try {
    return await guardarConfiguracionCuadrante({ mes, horas_diarias, horas_legales_mes, socorristas_por_dia });
  } catch (error) {
    throw new Error(`Error guardando configuración: ${error.message}`);
  }
}

async function obtenerConfiguracionService(mes) {
  try {
    return await obtenerConfiguracionCuadrante(mes);
  } catch (error) {
    throw new Error(`Error obteniendo configuración: ${error.message}`);
  }
}

async function borrarMesService(mes) {
  if (!mes) throw new Error('Mes es obligatorio para borrar datos');
  try {
    return await borrarMesCompleto(mes);
  } catch (error) {
    throw new Error(`Error borrando mes: ${error.message}`);
  }
}

module.exports = {
  generarCuadranteService,
  obtenerCuadranteService,
  editarAsignacionService,
  eliminarAsignacionService,
  guardarConfiguracionService,
  obtenerConfiguracionService,
  borrarMesService,
};
