import { FaSignOutAlt } from 'react-icons/fa';

function Navbar({ userName, onLogout }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
      <h1 style={{ color: '#e50914', fontSize: '2.5rem', margin: 0 }}>MyFlix</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span>Bienvenido, <strong>{userName}</strong></span>
        <button onClick={onLogout} style={{ background: '#e50914', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>
          <FaSignOutAlt /> Salir
        </button>
      </div>
    </header>
  );
}

export default Navbar;