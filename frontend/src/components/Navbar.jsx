import { FaSignOutAlt, FaFilm } from 'react-icons/fa';

function Navbar({ userName, onLogout }) {
  return (
    <header className="nav-header">
      <h1><FaFilm style={{color: 'var(--accent)'}} /> LetterMyBox</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span style={{color: 'white'}}>Hola, <strong>{userName?.toUpperCase()}</strong></span>
        <button onClick={onLogout} className="btn-logout-top">
          <FaSignOutAlt /> Salir
        </button>
      </div>
    </header>
  );
}

export default Navbar;