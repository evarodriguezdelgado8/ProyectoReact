const db = require('../config/db');

const Favorite = {
    add: (user_id, movie_id, title, img) => {
        return db.query('INSERT INTO favorites (user_id, movie_id, title, img) VALUES (?, ?, ?, ?)', 
        [user_id, movie_id, title, img]);
    },
    getByUser: (user_id) => {
        return db.query('SELECT * FROM favorites WHERE user_id = ?', [user_id]);
    },
    updateDetails: (movie_id, title, img) => {
        return db.execute(
            'UPDATE favorites SET title = ?, img = ? WHERE movie_id = ?',
            [title, img, movie_id]
        );
    },
    delete: (user_id, movie_id) => {
        return db.query('DELETE FROM favorites WHERE user_id = ? AND movie_id = ?', [user_id, movie_id]);
    }
};

module.exports = Favorite;