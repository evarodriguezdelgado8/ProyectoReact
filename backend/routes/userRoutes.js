// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Definimos las rutas:
// POST http://localhost:5000/api/auth/register
router.post('/register', userController.register);

// POST http://localhost:5000/api/auth/login
router.post('/login', userController.login);

module.exports = router;