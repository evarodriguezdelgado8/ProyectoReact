import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
    // Tras registrarse, los mandamos al login
    navigate('/login');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <FaUserPlus style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1rem' }} />
        <h2>Crea tu cuenta</h2>
        <p className="auth-subtitle">Únete a la comunidad de LetterMyBox</p>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>NOMBRE COMPLETO</label>
            <input 
              type="text" 
              placeholder="Tu nombre" 
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
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
              placeholder="Crea una contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn-auth">CREAR CUENTA</button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;