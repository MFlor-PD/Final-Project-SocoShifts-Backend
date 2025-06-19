const pool = require('../config/postgredb');


const getAllDays = async () => {
  const query = 'SELECT * FROM dias_semana ORDER BY id';
  const { rows } = await pool.query(query);
  return rows;
};


const getDayById = async (id) => {
  const query = 'SELECT * FROM dias_semana WHERE id = $1';
  const { rows } = await pool.query(query, [id]);
  if (rows.length === 0) return null;
  return rows[0];
};


const createDay = async (nombre, abreviatura) => {
  const query = `
    INSERT INTO dias_semana (nombre, abreviatura)
    VALUES ($1, $2)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [nombre, abreviatura]);
  return rows[0];
};


const updateDay = async (id, nombre, abreviatura) => {
  const query = `
    UPDATE dias_semana
    SET nombre = $1, abreviatura = $2
    WHERE id = $3
    RETURNING *
  `;
  const { rows } = await pool.query(query, [nombre, abreviatura, id]);
  if (rows.length === 0) return null;
  return rows[0];
};


const deleteDay = async (id) => {
  const query = 'DELETE FROM dias_semana WHERE id = $1 RETURNING *';
  const { rows } = await pool.query(query, [id]);
  if (rows.length === 0) return null;
  return rows[0];
};

module.exports = {
  getAllDays,
  getDayById,
  createDay,
  updateDay,
  deleteDay,
};

