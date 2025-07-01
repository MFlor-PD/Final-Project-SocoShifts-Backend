const pool = require('../config/postgredb');

const getUsuariosConAsignacionesObligatorias = async () => {
  const result = await pool.query(`
    SELECT
      u.id,
      u.nombre,
      u.apellido,
      u.rol,
      u.playa,
      COALESCE(ARRAY_AGG(a.fecha ORDER BY a.fecha) FILTER (WHERE a.es_obligatorio), '{}') AS dias_obligatorios
    FROM usuarios u
    LEFT JOIN asignaciones_trabajo a ON u.id = a.usuario_id
    GROUP BY u.id
    ORDER BY u.apellido, u.nombre
  `);

  return result.rows;
};


const crearAsignacion = async ({ usuario_id, fecha, es_obligatorio }) => {
  const result = await pool.query(`
    INSERT INTO asignaciones_trabajo (usuario_id, fecha, es_obligatorio)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [usuario_id, fecha, es_obligatorio]);

  return result.rows[0];
};

module.exports = {
  getUsuariosConAsignacionesObligatorias,
  crearAsignacion,
};
