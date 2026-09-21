// ─── DATA ────────────────────────────────────────────────────────────────────

const GENRES = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
  99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
  27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi",
  10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
};

const SAMPLE_MOVIES = [
  { adult: false, backdrop_path: "/qeQJx07rK2xm8SD2sJxFKhE7gs0.jpg", genre_ids: [878, 28, 12], id: 969681, title: "Spider-Man: Brand New Day", original_language: "en", original_title: "Spider-Man: Brand New Day", overview: "Fighting crime full-time as Spider-Man in a world that doesn't remember him—and the pressure of seeing his old friends move on without him—sparks a change in Peter Parker he may not have the power to control. But that transformation might also be the only thing that can stop a shocking new threat to the city and those he loves - a powerful villain no one can even see.", popularity: 1146.6141, poster_path: "/iPOn6DinuVyLY17YM9mKuPofV08.jpg", release_date: "2026-07-29", vote_average: 7.864, vote_count: 1568 },
  { adult: false, backdrop_path: "/RMXG8myu1aGlNUsRjtxzmpdMK0.jpg", genre_ids: [12, 28, 14], id: 1368337, title: "The Odyssey", original_language: "en", original_title: "The Odyssey", overview: "Odysseus, the legendary King of Ithaca, embarks on a long and perilous journey home following the Trojan War. Throughout his voyage, he is forced to confront the whims of gods, mythological monsters, and trials that stretch both his cunning and his humanity to the breaking point.", popularity: 819.0049, poster_path: "/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg", release_date: "2026-07-15", vote_average: 7.993, vote_count: 2639 },
  { adult: false, backdrop_path: "/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg", genre_ids: [28, 12, 878], id: 634649, title: "Spider-Man: No Way Home", original_language: "en", original_title: "Spider-Man: No Way Home", overview: "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.", popularity: 643.3186, poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", release_date: "2021-12-15", vote_average: 7.938, vote_count: 22613 },
  { adult: false, backdrop_path: "/2mPmccLg8QCD4ZF6v8kSsUijPPW.jpg", genre_ids: [27, 878, 53], id: 1284041, title: "The Last House", original_language: "en", original_title: "The Last House", overview: "A family suddenly sealed inside their home must work together to survive against dwindling resources and the ominous threat keeping them trapped.", popularity: 383.9155, poster_path: "/6JU7E8Vv2M11egkctWVOScxWR75.jpg", release_date: "2026-08-06", vote_average: 6.845, vote_count: 465 },
  { adult: false, backdrop_path: "/kkcwhgSFd81QDlXo8ytrpHPQjhy.jpg", genre_ids: [12, 16, 35, 10751, 14], id: 1315772, title: "Minions & Monsters", original_language: "en", original_title: "Minions & Monsters", overview: "This is the rambunctious, ridiculous and totally true story of how the Minions conquered Hollywood, became movie stars, lost everything, unleashed monsters onto the world and then banded together to try and save the planet from the mayhem they had just created.", popularity: 331.3084, poster_path: "/nz7i42yhLIJ4ve9JKgM6NthoLHO.jpg", release_date: "2026-06-24", vote_average: 7.044, vote_count: 410 },
  { adult: false, backdrop_path: "/54KIfdTEzOliHDKx0OkzYGqAICx.jpg", genre_ids: [28, 12, 878], id: 1081003, title: "Supergirl", original_language: "en", original_title: "Supergirl", overview: "When an unexpected and ruthless adversary strikes too close to home, Kara Zor-El, aka Supergirl, reluctantly joins forces with an unlikely companion on an epic, interstellar journey of vengeance and justice.", popularity: 287.6622, poster_path: "/1QCWdqzTfh2x9UylVpspIU6QTuM.jpg", release_date: "2026-06-24", vote_average: 6.744, vote_count: 1780 },
  { adult: false, backdrop_path: "/8sSKdEmlmqF4kJUd28SqthXC4yZ.jpg", genre_ids: [16, 10751, 35, 12], id: 1084244, title: "Toy Story 5", original_language: "en", original_title: "Toy Story 5", overview: "When Bonnie receives a Lilypad tablet as a gift and becomes obsessed, Buzz, Woody, Jessie and the rest of the gang's jobs become exponentially harder when they have to go head to head with the all-new threat to playtime.", popularity: 294.9183, poster_path: "/sfQtVlIHljToOwYjhe21KPGzZWK.jpg", release_date: "2026-06-17", vote_average: 7.419, vote_count: 811 },
  { adult: false, backdrop_path: "/cOKATn8lOcvVnOqqV5oYWaI9z2Z.jpg", genre_ids: [28, 27, 878], id: 1375646, title: "Colony", original_language: "ko", original_title: "군체", overview: "Professor Se-jeong is thrust into a bloody nightmare when a rapidly mutating virus is released during a biotech conference causing authorities to seal the facility. Trapped inside with no escape, Se-jeong along with a small group of survivors must fight to stay alive while the infected undergo horrific transformations.", popularity: 292.9874, poster_path: "/wC69brhk65GvrgNQdqLRUqtneUH.jpg", release_date: "2026-05-21", vote_average: 8.129, vote_count: 465 },
  { adult: false, backdrop_path: "/o0jkkpcN81QqSl8DMLScBCXyUH9.jpg", genre_ids: [27], id: 1212763, title: "Evil Dead Burn", original_language: "en", original_title: "Evil Dead Burn", overview: "After her husband's abrupt death, Alice seeks solace with his remaining family — descendants of a leading researcher on demonic possession. As her in-laws transform one by one into creatures that feed on fear, she comes to discover that the vows she took in life survive even in death.", popularity: 270.5983, poster_path: "/uRxrNXQWkHoENm3nwVOZDYSCx2F.jpg", release_date: "2026-07-07", vote_average: 7.898, vote_count: 958 },
  { adult: false, backdrop_path: "/lh3BDkmWJh998n4fQcHYcVi7dpm.jpg", genre_ids: [12, 18, 28], id: 1284465, title: "The Death of Robin Hood", original_language: "en", original_title: "The Death of Robin Hood", overview: "Grappling with his past after a life of crime and murder, Robin Hood finds himself gravely injured after a battle he thought would be his last. In the hands of a mysterious woman, he is offered a chance at salvation.", popularity: 258.7221, poster_path: "/92Tsfx7SFafOqWsotvrlJbHyehd.jpg", release_date: "2026-06-18", vote_average: 6.345, vote_count: 193 },
  { adult: false, backdrop_path: "/flxau5Iu7bChQHsESqvGZ3FQRaI.jpg", genre_ids: [878, 53], id: 1275779, title: "Disclosure Day", original_language: "en", original_title: "Disclosure Day", overview: "A cybersecurity expert becomes a whistleblower after uncovering secrets about aliens, putting him on the run from a corporation. Meanwhile, a meteorologist experiencing strange phenomena joins forces with him to prove there's life beyond our understanding.", popularity: 246.4077, poster_path: "/AnJ8IQJI23hNpYXVNaythu061Ru.jpg", release_date: "2026-06-10", vote_average: 7.453, vote_count: 2682 },
  { adult: false, backdrop_path: "/rZfmzpixLKLR3Hg2u0WgC7XLFl8.jpg", genre_ids: [27, 53], id: 1339713, title: "Obsession", original_language: "en", original_title: "Obsession", overview: "After breaking the mysterious \"One Wish Willow\" to win his crush's heart, a hopeless romantic finds himself getting exactly what he asked for but soon discovers that some desires come at a dark, sinister price.", popularity: 262.6154, poster_path: "/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg", release_date: "2026-05-13", vote_average: 8.228, vote_count: 4572 },
  { adult: false, backdrop_path: "/c6BPbkO5Npt1OdwttAxCFo06wtH.jpg", genre_ids: [10751, 14, 35, 12], id: 1108427, title: "Moana", original_language: "en", original_title: "Moana", overview: "Teenage Moana answers the Ocean's call and, for the first time, voyages beyond the reef of her island of Motunui with infamous demigod Maui on an unforgettable journey to restore prosperity to her people.", popularity: 229.5025, poster_path: "/zKVgiv5qHCvCLT4A2ymJi5QeXDH.jpg", release_date: "2026-07-08", vote_average: 6.0, vote_count: 192 },
  { adult: false, backdrop_path: "/fn4n6uOYcB6Uh89nbNPoU2w80RV.jpg", genre_ids: [28, 12, 878], id: 315635, title: "Spider-Man: Homecoming", original_language: "en", original_title: "Spider-Man: Homecoming", overview: "Following the events of Captain America: Civil War, Peter Parker, with the help of his mentor Tony Stark, tries to balance his life as an ordinary high school student in Queens, New York City, with fighting crime as his superhero alter ego Spider-Man as a new threat, the Vulture, emerges.", popularity: 220.5926, poster_path: "/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg", release_date: "2017-07-05", vote_average: 7.332, vote_count: 23588 },
  { adult: false, backdrop_path: "/c4TkvRGVrghFY2qFKJ0SUwqtAiW.jpg", genre_ids: [28, 12, 14], id: 1599191, title: "Renegade Immortal: Battle of the Gods", original_language: "zh", original_title: "仙逆剧场版 弑仙之战", overview: "An epic martial fantasy journey of Wang Lin as he defiance the celestial realms and fights ancient gods to protect his loved ones.", popularity: 188.0818, poster_path: "/m1dXI1997D7lj6Sh0Z2DI26o2nI.jpg", release_date: "2026-03-12", vote_average: 7.8, vote_count: 84 },
  { adult: false, backdrop_path: "/se8LfmZYFiNerF6U7zMUKePV0vE.jpg", genre_ids: [27, 53], id: 1481343, title: "The Devil's Mouth", original_language: "en", original_title: "The Devil's Mouth", overview: "A group of college friends' Thailand adventure turns deadly when they become trapped in submerged caves with a dangerous predator. As oxygen runs low, past conflicts emerge in their desperate fight for survival.", popularity: 185.1919, poster_path: "/lH8k9uCWYn2b2gsYleqYBDPbWa8.jpg", release_date: "2026-07-29", vote_average: 6.536, vote_count: 573 },
  { adult: false, backdrop_path: "/dqmMWNWfLnExDRpMtIMqI97GQFR.jpg", genre_ids: [27, 9648, 878], id: 1083381, title: "Backrooms", original_language: "en", original_title: "Backrooms", overview: "A strange doorway appears in the basement of a furniture showroom, leading into infinite yellow-wallpapered hallways.", popularity: 176.1763, poster_path: "/rhGx6E3qRNMgj3i5su2oukNHwIQ.jpg", release_date: "2026-05-27", vote_average: 7.101, vote_count: 2694 },
  { adult: false, backdrop_path: "/7t6f6VxA2ZXbbZSVctgt7bZG2DI.jpg", genre_ids: [27, 878, 53], id: 1307118, title: "Soulm8te", original_language: "en", original_title: "Soulm8te", overview: "After a ruthless tech giant acquires a small robotics company, a grieving engineer is tasked with testing their new AI companion. But when he attempts to reprogram her to be a truly sentient soulmate, she develops needs of her own—unleashing a relentless spree of precision-engineered mayhem.", popularity: 179.2709, poster_path: "/bNErActDctl6cdUGw9pnjSCmyhQ.jpg", release_date: "2026-07-31", vote_average: 6.473, vote_count: 92 },
  { adult: false, backdrop_path: "/zQ8AxTPiCiS5nnwXpwTBPBHSaa5.jpg", genre_ids: [28, 878], id: 557, title: "Spider-Man", original_language: "en", original_title: "Spider-Man", overview: "After being bitten by a genetically altered spider at Oscorp, nerdy but endearing high school student Peter Parker is endowed with amazing powers to become the superhero known as Spider-Man.", popularity: 169.7288, poster_path: "/nXdAh5vUwERL4WGVMaee8RoDEAS.jpg", release_date: "2002-05-01", vote_average: 7.342, vote_count: 21090 },
  { adult: false, backdrop_path: "/rOIaKlAX0SeNC25dFbM0y1mFsH6.jpg", genre_ids: [12, 14, 28], id: 1698863, title: "The Odyssey: Legend Returns", original_language: "en", original_title: "The Odyssey", overview: "Based on the Ancient Greek epic. After ten years of war, King Odysseus sets sail for Ithaca, eager to reunite with his beloved. But his journey home is far more treacherous than the battlefield, as he must face deadly monsters and vengeful gods to survive.", popularity: 165.1631, poster_path: "/xBHCRB7zLIW41w8QskfwJhm32YF.jpg", release_date: "2026-07-03", vote_average: 6.233, vote_count: 15 }
];

// ─── UTILS ───────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return (str || '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[c]);
}

