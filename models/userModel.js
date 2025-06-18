const pool = require('../config/db');

const getAllUsers = async () => {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    return rows;
}

module.exports ={
    getAllUsers 
}