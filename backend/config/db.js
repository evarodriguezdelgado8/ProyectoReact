const mysql = require('mysql2/promise');
require('dotenv').config();

// Crear el pool de conexiones (es más eficiente que una conexión simple)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Probar la conexión al arrancar
pool.getConnection()
    .then(connection => {
        console.log('✅ Base de datos conectada: ' + process.env.DB_NAME);
        connection.release();
    })
    .catch(error => {
        console.error('❌ Error conectando a la BD:', error.message);
    });

module.exports = pool;