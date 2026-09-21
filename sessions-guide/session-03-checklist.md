# Session 03 — Checklist (Side Effects, Data Fetching & Service Layer)

## Purpose

- Replace hardcoded sample data with live API data fetched via `useEffect`.
- Build the service layer (`movieService.js`, `storage.js`, `genres.js`) that the rest of the course builds on.
- Introduce safe patterns: loading/error states, `AbortController` cleanup, custom hooks.

---

## What to implement

1. **Genre data**
   - Create `src/data/genres.js` exporting a `GENRES` object (id → name map) and a `getGenreNames(genreIds)` helper.
   - Acceptance: `getGenreNames([28, 12])` returns `['Action', 'Adventure']`.
a
2. **Storage utility**
   - Create `src/utils/storage.js` with the following functions:
     - `getFavorites()` — reads and parses `localStorage`, returns `[]` on error
     - `toggleFavorite(movie)` — adds or removes a movie from the stored array, returns the updated array
     - `getTheme()` — returns `'dark'` or `'light'` from `localStorage` (default: `'dark'`)
     - `setTheme(theme)` — writes to `localStorage` and sets `data-theme` on `document.documentElement`
     - `getApiKey()` — returns the stored TMDB v3 API key or `''`
     - `setApiKey(key)` — trims and stores the key
   - Acceptance: favorites and theme persist across page reloads; `getApiKey()` returns `''` until one is set.
   - **Important:** this file is used by every session that follows. Do not skip it.

3. **Movie service**
   - Create `src/services/movieService.js` exporting a `movieService` object with a `fetchMovies({ search, genre, sort, onlyFavorites, page })` method.
   - When `VITE_TMDB_API_KEY` is set: fetch from `GET /movie/popular` or `GET /search/movie` using a Bearer token header.
   - When no key is set: return results from `SAMPLE_MOVIES` (filter locally by `search` if provided).
   - Always return `{ results, total_pages, total_results, isLiveApi }`.
   - Accept `genre`, `sort`, `onlyFavorites`, and `page` parameters even if they are not fully wired yet — the interface is set here and used in Session 04.
   - Acceptance: the app shows TMDB results with a valid API key and falls back to sample data without one.
   - **Note:** In Session 04 this service is upgraded to use `storage.getApiKey()` + `?api_key=` instead of the Bearer token, and genre/sort/onlyFavorites logic is fully implemented. Design the interface now; implement the upgrade in Session 04.

4. **First fetch with useEffect**
   - In `App.tsx`, add a `useEffect` that calls `movieService.fetchMovies()` and sets `movies`, `isLoading`, and `error` state.
   - Acceptance: the app displays remote posters when running with a valid API key; otherwise the sample data fallback is visible.

5. **Loading and error states**
   - Render a status message while `isLoading` is true and an error message when `error` is set.
   - Use `try`/`catch`/`finally`; set `isLoading(false)` in `finally` so it always resets.
   - Acceptance: network failures produce an error message and `isLoading` finishes `false`.

6. **AbortController cleanup**
   - Attach a signal to the fetch call and abort it in the effect cleanup function.
   - Acceptance: rapidly unmounting and remounting the component does not produce "Can't perform a React state update on an unmounted component" warnings.

7. **Extract useMovies hook**
   - Move the three states (`movies`, `isLoading`, `error`) and the fetch logic into `src/hooks/useMovies.ts`.
   - `App.tsx` should call `const { movies, isLoading, error } = useMovies()`.
   - Acceptance: behaviour is identical after the refactor; `App.tsx` contains no `useEffect` or fetch logic.
   - **Note:** `useMovies` is a learning exercise in custom hooks. By Session 04, `HomePage.tsx` fetches directly via `movieService` + `useEffect` without this hook. That is fine — the hook teaches the pattern; the direct approach in Session 04 is simpler to read when filtering, sorting, and pagination are added.

---

## Files to create/modify

- `src/data/genres.js` — `GENRES` map and `getGenreNames` helper
- `src/utils/storage.js` — localStorage helpers for favorites, theme, and API key
- `src/services/movieService.js` — TMDB fetch with sampleMovies fallback
- `src/hooks/useMovies.ts` — encapsulates movies/isLoading/error + fetch logic
- `src/App.tsx` — consume `useMovies()`; remove inline fetch logic

---

## Pro tips

- `movieService.js` and `storage.js` are not optional extras — every subsequent session depends on them. If they are not built in Session 03, Session 04 cannot be completed.
- Put `setIsLoading(true)` at the start of the async function, not just as the initial `useState` value. If the effect ever re-runs (e.g. a refresh button is added later), the loading indicator must reappear — it won't if you rely on the initial state.
- The `AbortError` must be caught and silently ignored — it is intentional, not a failure. Use `if (err instanceof DOMException && err.name === 'AbortError') return` inside the catch block.
