/**
 * Milestone 3 — Global State Management with Context API
 *
 * These tests verify the Session 5 requirements:
 *   1. AppContext provides: favorites, theme, toggleFavorite, isFavorite, toggleTheme
 *   2. useReducer is used with at least two action types (TOGGLE_FAVOURITE, SET_THEME)
 *   3. Favorites state is shared globally — toggling in one component updates all consumers
 *   4. Theme is applied via data-theme on the <html> element
 *   5. Favorites and theme persist via localStorage (keys: cinegrid_favorites, cinegrid_theme)
 *   6. Milestone 1 and 2 requirements still pass (regression)
 *
 * fetch is mocked globally — no real network calls are made.
 * localStorage is the jsdom in-memory implementation, cleared before each test.
 *
 * Run locally: npm run test:run
 * Run with detail: npm run test:run:verbose
 *
 * NOTE: If an import fails, the file does not exist yet.
 * Create the missing file and re-run the tests.
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

import App from '../App'
import { AppProvider, useAppContext } from '../context/AppContext'
import type { Movie } from '../types'

// ── Shared test fixtures ──────────────────────────────────────────────────────

const MOCK_MOVIE: Movie = {
  id: 640146,
  title: 'Ant-Man and the Wasp: Quantumania',
  overview: 'Super-Hero partners Scott Lang and Hope van Dyne explore the Quantum Realm.',
  poster_path: '/ngl2FKBlU4fhbdsrtdom9LVLBXw.jpg',
  backdrop_path: '/i7A7bRwOZMGO3tUDRa3GVDNipme.jpg',
  release_date: '2023-02-15',
  vote_average: 6.5,
  vote_count: 1886,
  popularity: 654.3,
  genre_ids: [28, 12, 878],
  adult: false,
}

const MOCK_MOVIE_2: Movie = {
  id: 315162,
  title: 'Puss in Boots: The Last Wish',
  overview: 'Puss in Boots discovers that his passion for adventure has taken its toll.',
  poster_path: '/kuf6dutpsT0vSVehic3EZIqkOBt.jpg',
  backdrop_path: '/4cBaKfysPM4KuFPpE7hpTJHYdmW.jpg',
  release_date: '2022-12-07',
  vote_average: 8.3,
  vote_count: 5331,
  popularity: 543.2,
  genre_ids: [16, 10751, 14, 12, 35, 18],
  adult: false,
}

const MOCK_MOVIES = [MOCK_MOVIE, MOCK_MOVIE_2]

// ── Test consumer — reads everything from context ─────────────────────────────

function ContextInspector() {
  const { favorites, theme, toggleFavorite, toggleTheme, isFavorite } = useAppContext()
  return (
    <div>
      <span data-testid="fav-count">{favorites.length}</span>
      <span data-testid="theme">{theme}</span>
      <span data-testid="is-fav-1">{isFavorite(MOCK_MOVIE.id) ? 'yes' : 'no'}</span>
      <span data-testid="is-fav-2">{isFavorite(MOCK_MOVIE_2.id) ? 'yes' : 'no'}</span>
      <button data-testid="toggle-fav-1" onClick={() => toggleFavorite(MOCK_MOVIE)}>
        Toggle 1
      </button>
      <button data-testid="toggle-fav-2" onClick={() => toggleFavorite(MOCK_MOVIE_2)}>
        Toggle 2
      </button>
      <button data-testid="toggle-theme" onClick={toggleTheme}>
        Toggle theme
      </button>
    </div>
  )
}

function renderContext() {
  return render(
    <AppProvider>
      <ContextInspector />
    </AppProvider>
  )
}

// ── fetch mock ────────────────────────────────────────────────────────────────

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')

  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: MOCK_MOVIES,
            page: 1,
            total_pages: 1,
            total_results: MOCK_MOVIES.length,
          }),
      })
    )
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
})

// ── AppContext — initial values ───────────────────────────────────────────────

describe('AppContext — initial values', () => {
  it('AppProvider renders its children without crashing', () => {
    render(
      <AppProvider>
        <p>child</p>
      </AppProvider>
    )
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('provides an initial favorites array', () => {
    renderContext()
    expect(screen.getByTestId('fav-count')).toHaveTextContent('0')
  })

  it('provides an initial theme value', () => {
    renderContext()
    const theme = screen.getByTestId('theme').textContent
    expect(['dark', 'light']).toContain(theme)
  })

  it('defaults to dark theme when localStorage is empty', () => {
    renderContext()
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })
})

// ── AppContext — TOGGLE_FAVOURITE action ──────────────────────────────────────

describe('AppContext — TOGGLE_FAVOURITE action', () => {
  it('adds a movie to favorites on first toggle', () => {
    renderContext()
    fireEvent.click(screen.getByTestId('toggle-fav-1'))
    expect(screen.getByTestId('fav-count')).toHaveTextContent('1')
  })

  it('removes the movie from favorites when toggled a second time', () => {
    renderContext()
    fireEvent.click(screen.getByTestId('toggle-fav-1'))
    fireEvent.click(screen.getByTestId('toggle-fav-1'))
    expect(screen.getByTestId('fav-count')).toHaveTextContent('0')
  })

  it('isFavorite returns true after a movie is toggled on', () => {
    renderContext()
    fireEvent.click(screen.getByTestId('toggle-fav-1'))
    expect(screen.getByTestId('is-fav-1')).toHaveTextContent('yes')
  })

  it('isFavorite returns false after a movie is toggled off', () => {
    renderContext()
    fireEvent.click(screen.getByTestId('toggle-fav-1'))
    fireEvent.click(screen.getByTestId('toggle-fav-1'))
    expect(screen.getByTestId('is-fav-1')).toHaveTextContent('no')
  })

  it('toggling one movie does not affect another', () => {
    renderContext()
    fireEvent.click(screen.getByTestId('toggle-fav-1'))
    expect(screen.getByTestId('is-fav-1')).toHaveTextContent('yes')
    expect(screen.getByTestId('is-fav-2')).toHaveTextContent('no')
  })

  it('can favorite multiple movies independently', () => {
    renderContext()
    fireEvent.click(screen.getByTestId('toggle-fav-1'))
    fireEvent.click(screen.getByTestId('toggle-fav-2'))
    expect(screen.getByTestId('fav-count')).toHaveTextContent('2')
    expect(screen.getByTestId('is-fav-1')).toHaveTextContent('yes')
    expect(screen.getByTestId('is-fav-2')).toHaveTextContent('yes')
  })
})

// ── AppContext — SET_THEME action ─────────────────────────────────────────────

describe('AppContext — SET_THEME action', () => {
  it('toggleTheme switches dark → light', () => {
    renderContext()
    fireEvent.click(screen.getByTestId('toggle-theme'))
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  it('toggleTheme switches light → dark on second click', () => {
    renderContext()
    fireEvent.click(screen.getByTestId('toggle-theme'))
    fireEvent.click(screen.getByTestId('toggle-theme'))
    expect(screen.getByTestId('theme')).toHaveTextContent('dark')
  })
})

// ── Theme — data-theme on <html> ──────────────────────────────────────────────

describe('Theme — data-theme attribute on <html>', () => {
  it('sets data-theme="dark" on the document element by default', () => {
    renderContext()
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('updates data-theme to "light" after toggleTheme', () => {
    renderContext()
    fireEvent.click(screen.getByTestId('toggle-theme'))
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('updates data-theme back to "dark" after toggling twice', () => {
    renderContext()
    fireEvent.click(screen.getByTestId('toggle-theme'))
    fireEvent.click(screen.getByTestId('toggle-theme'))
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })
})

// ── localStorage — writing ────────────────────────────────────────────────────

describe('localStorage — writing', () => {
  it('saves favorites to localStorage when a movie is toggled', () => {
    renderContext()
    fireEvent.click(screen.getByTestId('toggle-fav-1'))

    const raw = localStorage.getItem('cinegrid_favorites')
    expect(raw).not.toBeNull()
    const saved = JSON.parse(raw!)
    expect(Array.isArray(saved)).toBe(true)
    expect(saved.length).toBe(1)
    expect(saved[0].id).toBe(MOCK_MOVIE.id)
  })

  it('removes a movie from localStorage when toggled off', () => {
    renderContext()
    fireEvent.click(screen.getByTestId('toggle-fav-1'))
    fireEvent.click(screen.getByTestId('toggle-fav-1'))

    const saved = JSON.parse(localStorage.getItem('cinegrid_favorites')!)
    expect(saved.length).toBe(0)
  })

  it('saves the theme to localStorage when toggled', () => {
    renderContext()
    fireEvent.click(screen.getByTestId('toggle-theme'))
    expect(localStorage.getItem('cinegrid_theme')).toBe('light')
  })
})

// ── localStorage — reading (initial state) ────────────────────────────────────

describe('localStorage — reading on mount', () => {
  it('initialises favorites from localStorage', () => {
    localStorage.setItem('cinegrid_favorites', JSON.stringify([MOCK_MOVIE]))
    renderContext()
    expect(screen.getByTestId('fav-count')).toHaveTextContent('1')
    expect(screen.getByTestId('is-fav-1')).toHaveTextContent('yes')
  })

  it('initialises theme from localStorage', () => {
    localStorage.setItem('cinegrid_theme', 'light')
    renderContext()
    expect(screen.getByTestId('theme')).toHaveTextContent('light')
  })

  it('applies the persisted theme to data-theme on mount', () => {
    localStorage.setItem('cinegrid_theme', 'light')
    renderContext()
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })
})

// ── Cross-component state sharing ─────────────────────────────────────────────

describe('Global state — shared between components', () => {
  it('a favorite toggled in one consumer is immediately visible to another', () => {
    render(
      <AppProvider>
        <ContextInspector />
        <ContextInspector />
      </AppProvider>
    )

    const [toggleBtn] = screen.getAllByTestId('toggle-fav-1')
    fireEvent.click(toggleBtn)

    const counts = screen.getAllByTestId('fav-count')
    expect(counts[0]).toHaveTextContent('1')
    expect(counts[1]).toHaveTextContent('1')
  })

  it('both consumers see the same theme after it is toggled', () => {
    render(
      <AppProvider>
        <ContextInspector />
        <ContextInspector />
      </AppProvider>
    )

    const [toggleBtn] = screen.getAllByTestId('toggle-theme')
    fireEvent.click(toggleBtn)

    const themes = screen.getAllByTestId('theme')
    expect(themes[0]).toHaveTextContent('light')
    expect(themes[1]).toHaveTextContent('light')
  })
})

// ── Milestone 1 & 2 regression ────────────────────────────────────────────────

describe('Regression — Milestone 1 and 2 still work', () => {
  it('the app renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow()
  })

  it('displays movies after the home page fetch resolves', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(1)
    })
  })

  it('Home and About navigation links are present', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
  })

  it('the search input is present', () => {
    render(<App />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
