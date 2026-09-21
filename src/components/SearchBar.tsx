import { Search, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <div className="header-search">
      <div className="search-input-wrapper">
        <Search className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
          value={query}
          onChange={(event) => onChange(event.target.value)}
        />
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;