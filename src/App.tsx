import { useState } from 'react';
import { SAMPLE_MOVIES } from './data/sampleMovies';
import type { Movie } from './types';
import MovieList from './component/MovieList';
import SearchBar from './component/SearchBar';

function App() {
  const [movies] = useState<Movie[]>(SAMPLE_MOVIES);
  const [query, setQuery] = useState('');
  const [minRating, setMinRating] = useState(0);

  // Derived state: recomputed on every render from movies + query + minRating.
  // Not stored in its own useState — that would need to be kept in sync manually.
  const filteredMovies = movies.filter((movie) => {
    const matchesQuery = movie.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    const matchesRating = movie.vote_average >= minRating;
    return matchesQuery && matchesRating;
  });

  return (
    <div className="app-layout">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand-logo">
            <span className="logo-dot" />
            <span className="logo-text">Movie App</span>
          </div>
          <SearchBar query={query} onChange={setQuery} />
        </div>
      </header>

      <main className="main-container">
        <div className="filter-bar">
          <label htmlFor="minRating" className="stat-label">
            Min rating: {minRating.toFixed(1)}
          </label>
          <input
            id="minRating"
            type="range"
            min={0}
            max={10}
            step={0.5}
            value={minRating}
            onChange={(event) => setMinRating(Number(event.target.value))}
          />
        </div>

        <MovieList movies={filteredMovies} />
      </main>
    </div>
  );
}

export default App;