import { FaStar, FaHeart, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

function MovieCard({ movie, isFav, onToggleFav, onEdit, onDelete, isEditing, editData, setEditData, onSaveEdit, onCancelEdit }) {
  
  const handleImgError = (e) => {
    e.target.onerror = null; 
    e.target.src = 'https://via.placeholder.com/300x450?text=Sin+Poster';
  };

  return (
    <div className={`diary-card ${isEditing ? 'editing-active' : ''}`}>
      {/* Mantenemos la estructura para que la foto y el contenido no se solapen */}
      <div className="card-img-container">
        <img 
          src={isEditing ? (editData.img || 'https://via.placeholder.com/300x450?text=Sin+Poster') : (movie.img || 'https://via.placeholder.com/300x450?text=Sin+Poster')} 
          alt={movie.title} 
          className="card-img" 
          onError={handleImgError}
        />
      </div>

      <div className="card-content">
        {isEditing ? (
          /* MODO EDICIÓN */
          <div className="edit-mode-container" style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <input type="text" value={editData.title} onChange={(e) => setEditData({...editData, title: e.target.value})} />
            <input type="text" value={editData.img} onChange={(e) => setEditData({...editData, img: e.target.value})} />
            <textarea value={editData.comment} onChange={(e) => setEditData({...editData, comment: e.target.value})} />
            <select value={editData.rating} onChange={(e) => setEditData({...editData, rating: parseInt(e.target.value)})}>
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Estrellas</option>)}
            </select>
            <div className="edit-actions">
              <button className="btn-save-edit" onClick={() => onSaveEdit(movie.id)}>
                <FaSave /> Guardar
              </button>
              <button className="btn-cancel-edit" onClick={onCancelEdit}>
                <FaTimes /> Cancelar
              </button>
            </div>
          </div>
        ) : (
          /* MODO VISTA */
          <>
            <div className="card-header">
              <h4>{movie.title}</h4>
              <div className="stars">
                {[...Array(Number(movie.rating))].map((_, i) => <FaStar key={i} />)}
              </div>
            </div>
            <p className="comment">"{movie.comment}"</p>
            <div className="card-actions">
              <button onClick={() => onToggleFav(movie)}>
                <FaHeart style={{color: isFav ? 'red' : 'white'}} />
              </button>
              <button onClick={() => onEdit(movie)}><FaEdit /></button>
              <button className="btn-delete" onClick={() => onDelete(movie.id)}><FaTrash /></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieCard;