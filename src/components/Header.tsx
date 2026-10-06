import { Link } from 'react-router-dom';

function Header() {
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
        </nav>
      </div>
    </header>
  );
}

export default Header;