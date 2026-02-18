// backend/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importamos la conexión a la DB para asegurarnos de que conecta al arrancar
require('./config/db'); 

const app = express();

// --- MIDDLEWARES ---
// Esto permite que tu React (puerto 3000) hable con este Node (puerto 5000)
app.use(cors()); 
// Esto permite que tu servidor entienda los datos JSON que le envíe el formulario de React
app.use(express.json()); 


// --- RUTAS ---
// Ruta de prueba para ver si el servidor responde
app.get('/', (req, res) => {
    res.send('API de MyFlix funcionando correctamente 🎬🍿');
});

// Rutas de la API
app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes')); // Para el corazón
app.use('/api/reviews', require('./routes/reviewRoutes'));     // Para la opinión

// --- ARRANCAR SERVIDOR ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});