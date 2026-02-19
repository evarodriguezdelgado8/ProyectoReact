// backend/controllers/favoriteController.js
const Favorite = require('../models/favoriteModel');

// 1. Obtener todos los favoritos de un usuario
exports.getUserFavorites = async (req, res) => {
    const { userId } = req.params;
    try {
        const [rows] = await Favorite.getByUser(userId);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ 
            message: "Error al obtener favoritos", 
            error: err.message 
        });
    }
};

// 2. Añadir un favorito (Usa req.body porque recibe mucha información)
exports.addFavorite = async (req, res) => {
    const { user_id, movie_id, title, img } = req.body;
    try {
        await Favorite.add(user_id, movie_id, title, img);
        res.json({ message: 'Añadido a favoritos ❤️' });
    } catch (err) {
        res.status(500).json({ 
            message: "Error al añadir a favoritos", 
            error: err.message 
        });
    }
};

// 3. Eliminar un favorito (Usa req.params por seguridad y estándar REST)
exports.removeFavorite = async (req, res) => {
    // Estos nombres deben coincidir con tu archivo de rutas: /:userId/:movieId
    const { userId, movieId } = req.params; 
    try {
        await Favorite.delete(userId, movieId);
        res.json({ message: 'Eliminado de favoritos 💔' });
    } catch (err) {
        res.status(500).json({ 
            message: "Error al eliminar de favoritos", 
            error: err.message 
        });
    }
};