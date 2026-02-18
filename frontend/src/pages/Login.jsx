import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Asegúrate de que la URL coincide con tu puerto de Backend
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      login(res.data.user); 
      toast.success('¡Bienvenido!');
      navigate('/');
    } catch (error) {
      console.error("Error detallado:", error.response?.data);
      toast.error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>LetterMyBox</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <button type="submit" className="btn-auth">ENTRAR</button>
        </form>
        <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
      </div>
    </div>
  );
}

export default Login;