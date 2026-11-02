import { Link } from 'react-router-dom';
import { Heart, Moon, Sun } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

function Header() {
  const { favorites, theme, toggleTheme } = useAppContext();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-logo">
          <span className="logo-dot" />
          <span className="logo-text">Movie App</span>
        </Link>
        <nav className="site-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <span className="stat-label" title="Favourites">
            <Heart size={14} /> {favorites.length}
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;