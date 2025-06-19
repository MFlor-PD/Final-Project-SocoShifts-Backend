const pool = require('../config/postgredb');

const getAllMonths = async () => {
  const query = 'SELECT * FROM meses ORDER BY id';
  const { rows } = await pool.query(query);
  return rows;
};

const getMonthById = async (id) => {
  const query = 'SELECT * FROM meses WHERE id = $1';
  const { rows } = await pool.query(query, [id]);
  if (rows.length === 0) return null;
  return rows[0];
};

const createMonth = async (nombre, dias_totales) => {
  const query = `
    INSERT INTO meses (nombre, dias_totales)
    VALUES ($1, $2)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [nombre, dias_totales]);
  return rows[0];
};

const updateMonth = async (id, nombre, dias_totales) => {
  const query = `
    UPDATE meses
    SET nombre = $1, dias_totales = $2
    WHERE id = $3
    RETURNING *
  `;
  const { rows } = await pool.query(query, [nombre, dias_totales, id]);
  if (rows.length === 0) return null;
  return rows[0];
};

const deleteMonth = async (id) => {
  const query = 'DELETE FROM meses WHERE id = $1 RETURNING *';
  const { rows } = await pool.query(query, [id]);
  if (rows.length === 0) return null;
  return rows[0];
};

module.exports = {
  getAllMonths,
  getMonthById,
  createMonth,
  updateMonth,
  deleteMonth,
};
