const pool = require('../config/postgredb');

const getAllBeaches = async () => {
  const { rows } = await pool.query('SELECT * FROM playas ORDER BY id');
  return rows;
};

const getBeachById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM playas WHERE id = $1', [id]);
  return rows[0];
};

const createBeach = async ({ nombre }) => {
  const { rows } = await pool.query(
    'INSERT INTO playas (nombre) VALUES ($1) RETURNING *',
    [nombre]
  );
  return rows[0];
};

const editBeach = async (id, { nombre }) => {
  const { rowCount } = await pool.query(
    'UPDATE playas SET nombre = $1 WHERE id = $2',
    [nombre, id]
  );
  if (rowCount === 0) throw new Error('Playa no encontrada');
  return { id, nombre };
};

const deleteBeach = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM playas WHERE id = $1', [id]);
  if (rowCount === 0) throw new Error('Playa no encontrada');
  return { id };
};

module.exports = {
  getAllBeaches,
  getBeachById,
  createBeach,
  editBeach,
  deleteBeach,
};
