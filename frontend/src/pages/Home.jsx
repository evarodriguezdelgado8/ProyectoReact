// frontend/src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Home() {
    const { user, logout } = useAuth();
    
    // Estados principales
    const [reviews, setReviews] = useState([]);
    const [favorites, setFavorites] = useState([]);
    
    // Estado para el formulario de nueva película
    const [newMovie, setNewMovie] = useState({ title: '', img: '', comment: '', rating: 5 });

    // Estados para la edición de reviews
    const [editingId, setEditingId] = useState(null);
    const [editComment, setEditComment] = useState('');
    const [editRating, setEditRating] = useState(5);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const resRevs = await axios.get(`http://localhost:5000/api/reviews/${user.id}`);
            const resFavs = await axios.get(`http://localhost:5000/api/favorites/${user.id}`);
            setReviews(resRevs.data);
            setFavorites(resFavs.data);
        } catch (error) {
            console.error("Error cargando datos:", error);
        }
    };

    // --- LÓGICA DE AÑADIR PELÍCULA AL DIARIO ---
    const handleAddMovie = async (e) => {
        e.preventDefault();
        if (!newMovie.title || !newMovie.comment) {
            return toast.error("Pon al menos el título y tu opinión");
        }

        const movieData = {
            ...newMovie,
            id: Date.now(), // ID temporal para manejar favoritos
            img: newMovie.img || 'https://via.placeholder.com/150x225?text=No+Poster'
        };

        try {
            await axios.post('http://localhost:5000/api/reviews/add', { 
                userId: user.id, 
                movie: movieData, 
                comment: movieData.comment, 
                rating: movieData.rating 
            });
            toast.success("¡Pelicula añadida a tu diario!");
            setNewMovie({ title: '', img: '', comment: '', rating: 5 });
            fetchData();
        } catch (error) { toast.error("Error al guardar la película"); }
    };

    // --- LÓGICA DE FAVORITOS ---
    const isFavorite = (movieId) => favorites.some(f => f.movie_id === movieId);

    const toggleFavorite = async (rev) => {
        const movieForFav = { id: rev.movie_id, title: rev.title, img: rev.img };
        try {
            if (isFavorite(rev.movie_id)) {
                await axios.post('http://localhost:5000/api/favorites/remove', { userId: user.id, movieId: rev.movie_id });
                toast.success("Eliminada de favoritos");
            } else {
                await axios.post('http://localhost:5000/api/favorites/add', { userId: user.id, movie: movieForFav });
                toast.success("¡Añadida a favoritos!");
            }
            fetchData();
        } catch (error) { toast.error("Error en favoritos"); }
    };

    // --- LÓGICA DE REVIEWS (Borrar y Editar) ---
    const deleteReview = async (id) => {
        // 1. Buscamos la review en nuestro estado local antes de borrarla
        const reviewToDelete = reviews.find(r => r.id === id);
        
        try {
            // 2. Si la película estaba en favoritos, la borramos también de la tabla de favoritos
            if (reviewToDelete && isFavorite(reviewToDelete.movie_id)) {
                await axios.post('http://localhost:5000/api/favorites/remove', { 
                    userId: user.id, 
                    movieId: reviewToDelete.movie_id 
                });
            }

            // 3. Borramos la review del historial
            await axios.delete(`http://localhost:5000/api/reviews/${id}`);
            
            toast.success("Eliminada del historial y favoritos");
            
            // 4. Refrescamos ambos datos para que desaparezca de las dos listas
            fetchData();
        } catch (error) {
            console.error("Error al eliminar:", error);
            toast.error("Error al eliminar la película");
        }
    };

    const saveEdit = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/reviews/${id}`, { 
                comment: editComment, 
                rating: editRating 
            });
            toast.success("Reseña actualizada");
            setEditingId(null);
            fetchData();
        } catch (error) { toast.error("Error al editar"); }
    };

    return (
        <div className="home-container">
            <Navbar userName={user?.name} onLogout={logout} />

            {/* FORMULARIO DE ENTRADA */}
            <section className="add-movie-section">
                <h2>¿Qué has visto hoy?</h2>
                <form onSubmit={handleAddMovie} className="add-movie-form">
                    <input 
                        type="text" placeholder="Título de la película" 
                        value={newMovie.title} onChange={e => setNewMovie({...newMovie, title: e.target.value})}
                    />
                    <input 
                        type="text" placeholder="URL de la carátula (ej: de Google Imágenes)" 
                        value={newMovie.img} onChange={e => setNewMovie({...newMovie, img: e.target.value})}
                    />
                    <textarea 
                        placeholder="Escribe tu crítica aquí..." 
                        value={newMovie.comment} onChange={e => setNewMovie({...newMovie, comment: e.target.value})}
                    />
                    <div className="form-footer">
                        <select value={newMovie.rating} onChange={e => setNewMovie({...newMovie, rating: e.target.value})}>
                            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Estrellas</option>)}
                        </select>
                        <button type="submit" className="btn-save">LOGUEAR PELÍCULA</button>
                    </div>
                </form>
            </section>

            {/* SECCIÓN DE FAVORITOS (VITRINA) */}
            {favorites.length > 0 && (
                <section className="favorites-section" style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#9ab' }}>MIS FAVORITAS</h3>
                    <div className="favorites-grid">
                        {favorites.map(fav => (
                            <img key={fav.id} src={fav.img} alt={fav.title} className="fav-poster" title={fav.title} />
                        ))}
                    </div>
                </section>
            )}

            {/* LISTADO DEL DIARIO */}
            <section className="diary-section">
                <h3>TU HISTORIAL</h3>
                <div className="diary-list">
                    {reviews.length === 0 && <p style={{ textAlign: 'center', marginTop: '20px' }}>Tu diario está vacío. ¡Añade tu primera película arriba!</p>}
                    
                    {reviews.map(rev => (
                        <div key={rev.id} className="diary-card">
                            <img src={rev.img} alt="poster" className="card-img" />
                            <div className="card-content">
                                <div className="card-header">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <h4>{rev.title}</h4>
                                        <button 
                                            onClick={() => toggleFavorite(rev)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: 0 }}
                                        >
                                            {isFavorite(rev.movie_id) ? '❤️' : '🤍'}
                                        </button>
                                    </div>
                                    <span className="stars">{"★".repeat(rev.rating)}</span>
                                </div>

                                {editingId === rev.id ? (
                                    <div className="edit-box" style={{ marginTop: '10px' }}>
                                        <textarea value={editComment} onChange={e => setEditComment(e.target.value)} />
                                        <select value={editRating} onChange={e => setEditRating(e.target.value)} style={{ margin: '10px 0', display: 'block' }}>
                                            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Estrellas</option>)}
                                        </select>
                                        <button onClick={() => saveEdit(rev.id)} className="btn-save" style={{ padding: '5px 15px' }}>Guardar</button>
                                        <button onClick={() => setEditingId(null)} style={{ background: 'none', border: 'none', color: '#9ab', marginLeft: '10px', cursor: 'pointer' }}>Cancelar</button>
                                    </div>
                                ) : (
                                    <p className="comment">"{rev.comment}"</p>
                                )}

                                <div className="card-actions">
                                    <button onClick={() => { setEditingId(rev.id); setEditComment(rev.comment); setEditRating(rev.rating); }}>Editar</button>
                                    <button onClick={() => deleteReview(rev.id)} className="btn-delete">Borrar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;