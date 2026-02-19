// backend/models/reviewModel.js
const db = require('../config/db');

const Review = {
    // Obtener reseñas de un usuario específico
    getByUser: (userId) => {
        return db.execute(
            'SELECT * FROM reviews WHERE user_id = ? ORDER BY created_at DESC', 
            [userId]
        );
    },

    // CREAR: Aquí estaba el error. Ahora incluimos movie_id, title e img
    create: (userId, movie_id, title, img, comment, rating) => {
        return db.execute(
            'INSERT INTO reviews (user_id, movie_id, title, img, comment, rating) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, movie_id, title, img, comment, rating]
        );
    },

    // Actualizar reseña (opcional)
    update: (id, title, img, comment, rating) => {
        return db.execute(
            'UPDATE reviews SET title = ?, img = ?, comment = ?, rating = ? WHERE id = ?',
            [title, img, comment, rating, id]
        );
    },

    // Borrar reseña
    delete: (id) => {
        return db.execute('DELETE FROM reviews WHERE id = ?', [id]);
    }
};

module.exports = Review;