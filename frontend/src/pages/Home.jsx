import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaPlus, FaTimes } from 'react-icons/fa';

// Importamos los componentes que creamos antes
import Navbar from '../components/Navbar';
import Stats from '../components/Stats';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const { user, logout } = useAuth();
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', img: '', comment: '', rating: 5 });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', img: '', comment: '', rating: 5, movie_id: '' });
  const [searchTerm, setSearchTerm] = useState("");
  const [showFavsModal, setShowFavsModal] = useState(false);

  const fetchData = async () => {
    try {
      const resMovies = await axios.get(`/api/reviews/${user.id}`);
      const resFavs = await axios.get(`/api/favorites/${user.id}`);
      setMovies(resMovies.data);
      setFavorites(resFavs.data);
    } catch (error) { console.error("Error cargando datos", error); }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalMovies = movies.length;
  const totalFavs = favorites.length;
  const avgRating = movies.length > 0 
    ? (movies.reduce((acc, m) => acc + m.rating, 0) / movies.length).toFixed(1) 
    : 0;

  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!newMovie.title) return toast.error("El título es obligatorio");
    const movieData = { 
      userId: user.id,
      movie_id: Math.floor(Math.random() * 1000000),
      title: newMovie.title,
      img: newMovie.img || 'https://via.placeholder.com/300x450?text=Sin+Portada',
      comment: newMovie.comment,
      rating: newMovie.rating
    };
    try {
      await axios.post('/api/reviews/add', movieData);
      toast.success("¡Película añadida!");
      setNewMovie({ title: '', img: '', comment: '', rating: 5 });
      fetchData();
    } catch (err) { toast.error("Error al guardar"); }
  };

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`/api/reviews/${id}`);
      toast.success("Reseña eliminada");
      fetchData();
    } catch (err) { toast.error("Error al eliminar"); }
  };

  const toggleFavorite = async (movie) => {
    try {
      const isFav = favorites.find(f => f.movie_id === movie.movie_id);
      if (isFav) {
        await axios.delete(`/api/favorites/${user.id}/${movie.movie_id}`);
        toast.success("Quitada de favoritas");
      } else {
        await axios.post('/api/favorites/add', {
          user_id: user.id,
          movie_id: movie.movie_id,
          title: movie.title,
          img: movie.img || 'https://via.placeholder.com/300x450?text=Sin+Portada'
        });
        toast.success("¡Añadida a favoritas!");
      }
      fetchData();
    } catch (err) { toast.error("Error en favoritos"); }
  };

const startEditing = (movie) => {
  setEditingId(movie.id); // Esto activa el modo edición en el componente
  setEditData({ 
    title: movie.title, 
    img: movie.img, 
    comment: movie.comment, 
    rating: movie.rating,
    movie_id: movie.movie_id 
  });
};

  const saveEdit = async (id) => {
    try {
      await axios.put(`/api/reviews/${id}`, editData);
      setEditingId(null);
      toast.success("¡Cine actualizado!");
      fetchData();
    } catch (err) { toast.error("Error al actualizar"); }
  };

  return (
    <div className="home-container">
      {/* Componente Desacoplado */}
      <Navbar userName={user.name} onLogout={logout} />

      {/* Componente Desacoplado */}
      <Stats 
        totalMovies={totalMovies} 
        totalFavs={totalFavs} 
        avgRating={avgRating} 
        onOpenFavs={() => setShowFavsModal(true)} 
      />

      <section className="add-movie-section">
        <h2><FaPlus /> Añadir nueva película</h2>
        <form onSubmit={handleAddMovie} className="add-movie-form">
          <input type="text" placeholder="Título" value={newMovie.title} onChange={(e) => setNewMovie({...newMovie, title: e.target.value})} />
          <input type="text" placeholder="URL póster" value={newMovie.img} onChange={(e) => setNewMovie({...newMovie, img: e.target.value})} />
          <textarea placeholder="Reseña" value={newMovie.comment} onChange={(e) => setNewMovie({...newMovie, comment: e.target.value})} />
          <div className="form-footer">
            <select value={newMovie.rating} onChange={(e) => setNewMovie({...newMovie, rating: parseInt(e.target.value)})}>
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Estrellas</option>)}
            </select>
            <button type="submit" className="btn-save">GUARDAR</button>
          </div>
        </form>
      </section>

      <div style={{padding: '0 20px', margin: '20px 0'}}>
         <input type="text" placeholder="🔍 Buscar en mi diario..." style={{width: '100%', padding: '10px', borderRadius: '8px', background: '#111', border: '1px solid #333', color: 'white'}} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <section className="diary-section">
        <h3>DIARIO DE {user.name.toUpperCase()}</h3>
        <div className="diary-grid">
          {filteredMovies.map(movie => (
            /* Componente Desacoplado */
            <MovieCard 
              key={movie.id}
              movie={movie}
              isFav={favorites.some(f => f.movie_id === movie.movie_id)}
              onToggleFav={toggleFavorite}
              onEdit={startEditing}
              onDelete={deleteMovie}
              isEditing={editingId === movie.id}
              editData={editData}
              setEditData={setEditData}
              onSaveEdit={saveEdit}
              onCancelEdit={() => setEditingId(null)}
            />
          ))}
        </div>
      </section>

      {/* --- SECCIÓN MIS FAVORITAS (SIN TOCAR UNA SOLA LÍNEA DE CÓDIGO) --- */}
      {favorites.length > 0 && (
        <section className="favorites-section">
            <h3>MIS FAVORITAS</h3>
            <div className="favorites-grid">
                {favorites.map(fav => (
                    <div key={fav.id} className="fav-item">
                        <img src={fav.img || 'https://via.placeholder.com/300x450?text=Sin+Poster'} alt={fav.title} className="fav-poster" onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=Sin+Poster'; }} />
                        <div className="fav-overlay"><span>{fav.title}</span></div>
                    </div>
                ))}
            </div>
        </section>
      )}
      {/* ---------------------------------------------------------------- */}

      {showFavsModal && (
        <div className="modal-overlay" onClick={() => setShowFavsModal(false)} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000}}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{background: '#111', padding: '30px', borderRadius: '15px', maxWidth: '800px', width: '90%', maxHeight: '80vh', overflowY: 'auto', border: '2px solid var(--danger)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
              <h2 style={{color: 'white'}}>MIS FAVORITAS</h2>
              <button onClick={() => setShowFavsModal(false)} style={{background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer'}}><FaTimes /></button>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '15px'}}>
              {favorites.map(fav => (
                <div key={fav.id} style={{textAlign: 'center', color: 'white'}}>
                  <img src={fav.img || 'https://via.placeholder.com/300x450?text=Sin+Poster'} alt={fav.title} style={{width: '100%', borderRadius: '8px', height: '180px', objectFit: 'cover'}} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450?text=Sin+Poster'; }} />
                  <p style={{fontSize: '0.8rem', marginTop: '5px'}}>{fav.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;