const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/postgredb');

const login = async (req, res) => {
  const { username, password } = req.body;

  // Buscar usuario en DB
  const { rows } = await pool.query('SELECT * FROM usuarios WHERE nombre = $1', [username]);
  if (rows.length === 0) return res.status(400).json({ error: 'Usuario no encontrado' });

  const user = rows[0];

  if (!user.activo) return res.status(403).json({ error: 'Usuario inactivo, contacte al administrador' });

  // Verificar password
  const validPass = await bcrypt.compare(password, user.password_hash);
  if (!validPass) return res.status(400).json({ error: 'Contraseña incorrecta' });

  // Obtener permisos del usuario
  const permisosResult = await pool.query(`
    SELECT p.nombre_permiso FROM permisos p
    JOIN usuario_permisos up ON p.id = up.permiso_id
    WHERE up.usuario_id = $1
  `, [user.id]);

  const permisos = permisosResult.rows.map(r => r.nombre_permiso);

  // Crear token con permisos
  const token = jwt.sign(
    { id: user.id, rol: user.rol_id, permisos },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ token });
};

module.exports = { login };
