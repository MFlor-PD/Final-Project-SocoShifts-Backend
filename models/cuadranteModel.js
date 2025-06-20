const pool = require('../config/postgredb');

const getUsuariosConPreferencias = async () => {
  const result = await pool.query(`
    SELECT 
      u.id,
      u.nombre,
      u.apellido,
      r.nombre_rol,
      ARRAY_AGG(DISTINCT d.nombre) AS dias_preferidos,
      ARRAY_AGG(DISTINCT p.nombre) AS playas_preferidas
    FROM usuarios u
    LEFT JOIN roles r ON u.rol_id = r.id
    LEFT JOIN usuarios_dias_preferidos udp ON u.id = udp.usuario_id
    LEFT JOIN dias_semana d ON udp.dia_id = d.id
    LEFT JOIN usuarios_playas_preferidas upp ON u.id = upp.usuario_id
    LEFT JOIN playas p ON upp.playa_id = p.id
    WHERE u.activo = true
    GROUP BY u.id, r.nombre_rol
  `);

  return result.rows;
};

module.exports = {
  getUsuariosConPreferencias
};
