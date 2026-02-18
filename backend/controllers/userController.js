// backend/controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// LOGICA DE REGISTRO
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1. Comprobar si el usuario ya existe
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // 2. Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Guardar en la base de datos
        await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: 'Usuario registrado con éxito 🚀' });
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
};

// LOGICA DE LOGIN (Con Modo Detective 🕵️‍♂️)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    console.log("------------------------------------------------");
    console.log("🔍 INTENTO DE LOGIN:");
    console.log("📧 Email recibido:", email);
    console.log("🔑 Contraseña escrita:", password);

    try {
        // 1. Buscar usuario por email
        const user = await User.findByEmail(email);
        
        if (!user) {
            console.log("❌ ERROR: Usuario no encontrado en la Base de Datos.");
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        console.log("✅ Usuario encontrado:", user.name);
        console.log("🔒 Hash guardado en DB:", user.password);

        // 2. Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        
        console.log("❓ ¿Coinciden?:", isMatch);

        if (!isMatch) {
            console.log("❌ ERROR: La contraseña no coincide con el hash.");
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // 3. Generar Token JWT
        // Usamos la variable de entorno, y si no existe, usamos 'secreto_super_seguro'
        const secret = process.env.JWT_SECRET || 'secreto_super_seguro';
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });

        console.log("🎉 ÉXITO: Login correcto. Enviando token...");

        res.json({ 
            message: 'Login correcto', 
            token, 
            user: { id: user.id, name: user.name, email: user.email } 
        });

    } catch (error) {
        console.error("💥 ERROR CRÍTICO:", error);
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
};