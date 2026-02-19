import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // FUNCIÓN DE LOGIN REAL
  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      toast.success(`¡Bienvenido de nuevo, ${res.data.user.name}!`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  // FUNCIÓN DE REGISTRO REAL
  const register = async (name, email, password) => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      toast.success("Cuenta creada. ¡Ya puedes iniciar sesión!");
      // Opcional: podrías loguearlo automáticamente aquí
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al registrarse");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("Sesión cerrada");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);