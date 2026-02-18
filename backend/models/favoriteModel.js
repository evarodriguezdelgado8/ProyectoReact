const db = require('../config/db');

const Favorite = {
    add: (userId, movie) => {
        return db.query('INSERT INTO favorites (user_id, movie_id, title, img) VALUES (?, ?, ?, ?)', 
        [userId, movie.id, movie.title, movie.img]);
    },
    getByUser: (userId) => {
        return db.query('SELECT * FROM favorites WHERE user_id = ?', [userId]);
    },
    delete: (userId, movieId) => {
        return db.query('DELETE FROM favorites WHERE user_id = ? AND movie_id = ?', [userId, movieId]);
    }
};

module.exports = Favorite;