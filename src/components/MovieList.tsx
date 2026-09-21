import type { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}
function MovieList({ movies, onMovieClick }: MovieListProps) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎬</div>
        <p className="empty-title">No movies found</p>
        <p className="empty-text">Try adjusting your search or filters.</p>
      </div>
    );
  }
  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  );
}
export default MovieList;