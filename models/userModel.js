const pool = require('../config/postgredb');

const getAllUsers = async () => {
  const result = await pool.query(`
    SELECT u.id, u.nombre, u.apellido, r.nombre_rol
    FROM usuarios u
    LEFT JOIN roles r ON u.rol_id = r.id
  `);
  return result.rows;
};

const getUsersById = async (id) => {
  const result = await pool.query(`
    SELECT u.id, u.nombre, u.apellido, r.nombre_rol
    FROM usuarios u
    LEFT JOIN roles r ON u.rol_id = r.id
    WHERE u.id = $1
  `, [id]);
  return result.rows[0];
};

const createUser = async ({ nombre, apellido, rol_id }) => {
  const result = await pool.query(
    'INSERT INTO usuarios (nombre, apellido, rol_id) VALUES ($1, $2, $3) RETURNING *',
    [nombre, apellido, rol_id]
  );
  return result.rows[0];
};

const editUser = async (id, { nombre, apellido, rol_id }) => {
  const result = await pool.query(
    'UPDATE usuarios SET nombre = $1, apellido = $2, rol_id = $3 WHERE id = $4 RETURNING *',
    [nombre, apellido, rol_id, id]
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
