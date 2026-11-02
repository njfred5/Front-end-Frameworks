const FAVORITES_KEY = 'cinegrid_favorites';
const THEME_KEY = 'cinegrid_theme';
const API_KEY_KEY = 'movieapp_api_key';

export function getFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(movie) {
  const current = getFavorites();
  const alreadyFavorite = current.some((m) => m.id === movie.id);

  const updated = alreadyFavorite
    ? current.filter((m) => m.id !== movie.id)
    : [...current, movie];

  saveFavorites(updated);
  return updated;
}

export function getTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === 'light' ? 'light' : 'dark';
}

export function setTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.setAttribute('data-theme', theme);
}

export function getApiKey() {
  return localStorage.getItem(API_KEY_KEY) || '';
}

export function setApiKey(key) {
  localStorage.setItem(API_KEY_KEY, (key || '').trim());
}