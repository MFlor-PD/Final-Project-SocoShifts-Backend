const pool = require('../config/postgredb');

const getAllRoles = async () => {
    const query = 'SELECT * FROM roles ORDER BY id';
    const { rows } = await pool.query(query);
    return rows;
}

const getRoleById = async (id) => {
    const query = 'SELECT * FROM roles WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) return null;
    return rows[0];
};

const createRole = async (nombre_rol) => {
    const query = `
        INSERT INTO roles (nombre_rol)
        VALUES ($1)
        RETURNING *
    `;
    const { rows } = await pool.query(query, [nombre_rol]);
    return rows[0];
};

const updateRole = async (id, nombre_rol) => {
    const query = `
        UPDATE roles
        SET nombre_rol = $1
        WHERE id = $2
        RETURNING *
    `;
    const { rows } = await pool.query(query, [nombre_rol, id]);
    if (rows.length === 0) return null;
    return rows[0];
};

const deleteRole = async (id) => {
    const query = 'DELETE FROM roles WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) return null;
    return rows[0];
};

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};
