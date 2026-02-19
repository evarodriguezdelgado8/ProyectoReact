import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; // Añadimos useNavigate
import { FaFilm } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate(); // Inicializamos el navegador

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    // Después de que el context haga su magia, saltamos al home
    navigate('/'); 
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <FaFilm style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1rem' }} />
        <h2>Bienvenido</h2>
        <p className="auth-subtitle">Entra para gestionar tu diario de cine</p>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>EMAIL</label>
            <input 
              type="email" 
              placeholder="tu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>CONTRASEÑA</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-auth">INICIAR SESIÓN</button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta? <Link to="/register">Regístrate gratis</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;