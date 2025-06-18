const express = require('express')
const app = express();
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const PORT = process.env.PORT;
const pool = require('./config/db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        u.id AS usuario_id,
        u.nombre,
        u.apellido,
        r.nombre_rol,
        p.nombre AS playa,
        GROUP_CONCAT(d.nombre ORDER BY d.id SEPARATOR ', ') AS dias_trabajo
      FROM usuarios u
      LEFT JOIN roles r ON u.rol_id = r.id
      LEFT JOIN usuario_playa up ON u.id = up.usuario_id
      LEFT JOIN playas p ON up.playa_id = p.id
      LEFT JOIN usuario_dias_trabajo udt ON u.id = udt.usuario_id
      LEFT JOIN dias_semana d ON udt.dia_semana_id = d.id
      GROUP BY u.id, u.nombre, u.apellido, r.nombre_rol, p.nombre
      ORDER BY u.id;
    `);

    res.json(rows);
  } catch (error) {
    console.error('Error consultando la base de datos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

//app.use('/', userRoutes);

/*app.get('/', (req, res) => {
  res.send('API is running');
});*/

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});