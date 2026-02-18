// backend/controllers/reviewController.js
const Review = require('../models/reviewModel');

exports.getUserReviews = async (req, res) => {
    try {
        const [rows] = await Review.getByUser(req.params.userId);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addReview = async (req, res) => {
    const { userId, movie, comment, rating } = req.body;
    try {
        await Review.create(userId, movie, comment, rating);
        res.json({ message: 'Reseña añadida' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateReview = async (req, res) => {
    const { id } = req.params;
    const { comment, rating } = req.body;
    try {
        await Review.update(id, comment, rating);
        res.json({ message: 'Reseña actualizada' });
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