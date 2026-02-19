// backend/routes/favoriteRoutes.js
const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController'); // Importamos el cocinero

// El camarero solo recibe el pedido y se lo pasa al cocinero
router.get('/:userId', favoriteController.getUserFavorites);
router.post('/add', favoriteController.addFavorite);
router.delete('/:userId/:movieId', favoriteController.removeFavorite);

module.exports = router;