function getPosterUrl(path) {
  if (!path) return getPlaceholderPoster();
  if (path.startsWith('http')) return path;
  return `https://image.tmdb.org/t/p/w500${path}`;
}

function getBackdropUrl(path) {
  if (!path) return getPlaceholderBackdrop();
  if (path.startsWith('http')) return path;
  return `https://image.tmdb.org/t/p/w1280${path}`;
}

function getPlaceholderPoster(title = 'Movie') {
  const t = (title || '').replace(/[<>&'"]/g, c => ({ '<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;' })[c]);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750" fill="none"><rect width="500" height="750" fill="#18181b"/><rect x="20" y="20" width="460" height="710" rx="12" stroke="#27272a" stroke-width="2" stroke-dasharray="8 8"/><circle cx="250" cy="320" r="60" fill="#27272a"/><polygon points="235,290 275,320 235,350" fill="#a1a1aa"/><text x="250" y="440" fill="#e4e4e7" font-family="sans-serif" font-size="24" font-weight="bold" text-anchor="middle">${t}</text><text x="250" y="480" fill="#71717a" font-family="sans-serif" font-size="16" text-anchor="middle">Poster Unavailable</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function getPlaceholderBackdrop() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720" fill="none"><rect width="1280" height="720" fill="#18181b"/><circle cx="640" cy="360" r="100" fill="#27272a"/><text x="640" y="520" fill="#71717a" font-family="sans-serif" font-size="20" text-anchor="middle">CineGrid Motion Picture</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function getGenreNames(genreIds = []) {
  if (!genreIds || !genreIds.length) return ['General'];
  return genreIds.map(id => GENRES[id] || 'Other');
}

// ─── STORAGE ─────────────────────────────────────────────────────────────────

const storage = {
  getFavorites() {
    try { return JSON.parse(localStorage.getItem('cinegrid_favorites') || '[]'); }
    catch { return []; }
  },
  isFavorite(movieId) {
    return this.getFavorites().some(m => Number(m.id) === Number(movieId));
  },
  toggleFavorite(movie) {
    const favs = this.getFavorites();
    const idx = favs.findIndex(m => Number(m.id) === Number(movie.id));
    const updated = idx >= 0 ? favs.filter(m => Number(m.id) !== Number(movie.id)) : [movie, ...favs];
    try { localStorage.setItem('cinegrid_favorites', JSON.stringify(updated)); } catch {}
    return { isAdded: idx < 0 };
  },
  getTheme() {
    return localStorage.getItem('cinegrid_theme') || 'dark';
  },
  setTheme(theme) {
    localStorage.setItem('cinegrid_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
};

// ─── MOVIE SERVICE ────────────────────────────────────────────────────────────

const movieService = {
  fetchMovies({ search = '', genre = 'all', sort = 'popularity', onlyFavorites = false, page = 1 } = {}) {
    let pool = onlyFavorites ? storage.getFavorites() : [...SAMPLE_MOVIES];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      pool = pool.filter(m =>
        (m.title && m.title.toLowerCase().includes(q)) ||
        (m.overview && m.overview.toLowerCase().includes(q)) ||
        (m.original_title && m.original_title.toLowerCase().includes(q))
      );
    }

    if (genre !== 'all') {
      const gId = Number(genre);
      pool = pool.filter(m => Array.isArray(m.genre_ids) && m.genre_ids.includes(gId));
    }

    pool = this.sortMovies(pool, sort);

    const pageSize = 12;
    const total_results = pool.length;
    const total_pages = Math.max(1, Math.ceil(total_results / pageSize));
    const currentPage = Math.min(Math.max(1, page), total_pages);
    const results = pool.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return { results, total_pages, total_results, page: currentPage };
  },

  sortMovies(movies, sortType) {
    const arr = [...movies];
    switch (sortType) {
      case 'popularity':   return arr.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
      case 'rating':       return arr.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
      case 'release_date': return arr.sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));
      case 'title':        return arr.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
      default:             return arr;
    }
  }
};

// ─── APPLICATION STATE ────────────────────────────────────────────────────────

const state = {
  search: '',
  genre: 'all',
  sort: 'popularity',
  onlyFavorites: false,
  viewMode: 'grid',
  page: 1,
  movies: [],
  totalPages: 1,
  totalResults: 0
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function renderHeader() {
  const theme = storage.getTheme();
  const favCount = storage.getFavorites().length;

  const sunIcon = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
  const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="header-inner">
      <div class="brand-logo" id="brand-logo" title="Reset filters">
        <div class="logo-dot"></div>
        <span class="logo-text">CINE&middot;GRID</span>
        <span class="brand-badge">Vanilla JS</span>
      </div>

      <div class="header-search">
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="search-input" class="search-input"
            placeholder="Search movies, plot keywords, titles..."
            value="${escapeHtml(state.search)}" autocomplete="off" />
          <button class="search-clear-btn" id="search-clear-btn" title="Clear search">&times;</button>
        </div>
      </div>

      <div class="header-actions">
        <button id="fav-toggle-btn" class="btn-icon-label ${state.onlyFavorites ? 'active' : ''}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${state.onlyFavorites ? '#ffffff' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>Watchlist</span>
          <span id="fav-count-badge" class="count-badge">${favCount}</span>
        </button>

        <button id="theme-toggle-btn" class="theme-toggle-btn" title="Toggle theme">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${theme === 'dark' ? sunIcon : moonIcon}
          </svg>
        </button>
      </div>
    </div>
  `;

  let searchTimeout;
  header.querySelector('#search-input').addEventListener('input', e => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => { state.search = e.target.value; state.page = 1; loadMovies(); }, 200);
  });

  header.querySelector('#search-clear-btn').addEventListener('click', () => {
    header.querySelector('#search-input').value = '';
    state.search = '';
    state.page = 1;
    loadMovies();
    header.querySelector('#search-input').focus();
  });

  header.querySelector('#fav-toggle-btn').addEventListener('click', () => {
    state.onlyFavorites = !state.onlyFavorites;
    state.page = 1;
    loadMovies();
  });

  header.querySelector('#theme-toggle-btn').addEventListener('click', () => {
    storage.setTheme(storage.getTheme() === 'dark' ? 'light' : 'dark');
    renderApp();
  });

  header.querySelector('#brand-logo').addEventListener('click', () => {
    state.search = '';
    state.genre = 'all';
    state.onlyFavorites = false;
    state.page = 1;
    loadMovies();
  });

  return header;
}

function renderStatsBanner() {
  const avgRating = state.movies.length
    ? (state.movies.reduce((acc, m) => acc + (m.vote_average || 0), 0) / state.movies.length).toFixed(1)
    : '0.0';
  const genreName = state.genre === 'all' ? 'All Genres' : (GENRES[state.genre] || 'Custom');

  const el = document.createElement('div');
  el.className = 'stats-banner';
  el.innerHTML = `
    <div class="stat-card">
      <div class="stat-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="2" width="20" height="20" rx="2.18"></rect>
          <line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line>
          <line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line>
          <line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line>
          <line x1="17" y1="7" x2="22" y2="7"></line>
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-value">${state.totalResults}</span>
        <span class="stat-label">${state.onlyFavorites ? 'Saved Movies' : 'Available Titles'}</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon" style="color:var(--star-gold)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-value">${avgRating} / 10</span>
        <span class="stat-label">Avg Page Rating</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-value" style="font-size:1.05rem">${escapeHtml(genreName)}</span>
        <span class="stat-label">Selected Category</span>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon" style="color:#3b82f6">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      </div>
      <div class="stat-info">
        <span class="stat-value" style="font-size:1rem">Cached Local DB</span>
        <span class="stat-label">Data Engine</span>
      </div>
    </div>
  `;
  return el;
}

function renderFilterBar() {
  const genreList = [{ id: 'all', name: 'All Movies' }, ...Object.entries(GENRES).map(([id, name]) => ({ id, name }))];

  const el = document.createElement('div');
  el.className = 'filter-bar';
  el.innerHTML = `
    <div class="genre-pills-scroll" id="genre-pills-container">
      ${genreList.map(g => `
        <button class="genre-pill ${String(state.genre) === String(g.id) ? 'active' : ''}" data-genre="${g.id}">
          ${escapeHtml(g.name)}
        </button>
      `).join('')}
    </div>

    <div class="filter-actions-right">
      <div class="sort-select-wrapper">
        <select id="sort-select" class="sort-select" aria-label="Sort movies by">
          <option value="popularity"   ${state.sort === 'popularity'   ? 'selected' : ''}>Most Popular</option>
          <option value="rating"       ${state.sort === 'rating'       ? 'selected' : ''}>Highest Rated</option>
          <option value="release_date" ${state.sort === 'release_date' ? 'selected' : ''}>Release Date</option>
          <option value="title"        ${state.sort === 'title'        ? 'selected' : ''}>Title (A-Z)</option>
        </select>
      </div>

      <div class="view-toggle-group">
        <button id="view-grid-btn" class="view-btn ${state.viewMode === 'grid' ? 'active' : ''}" title="Grid View">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </button>
        <button id="view-list-btn" class="view-btn ${state.viewMode === 'list' ? 'active' : ''}" title="List View">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  `;

  el.querySelector('#genre-pills-container').addEventListener('click', e => {
    const pill = e.target.closest('.genre-pill');
    if (pill) { state.genre = pill.dataset.genre; state.page = 1; loadMovies(); }
  });

  el.querySelector('#sort-select').addEventListener('change', e => {
    state.sort = e.target.value; state.page = 1; loadMovies();
  });

  el.querySelector('#view-grid-btn').addEventListener('click', () => {
    state.viewMode = 'grid'; renderApp();
  });
  el.querySelector('#view-list-btn').addEventListener('click', () => {
    state.viewMode = 'list'; renderApp();
  });

  return el;
}

function createMovieCard(movie) {
  const isFav = storage.isFavorite(movie.id);
  const posterSrc = getPosterUrl(movie.poster_path);
  const year = movie.release_date ? movie.release_date.substring(0, 4) : 'TBA';
  const rating = movie.vote_average ? Number(movie.vote_average).toFixed(1) : 'N/A';
  const genres = getGenreNames(movie.genre_ids).slice(0, 2);

  const card = document.createElement('article');
  card.className = 'movie-card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${movie.title} (${year})`);

  card.innerHTML = `
    <div class="poster-wrapper">
      <img src="${escapeHtml(posterSrc)}" alt="${escapeHtml(movie.title)}" class="poster-img" loading="lazy" />
      <div class="poster-overlay">
        <div class="card-top-badges">
          <span class="rating-badge">
            <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            ${escapeHtml(rating)}
          </span>
          <button class="favorite-btn ${isFav ? 'is-favorite' : ''}" title="${isFav ? 'Remove from Watchlist' : 'Add to Watchlist'}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <span class="quick-view-hint">View Details</span>
      </div>
    </div>
    <div class="movie-card-info">
      <h3 class="movie-card-title">${escapeHtml(movie.title)}</h3>
      <div class="movie-card-meta">
        <span>${escapeHtml(year)}</span>
        <span>${movie.vote_count ? movie.vote_count.toLocaleString() + ' votes' : 'Upcoming'}</span>
      </div>
      <div class="movie-genres-tags">
        ${genres.map(g => `<span class="genre-tag">${escapeHtml(g)}</span>`).join('')}
      </div>
    </div>
  `;

  const img = card.querySelector('.poster-img');
  img.addEventListener('error', () => { img.src = getPlaceholderPoster(movie.title); });

  card.querySelector('.favorite-btn').addEventListener('click', e => {
    e.stopPropagation();
    handleToggleFav(movie);
  });

  card.addEventListener('click', () => openModal(movie));
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(movie); }
  });

  return card;
}

