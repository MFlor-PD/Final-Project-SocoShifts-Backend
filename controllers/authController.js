const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../config/postgredb');

const login = async (req, res) => {
  const { username, password } = req.body;

  // Buscar usuario en DB
  const { rows } = await pool.query('SELECT * FROM usuarios WHERE nombre = $1', [username]);
  if (rows.length === 0) return res.status(400).json({ error: 'Usuario no encontrado' });

  const user = rows[0];

  // Verificar password
  const validPass = await bcrypt.compare(password, user.password_hash);
  if (!validPass) return res.status(400).json({ error: 'Contraseña incorrecta' });

  // Crear token
  const token = jwt.sign({ id: user.id, rol: user.rol_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

  res.json({ token });
};