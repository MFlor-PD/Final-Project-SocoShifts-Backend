const pool = require('../config/postgredb');

const asignarDiasPreferidos = async (req, res) => {
  const { usuario_id, dias } = req.body;

  if (!usuario_id || !Array.isArray(dias) || dias.length === 0) {
    return res.status(400).json({ error: "Faltan datos: usuario_id o lista de días" });
  }

  try {
    for (const diaNombre of dias) {
      // Obtener el ID del día según el nombre (en minúsculas)
      const diaResult = await pool.query(
        'SELECT id FROM dias_semana WHERE LOWER(nombre) = $1',
        [diaNombre.toLowerCase()]
      );

      if (diaResult.rows.length === 0) {
        return res.status(400).json({ error: `Día inválido: ${diaNombre}` });
      }

      const diaId = diaResult.rows[0].id;

      // Insertar en la tabla intermedia si no existe
      await pool.query(
        `INSERT INTO usuarios_dias_preferidos (usuario_id, dia_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [usuario_id, diaId]
      );
    }

    res.status(201).json({ message: "Días preferidos asignados correctamente" });
  } catch (error) {
    console.error("Error al asignar días preferidos:", error.message);
    res.status(500).json({ error: "Error interno al asignar días preferidos" });
  }
};

module.exports = {
  asignarDiasPreferidos
};
