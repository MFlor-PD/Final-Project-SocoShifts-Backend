const distribuirTrabajadoresAleatorio = require('../helpers/distribucionTrabajadores');
const { guardarCuadranteEnBD } = require('../helpers/guardarCuadranteEnBD');
const pool = require('../config/postgredb'); // Ajusta la ruta según tu proyecto

async function generarCuadrante({ mes, horasDiarias, horasLegalesMes, socorristasPorDia }) {
  // Obtener trabajadores activos desde la base de datos
  const query = 'SELECT id, nombre FROM usuarios';
  const { rows: trabajadores } = await pool.query(query);

  if (!trabajadores.length) {
    throw new Error('No hay trabajadores activos para asignar');
  }

  // Llamar al helper que hace la distribución
  const resultado = distribuirTrabajadoresAleatorio({
    mes,
    trabajadores,
    horasDiarias,
    horasLegalesMes,
    socorristasPorDia
  });

  // Guardar el cuadrante generado en la base de datos
  await guardarCuadranteEnBD(resultado);

  return resultado;
}

async function obtenerCuadrante(mes) {
  // Aquí puedes implementar lógica para recuperar el cuadrante de la base
  // por ejemplo, consultar la tabla asignaciones_trabajo filtrando por mes
  const query = `
    SELECT u.nombre AS trabajador, at.fecha
    FROM asignaciones_trabajo at
    JOIN usuarios u ON u.id = at.usuario_id
    WHERE to_char(at.fecha, 'YYYY-MM') = $1
    ORDER BY u.nombre, at.fecha
  `;
  const { rows } = await pool.query(query, [mes]);

  // Organizar los datos para devolverlos en un formato similar al generado
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

  const resultado = [];
  for (const [trabajador, dias_trabajados] of resultadoMap.entries()) {
    resultado.push({ trabajador, dias_trabajados });
  }

  return resultado;
}

module.exports = {
  generarCuadrante,
  obtenerCuadrante,
};
