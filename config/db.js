const dbType = process.env.DB_TYPE;

let pool;
if (dbType === 'mysql') {
  pool = require('./db.mysql');
} else if (dbType === 'postgres') {
  pool = require('./db.postgres');
} else {
  throw new Error('Tipo de base de datos no soportado');
}

module.exports = pool;