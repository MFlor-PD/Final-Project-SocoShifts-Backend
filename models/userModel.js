const pool = require('../config/postgredb');

const getAllUsers = async () => {
  const result = await pool.query(`
    SELECT id, nombre, apellido, rol, playa
    FROM usuarios
  `);
  return result.rows;
};

const getUsersById = async (id) => {
  const result = await pool.query(`
    SELECT id, nombre, apellido, rol, playa
    FROM usuarios
    WHERE id = $1
  `, [id]);
  return result.rows[0];
};

const createUser = async ({ nombre, apellido, rol, playa }) => {
  const result = await pool.query(
    'INSERT INTO usuarios (nombre, apellido, rol, playa) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, apellido, rol, playa]
  );
  return result.rows[0];
};

const editUser = async (id, { nombre, apellido, rol, playa }) => {
  const result = await pool.query(
    'UPDATE usuarios SET nombre = $1, apellido = $2, rol = $3, playa = $4 WHERE id = $5 RETURNING *',
    [nombre, apellido, rol, playa, id]
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
