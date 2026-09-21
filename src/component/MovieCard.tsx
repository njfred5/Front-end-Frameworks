import { useState } from 'react';
import { Star, Heart } from 'lucide-react';
import type { Movie } from '../types';
import { getPosterUrl } from '../data/sampleMovies';
interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
}
function MovieCard({ movie, onClick }: MovieCardProps) {
  const [isFavourite, setIsFavourite] = useState(false);
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : '—';
  const handleToggleFavourite = (event: React.MouseEvent) => {
    // Stop the click from also triggering the card's onClick (opening the modal)
    event.stopPropagation();
    setIsFavourite((prev) => !prev);
  };
  return (
    <div className="movie-card" onClick={() => onClick?.(movie)}>
      <div className="poster-wrapper">
        <img
          className="poster-img"
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
        />
        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge">
              <Star />
              {movie.vote_average.toFixed(1)}
            </span>
            <button
              type="button"
              className={`favorite-btn${isFavourite ? ' is-favorite' : ''}`}
              onClick={handleToggleFavourite}
              aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
            >
              <Heart fill={isFavourite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div className="movie-card-meta">
          <span>{releaseYear}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;