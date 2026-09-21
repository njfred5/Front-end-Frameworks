/**
 * Milestone 1 — Props, State, and the useState Hook
 *
 * These tests verify the Session 2 learning objectives:
 *   1. Components render data received via props
 *   2. useState produces visible UI changes (favourite toggle)
 *   3. Controlled inputs delegate state ownership to the parent
 *   4. App composes components and filters the movie list reactively
 *
 * Run locally: npm run test:run
 * Run with detail: npm run test:run:verbose
 *
 * NOTE: If an import below fails, the file does not exist yet.
 * Create the missing component and re-run the tests.
 *
 * SESSION BOUNDARY: These tests are graded after Session 2.
 * After Session 5, MovieCard reads from AppContext and the MovieCard isolation
 * tests below will fail when run together with the other milestones.
 * Use `npm run test:m1` to run this file in isolation.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// These imports will produce clear errors if the files are missing —
// that error message tells you exactly which component to create next.
import MovieCard from "../components/MovieCard";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import App from "../App";
import type { Movie } from "../types";

// ── Shared test fixtures ──────────────────────────────────────────────────────

const MOCK_MOVIE: Movie = {
  id: 1,
  title: "Inception",
  overview:
    "A thief who steals corporate secrets through dream-sharing technology.",
  poster_path: "/inception.jpg",
  backdrop_path: null,
  release_date: "2010-07-16",
  vote_average: 8.8,
  vote_count: 25000,
  popularity: 100.0,
  genre_ids: [28, 878, 53],
  adult: false,
};

const MOCK_MOVIES: Movie[] = [
  { ...MOCK_MOVIE, id: 1, title: "Inception" },
  { ...MOCK_MOVIE, id: 2, title: "Interstellar" },
  { ...MOCK_MOVIE, id: 3, title: "The Dark Knight" },
];

// ── MovieCard — props and rendering ──────────────────────────────────────────

describe("MovieCard — rendering data from props", () => {
  it("renders the movie title", () => {
    render(<MovieCard movie={MOCK_MOVIE} />);
    expect(screen.getByText("Inception")).toBeInTheDocument();
  });

  it("renders the vote_average formatted to one decimal place", () => {
    render(<MovieCard movie={MOCK_MOVIE} />);
    // vote_average 8.8 → displayed as "8.8"
    expect(screen.getByText(/8\.8/)).toBeInTheDocument();
  });

  it("renders a poster image element", () => {
    render(<MovieCard movie={MOCK_MOVIE} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("uses the movie title in the poster image alt text", () => {
    render(<MovieCard movie={MOCK_MOVIE} />);
    expect(screen.getByAltText(/Inception/i)).toBeInTheDocument();
  });

  it("renders a fallback image src when poster_path is null", () => {
    const noPoster: Movie = { ...MOCK_MOVIE, poster_path: null };
    render(<MovieCard movie={noPoster} />);
    const img = screen.getByRole("img");
    // When poster_path is null, the src must NOT contain the TMDB path
    expect(img.getAttribute("src")).not.toContain("/inception.jpg");
  });

  it("renders a TMDB CDN src when poster_path is provided", () => {
    render(<MovieCard movie={MOCK_MOVIE} />);
    const img = screen.getByRole("img");
    // getPosterUrl builds a URL containing the poster path
    expect(img.getAttribute("src")).toContain("/inception.jpg");
  });
});

// ── MovieCard — favourite toggle (useState) ───────────────────────────────────

describe("MovieCard — favourite toggle (useState)", () => {
  it("renders a favourite button in the initial unfavourited state", () => {
    render(<MovieCard movie={MOCK_MOVIE} />);
    // The button must exist and signal "add" action before any interaction
    expect(
      screen.getByRole("button", { name: /add to favourites/i }),
    ).toBeInTheDocument();
  });

  it('changes to "remove" label after a single click', () => {
    render(<MovieCard movie={MOCK_MOVIE} />);
    fireEvent.click(screen.getByRole("button", { name: /add to favourites/i }));
    expect(
      screen.getByRole("button", { name: /remove from favourites/i }),
    ).toBeInTheDocument();
  });

  it('toggles back to "add" label after clicking twice', () => {
    render(<MovieCard movie={MOCK_MOVIE} />);
    fireEvent.click(screen.getByRole("button", { name: /add to favourites/i }));
    fireEvent.click(
      screen.getByRole("button", { name: /remove from favourites/i }),
    );
    expect(
      screen.getByRole("button", { name: /add to favourites/i }),
    ).toBeInTheDocument();
  });

  it("each card instance maintains its own independent favourite state", () => {
    // Render two cards side by side
    render(
      <>
        <MovieCard movie={{ ...MOCK_MOVIE, id: 1, title: "Inception" }} />
        <MovieCard movie={{ ...MOCK_MOVIE, id: 2, title: "Interstellar" }} />
      </>,
    );

    const [firstBtn, secondBtn] = screen.getAllByRole("button", {
      name: /add to favourites/i,
    });

    // Toggle only the first card
    fireEvent.click(firstBtn);

    // First card is now "remove"
    expect(firstBtn).toHaveAccessibleName(/remove from favourites/i);
    // Second card is still "add" — state is independent
    expect(secondBtn).toHaveAccessibleName(/add to favourites/i);
  });
});

// ── MovieList — list rendering ────────────────────────────────────────────────

describe("MovieList — rendering a list of movies", () => {
  it("renders all movies passed via the movies prop", () => {
    render(<MovieList movies={MOCK_MOVIES} />);
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("Interstellar")).toBeInTheDocument();
    expect(screen.getByText("The Dark Knight")).toBeInTheDocument();
  });

  it("renders the correct number of movie cards", () => {
    render(<MovieList movies={MOCK_MOVIES} />);
    // Each MovieCard renders the movie title — count how many appear
    const titles = screen.getAllByRole("heading", { level: 2 });
    expect(titles).toHaveLength(3);
  });

  it("renders an empty-state message when the movies array is empty", () => {
    render(<MovieList movies={[]} />);
    // The guide specifies: <p>No movies found.</p>
    expect(screen.getByText(/no movies/i)).toBeInTheDocument();
  });

  it("renders no movie titles when the movies array is empty", () => {
    render(<MovieList movies={[]} />);
    expect(screen.queryByText("Inception")).not.toBeInTheDocument();
  });

  it("renders a new movie title when a new item is added to the list", () => {
    const extra: Movie = { ...MOCK_MOVIE, id: 99, title: "Tenet" };
    render(<MovieList movies={[...MOCK_MOVIES, extra]} />);
    expect(screen.getByText("Tenet")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(4);
  });
});

// ── SearchBar — controlled input ──────────────────────────────────────────────

describe("SearchBar — controlled input", () => {
  it("renders a text input", () => {
    render(<SearchBar query="" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("displays the value passed via the value prop", () => {
    render(<SearchBar query="avatar" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("avatar");
  });

  it("calls onChange with the typed string when the input changes", () => {
    const handleChange = vi.fn();
    render(<SearchBar query="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "inception" },
    });
    expect(handleChange).toHaveBeenCalledWith("inception");
  });

  it("calls onChange exactly once per change event", () => {
    const handleChange = vi.fn();
    render(<SearchBar query="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("reflects a new value prop without maintaining stale internal state", () => {
    const { rerender } = render(<SearchBar query="old" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("old");

    rerender(<SearchBar query="new" onChange={() => {}} />);
    expect(screen.getByRole("textbox")).toHaveValue("new");
  });
});

// ── App — integration ─────────────────────────────────────────────────────────

describe("App — integration (search and filter)", () => {
  it("renders a top-level heading", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders a search input", () => {
    render(<App />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders at least one movie card on initial load", () => {
    render(<App />);
    const movieTitles = screen.getAllByRole("heading", { level: 2 });
    expect(movieTitles.length).toBeGreaterThanOrEqual(1);
  });

  it('shows "Avatar: The Way of Water" from the sample data', () => {
    render(<App />);
    expect(screen.getByText(/Avatar: The Way of Water/i)).toBeInTheDocument();
  });

  it('shows "John Wick: Chapter 4" from the sample data', () => {
    render(<App />);
    expect(screen.getByText(/John Wick/i)).toBeInTheDocument();
  });

  it("reduces the visible movie count when a search query is entered", () => {
    render(<App />);
    const totalBefore = screen.getAllByRole("heading", { level: 2 }).length;

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Avatar" },
    });

    const totalAfter = screen.getAllByRole("heading", { level: 2 }).length;
    expect(totalAfter).toBeLessThan(totalBefore);
  });

  it("only shows movies matching the search query", () => {
    render(<App />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "John Wick" },
    });
    expect(screen.getByText(/John Wick/i)).toBeInTheDocument();
    expect(screen.queryByText(/Ant-Man/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Avatar/i)).not.toBeInTheDocument();
  });

  it("search is case-insensitive", () => {
    render(<App />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "AVATAR" },
    });
    expect(screen.getByText(/Avatar: The Way of Water/i)).toBeInTheDocument();
  });

  it("restores all movies when the search query is cleared", () => {
    render(<App />);
    const initialCount = screen.getAllByRole("heading", { level: 2 }).length;

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Avatar" },
    });
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "" } });

    const restoredCount = screen.getAllByRole("heading", { level: 2 }).length;
    expect(restoredCount).toBe(initialCount);
  });

  it("shows the empty state when no movies match the query", () => {
    render(<App />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "xyzxyz_no_possible_match" },
    });
    expect(screen.queryAllByRole("heading", { level: 2 })).toHaveLength(0);
    expect(screen.getByText(/no movies/i)).toBeInTheDocument();
  });
});
