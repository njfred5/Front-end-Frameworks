import { createContext, useContext, useEffect, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Movie, Theme } from '../types';
import { getFavorites, getTheme, saveFavorites, setTheme } from '../utils/storage';

interface AppState {
  favorites: Movie[];
  theme: Theme;
}

type AppAction =
  | { type: 'TOGGLE_FAVOURITE'; payload: Movie }
  | { type: 'SET_THEME'; payload: Theme };

interface AppContextValue extends AppState {
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
  toggleTheme: () => void;
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const exists = state.favorites.some((m) => m.id === action.payload.id);
      return {
        ...state,
        favorites: exists
          ? state.favorites.filter((m) => m.id !== action.payload.id)
          : [...state.favorites, action.payload],
      };
    }
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, () => ({
    favorites: getFavorites() as Movie[],
    theme: getTheme() as Theme,
  }));

  useEffect(() => {
    saveFavorites(state.favorites);
  }, [state.favorites]);

  useEffect(() => {
    setTheme(state.theme);
  }, [state.theme]);

  const value: AppContextValue = {
    favorites: state.favorites,
    theme: state.theme,
    toggleFavorite: (movie) => dispatch({ type: 'TOGGLE_FAVOURITE', payload: movie }),
    isFavorite: (id) => state.favorites.some((m) => m.id === id),
    toggleTheme: () =>
      dispatch({ type: 'SET_THEME', payload: state.theme === 'dark' ? 'light' : 'dark' }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside an AppProvider');
  }
  return context;
}