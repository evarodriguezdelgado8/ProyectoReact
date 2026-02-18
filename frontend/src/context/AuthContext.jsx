import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Intentamos recuperar el usuario del localStorage al cargar por primera vez
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    // Si existe, lo convertimos de texto a objeto. Si no, devolvemos null.
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    // Guardamos los datos en el navegador para que no se borren al refrescar
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    // Limpiamos el almacenamiento al cerrar sesión
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);