const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'user_ministock',
    password: process.env.DB_PASSWORD || 'password_ministock',
    database: process.env.DB_NAME || 'ministock_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Prueba rápida de conexión
pool.getConnection()
    .then(() => console.log('✅ Pool de MySQL conectado'))
    .catch(err => console.error('❌ Error en pool:', err));

module.exports = pool;