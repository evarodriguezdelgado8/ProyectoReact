// backend/models/userModel.js
const db = require('../config/db');

const User = {
    // Función para crear un nuevo usuario
    create: async (user) => {
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const [result] = await db.execute(query, [user.name, user.email, user.password]);
        return result;
    },
    
    // Función para buscar un usuario por su email (para el login)
    findByEmail: async (email) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(query, [email]);
        return rows[0]; // Devuelve el primer usuario encontrado (o undefined)
    },

    // Función para buscar por ID (útil para el perfil)
    findById: async (id) => {
        const query = 'SELECT id, name, email FROM users WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0];
    }
};

module.exports = User;