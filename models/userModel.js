const pool = require('../config/postgredb');

const getAllUsers = async () => {
  const result = await pool.query(`
    SELECT u.id, u.nombre, u.apellido, r.nombre_rol, u.activo
    FROM usuarios u
    LEFT JOIN roles r ON u.rol_id = r.id
  `);
  return result.rows;
};

const getUsersById = async (id) => {
  const result = await pool.query(`
    SELECT u.id, u.nombre, u.apellido, r.nombre_rol, u.activo
    FROM usuarios u
    LEFT JOIN roles r ON u.rol_id = r.id
    WHERE u.id = $1
  `, [id]);
  return result.rows[0];
};

const createUser = async ({ nombre, apellido, rol_id, activo = false }) => {
  const result = await pool.query(
    'INSERT INTO usuarios (nombre, apellido, rol_id, activo) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, apellido, rol_id, activo]
  );
  return result.rows[0];
};


const editUser = async (id, { nombre, apellido, rol_id, activo }) => {
  const result = await pool.query(
    'UPDATE usuarios SET nombre = $1, apellido = $2, rol_id = $3, activo = $4 WHERE id = $5 RETURNING *',
    [nombre, apellido, rol_id, activo, id]
  );
  if (result.rowCount === 0) {
    throw new Error('Usuario no encontrado');
  }
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await pool.query(
    'DELETE FROM usuarios WHERE id = $1 RETURNING *',
    [id]
  );
  if (result.rowCount === 0) {
    throw new Error('Usuario no encontrado');
  }
  return result.rows[0];
};

module.exports = {
  getAllUsers,
  getUsersById,
  createUser,
  editUser,
  deleteUser
};
