const distribuirTrabajadoresAleatorio = require('../helpers/distribucionTrabajadores');
const { guardarCuadranteEnBD, editarAsignacion, eliminarAsignacion } = require('../helpers/guardarCuadranteEnBD');
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

async function generarCuadrante({ mes, horasDiarias, horasLegalesMes, socorristasPorDia }) {
  try {
    const trabajadores = await obtenerTrabajadoresActivos();

    const resultado = distribuirTrabajadoresAleatorio({
      mes,
      trabajadores,
      horasDiarias,
      horasLegalesMes,
      socorristasPorDia
    });

    await guardarCuadranteEnBD(resultado);

    return resultado;
  } catch (error) {
    throw new Error(`Error generando cuadrante: ${error.message}`);
  }
}

async function obtenerCuadrante(mes) {
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

module.exports = {
  generarCuadrante,
  obtenerCuadrante,
  editarAsignacion: editarAsignacionService,
  eliminarAsignacion: eliminarAsignacionService,
};
