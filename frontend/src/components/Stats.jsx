import { FaChartBar, FaHeart, FaStar } from 'react-icons/fa';

function Stats({ totalMovies, totalFavs, avgRating, onOpenFavs }) {
  return (
    <section className="stats-container">
      <div className="stat-box">
        <FaChartBar className="stat-icon" />
        <div className="stat-info"><h3>{totalMovies}</h3><p>Películas</p></div>
      </div>
      <div className="stat-box" onClick={onOpenFavs} style={{cursor: 'pointer', border: '1px solid var(--danger)'}}>
        <FaHeart className="stat-icon" style={{color: 'var(--danger)'}} />
        <div className="stat-info"><h3>{totalFavs}</h3><p>Ver Favoritas</p></div>
      </div>
      <div className="stat-box">
        <FaStar className="stat-icon" style={{color: '#fbbf24'}} />
        <div className="stat-info"><h3>{avgRating}</h3><p>Media</p></div>
      </div>
    </section>
  );
}

export default Stats;