import { getApiKey } from '../utils/storage';

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

/**
 * @param {Object} [params]
 * @param {string} [params.search]
 * @param {number} [params.page]
 * @param {AbortSignal} [params.signal]
 */
async function fetchMovies({ search = '', page = 1, signal } = {}) {
  const apiKey = getApiKey() || import.meta.env.VITE_TMDB_API_KEY || '';
  const endpoint = search ? '/search/movie' : '/movie/popular';
  const url = new URL(BASE_URL + endpoint);
  if (search) url.searchParams.set('query', search);
  url.searchParams.set('page', String(page));
  if (apiKey) url.searchParams.set('api_key', apiKey);

  const response = await fetch(url.toString(), { signal });

  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }

  const data = await response.json();

  return {
    results: data.results ?? [],
    total_pages: data.total_pages ?? 1,
    total_results: data.total_results ?? 0,
  };
}

export const movieService = {
  fetchMovies,
};