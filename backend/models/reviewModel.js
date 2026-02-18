// backend/models/reviewModel.js
const db = require('../config/db');

const Review = {
    getByUser: (userId) => {
        return db.query('SELECT * FROM reviews WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    },
    create: (userId, movie, comment, rating) => {
        return db.query(
            'INSERT INTO reviews (user_id, movie_id, title, img, comment, rating) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, movie.id, movie.title, movie.img, comment, rating]
        );
    },
    update: (id, comment, rating) => {
        return db.query('UPDATE reviews SET comment = ?, rating = ? WHERE id = ?', [comment, rating, id]);
    },
    delete: (id) => {
        return db.query('DELETE FROM reviews WHERE id = ?', [id]);
    }
};

module.exports = Review;