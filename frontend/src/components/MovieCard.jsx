// frontend/src/components/MovieCard.jsx
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaCommentDots } from 'react-icons/fa';

function MovieCard({ movie, isFav, onToggleFav, onAddReview }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  return (
    <div style={{ background: '#1f1f1f', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
      <img src={movie.img} alt={movie.title} style={{ width: '100%', borderRadius: '8px' }} />
      <h4 style={{ margin: '10px 0' }}>{movie.title}</h4>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
        {/* BOTÓN FAVORITO */}
        <button 
          onClick={() => onToggleFav(movie)}
          style={{ background: 'none', border: 'none', color: isFav ? '#e50914' : 'white', cursor: 'pointer', fontSize: '1.4rem' }}
        >
          {isFav ? <FaHeart /> : <FaRegHeart />}
        </button>

        {/* BOTÓN ABRIR REVIEW */}
        <button 
          onClick={() => setShowReviewForm(!showReviewForm)}
          style={{ background: 'none', border: 'none', color: '#00c030', cursor: 'pointer', fontSize: '1.4rem' }}
        >
          <FaCommentDots />
        </button>
      </div>

      {showReviewForm && (
        <div style={{ background: '#333', padding: '10px', borderRadius: '5px' }}>
          <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ width: '100%', marginBottom: '5px' }}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Estrellas</option>)}
          </select>
          <textarea 
            placeholder="Tu opinión..." 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ width: '100%', borderRadius: '4px', border: 'none', padding: '5px' }}
          />
          <button 
            onClick={() => {
              onAddReview(movie, comment, rating);
              setShowReviewForm(false);
              setComment('');
            }}
            style={{ background: '#00c030', color: 'white', border: 'none', width: '100%', marginTop: '5px', padding: '5px', cursor: 'pointer' }}
          >
            Publicar Review
          </button>
        </div>
      )}
    </div>
  );
}

export default MovieCard;