function openModal(movie) {
  const backdropSrc = getBackdropUrl(movie.backdrop_path);
  const posterSrc = getPosterUrl(movie.poster_path);
  const genres = getGenreNames(movie.genre_ids);
  const rating = movie.vote_average ? Number(movie.vote_average).toFixed(1) : 'N/A';
  const releaseFormatted = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Unknown Release Date';

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  overlay.innerHTML = `
    <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-movie-title">
      <button class="modal-close-btn" id="modal-close-btn" aria-label="Close">&times;</button>

      <div class="modal-backdrop-hero" id="modal-hero"></div>

      <div class="modal-body">
        <img src="${escapeHtml(posterSrc)}" alt="${escapeHtml(movie.title)}" class="modal-poster" id="modal-poster" />

        <div class="modal-content-details">
          <h2 class="modal-title" id="modal-movie-title">${escapeHtml(movie.title)}</h2>
          ${movie.original_title && movie.original_title !== movie.title
            ? `<div class="modal-original-title">Original Title: ${escapeHtml(movie.original_title)}</div>`
            : ''}

          <div class="modal-meta-row">
            <span class="rating-badge" style="font-size:0.9rem;padding:6px 12px">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              ${escapeHtml(rating)} / 10
            </span>
            ${movie.vote_count ? `<span class="modal-meta-item">${movie.vote_count.toLocaleString()} Ratings</span>` : ''}
            <span class="modal-meta-item">&#128197; ${escapeHtml(releaseFormatted)}</span>
            ${movie.popularity ? `<span class="modal-meta-item">&#128293; Popularity: ${Math.round(movie.popularity)}</span>` : ''}
          </div>

          <div class="movie-genres-tags" style="gap:8px">
            ${genres.map(g => `<span class="genre-tag" style="font-size:0.78rem;padding:4px 10px;border-radius:6px">${escapeHtml(g)}</span>`).join('')}
          </div>

          <div class="modal-overview">
            <h4 class="modal-overview-heading">Overview</h4>
            <p>${movie.overview ? escapeHtml(movie.overview) : 'No plot synopsis available.'}</p>
          </div>

          <div class="modal-footer-actions">
            <button class="btn-primary" id="modal-fav-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${storage.isFavorite(movie.id) ? '#ffffff' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span id="modal-fav-text">${storage.isFavorite(movie.id) ? 'In Watchlist' : 'Add to Watchlist'}</span>
            </button>
            <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer ' + (movie.release_date ? movie.release_date.substring(0,4) : ''))}"
               target="_blank" rel="noopener noreferrer" class="btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Watch Trailer
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Set hero background (avoids inline event attributes)
  const hero = overlay.querySelector('#modal-hero');
  hero.style.backgroundImage = `url('${backdropSrc}')`;

  // Handle poster error
  const posterImg = overlay.querySelector('#modal-poster');
  posterImg.addEventListener('error', () => { posterImg.src = getPlaceholderPoster(movie.title); });

  // Close logic
  const close = () => {
    overlay.classList.remove('active');
    document.removeEventListener('keydown', onKeydown);
    setTimeout(() => { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 250);
  };

  const onKeydown = e => { if (e.key === 'Escape') close(); };

  overlay.querySelector('#modal-close-btn').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', onKeydown);

  // Fav button
  overlay.querySelector('#modal-fav-btn').addEventListener('click', () => {
    handleToggleFav(movie);
    const isFav = storage.isFavorite(movie.id);
    overlay.querySelector('#modal-fav-text').textContent = isFav ? 'In Watchlist' : 'Add to Watchlist';
    const svg = overlay.querySelector('#modal-fav-btn svg');
    if (svg) svg.setAttribute('fill', isFav ? '#ffffff' : 'none');
  });

  document.body.appendChild(overlay);
  // Trigger animation on next frame
  requestAnimationFrame(() => overlay.classList.add('active'));
}

// ─── GRID / PAGINATION ────────────────────────────────────────────────────────

function renderGridSection() {
  const section = document.getElementById('grid-section');
  if (!section) return;
  section.innerHTML = '';

  if (!state.movies.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.innerHTML = `
      <div class="empty-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <h3 class="empty-title">No movies found</h3>
      <p class="empty-text">${state.onlyFavorites
        ? "You haven't saved any titles to your Watchlist yet."
        : "Try searching for a different movie or clearing active filters."
      }</p>
      <button id="reset-filter-btn" class="btn-primary" style="margin-top:10px">Reset Filters &amp; Show All</button>
    `;
    empty.querySelector('#reset-filter-btn').addEventListener('click', () => {
      state.search = ''; state.genre = 'all'; state.onlyFavorites = false; state.page = 1;
      loadMovies();
    });
    section.appendChild(empty);
    return;
  }

  const grid = document.createElement('div');
  grid.className = `movies-grid${state.viewMode === 'list' ? ' compact-view' : ''}`;
  state.movies.forEach(movie => grid.appendChild(createMovieCard(movie)));
  section.appendChild(grid);

  if (state.totalPages > 1) {
    const pag = document.createElement('div');
    pag.className = 'pagination-container';
    pag.innerHTML = `
      <button class="page-btn" id="prev-btn" ${state.page <= 1 ? 'disabled' : ''}>&larr; Previous</button>
      <span class="page-info">Page ${state.page} of ${state.totalPages}</span>
      <button class="page-btn" id="next-btn" ${state.page >= state.totalPages ? 'disabled' : ''}>Next &rarr;</button>
    `;
    pag.querySelector('#prev-btn').addEventListener('click', () => {
      if (state.page > 1) { state.page--; loadMovies(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    });
    pag.querySelector('#next-btn').addEventListener('click', () => {
      if (state.page < state.totalPages) { state.page++; loadMovies(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    });
    section.appendChild(pag);
  }
}

// ─── ACTIONS ──────────────────────────────────────────────────────────────────

function handleToggleFav(movie) {
  storage.toggleFavorite(movie);

  const badge = document.getElementById('fav-count-badge');
  if (badge) badge.textContent = storage.getFavorites().length;

  if (state.onlyFavorites) {
    loadMovies();
  } else {
    renderGridSection();
  }
}

function loadMovies() {
  const data = movieService.fetchMovies({
    search: state.search,
    genre: state.genre,
    sort: state.sort,
    onlyFavorites: state.onlyFavorites,
    page: state.page
  });

  state.movies = data.results;
  state.totalPages = data.total_pages;
  state.totalResults = data.total_results;

  renderApp();
}

// ─── MAIN RENDER ─────────────────────────────────────────────────────────────

function renderApp() {
  const app = document.getElementById('app');
  app.className = 'app-layout';
  app.innerHTML = '';

  app.appendChild(renderHeader());

  const main = document.createElement('main');
  main.className = 'main-container';
  main.appendChild(renderStatsBanner());
  main.appendChild(renderFilterBar());

  const gridSection = document.createElement('section');
  gridSection.id = 'grid-section';
  main.appendChild(gridSection);

  app.appendChild(main);

  renderGridSection();
}

// ─── BOOT ─────────────────────────────────────────────────────────────────────

function init() {
  document.documentElement.setAttribute('data-theme', storage.getTheme());
  loadMovies();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
