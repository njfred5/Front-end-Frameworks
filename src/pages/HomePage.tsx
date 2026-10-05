import { useEffect, useState } from 'react';
import { movieService } from '../services/movieService';
import type { Movie } from '../types';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';

function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await movieService.fetchMovies({ page: 1, signal: controller.signal });
        setMovies(data.results);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Failed to load movies');
      } finally {
        setIsLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <main className="main-container">
      <h1>Popular Movies</h1>
      <SearchBar query={query} onChange={setQuery} />

      {isLoading && <p className="stat-label">Loading movies...</p>}
      {error && <p className="stat-label">Something went wrong: {error}</p>}

      {!isLoading && !error && <MovieList movies={filteredMovies} />}
    </main>
  );
}

export default HomePage;