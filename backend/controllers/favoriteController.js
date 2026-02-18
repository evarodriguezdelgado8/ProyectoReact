// backend/controllers/favoriteController.js
const Favorite = require('../models/favoriteModel');

exports.getUserFavorites = async (req, res) => {
    try {
        const [rows] = await Favorite.getByUser(req.params.userId);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener favoritos", error: err });
    }
};

exports.addFavorite = async (req, res) => {
    const { userId, movie } = req.body;
    try {
        await Favorite.add(userId, movie);
        res.json({ message: 'Añadido a favoritos ❤️' });
    } catch (err) {
        res.status(500).json({ message: "Error al añadir", error: err });
    }
};

exports.removeFavorite = async (req, res) => {
    const { userId, movieId } = req.body;
    try {
        await Favorite.delete(userId, movieId);
        res.json({ message: 'Eliminado de favoritos 💔' });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar", error: err });
    }
};