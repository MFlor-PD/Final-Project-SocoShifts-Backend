const pool = require('../config/db');

const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
}

const getUsersById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
}

const createUser = async ({ nombre, apellido, rol_id }) => {
    const [result] = await pool.query('INSERT INTO usuarios (nombre, apellido, rol_id) VALUES (?, ?, ?)', [nombre, apellido, rol_id]);
    return {
        id: result.insertId,
        nombre,
        apellido,
        rol_id
    };
}

const editUser = async (id, { nombre, apellido, rol_id }) => {
    const [result] = await pool.query('UPDATE usuarios SET nombre = ?, apellido = ?, rol_id = ? WHERE id = ?', [nombre, apellido, rol_id, id]);
    if (result.affectedRows === 0) {
        throw new Error('Usuario no encontrado');
    }
    return {
        id,
        nombre,
        apellido,
        rol_id
    };
}

const deleteUser = async (id) => {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
        throw new Error('Usuario no encontrado');
    }
    return { id };
}


module.exports = {
    getAllUsers,
    getUsersById,
    createUser,
    editUser,
    deleteUser
};
