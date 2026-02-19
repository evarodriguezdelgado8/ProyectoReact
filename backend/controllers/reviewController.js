// backend/controllers/reviewController.js
const Review = require('../models/reviewModel');
const Favorite = require('../models/favoriteModel');

exports.getUserReviews = async (req, res) => {
    try {
        const [rows] = await Review.getByUser(req.params.userId);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addReview = async (req, res) => {
    // Recibimos TODO lo que envía el frontend
    const { userId, movie_id, title, img, comment, rating } = req.body;
    try {
        // Se lo pasamos al modelo en el orden correcto
        await Review.create(userId, movie_id, title, img, comment, rating);
        res.json({ message: 'Reseña añadida' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { title, img, comment, rating, movie_id } = req.body; // Asegúrate de recibir movie_id

    try {
        // 1. Actualizar la tabla de reviews
        await Review.update(id, title, img, comment, rating);

        // 2. Si la película está en favoritos, actualizar su título e imagen allí también
        // Usamos el movie_id para identificarla en la tabla de favoritos
        if (movie_id) {
            await Favorite.updateDetails(movie_id, title, img);
        }

        res.json({ message: '¡Todo actualizado correctamente! ✨' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        await Review.delete(req.params.id);
        res.json({ message: 'Reseña eliminada' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};