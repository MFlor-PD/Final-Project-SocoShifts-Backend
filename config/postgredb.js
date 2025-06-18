const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.PG_DB_HOST,
  user: process.env.PG_DB_USER,
  password: process.env.PG_DB_PASSWORD,
  database: process.env.PG_DB_NAME,
  port: process.env.PG_DB_PORT,
});

module.exports = pool;