// ## Part 2 — Modules, Array Methods, async/await, Optional Chaining
// ### Exercise 9 — Optional Chaining and Nullish Coalescing

const movie1 = {
  title: "Inception",
  tagline: "Your mind is the scene of the crime.",
  director: { name: "Christopher Nolan" },
  cast: [{ name: "Leonardo DiCaprio" }, { name: "Elliot Page" }],
};

const movie2 = {
  title: "Unknown Film",
  tagline: "",
  // no director, no cast
};

// 1. Safely access movie2.director.name — should return undefined, not throw.
const directorName = movie2.director?.name;
console.log("1.", directorName); // undefined

// 2. Display the tagline of movie2, or "No tagline" if it is empty or missing.
//    Use ||, not ?? because tagline is "" (empty string), which is falsy.
const tagline = movie2.tagline || "No tagline";
console.log("2.", tagline); // "No tagline"

// 3. Safely get the name of the first cast member of movie2.
//    Should return undefined, not throw.
const firstCastName = movie2.cast?.[0]?.name;
console.log("3.", firstCastName); // undefined

// 4. Display the first cast member's name of movie2, or "Unknown cast" as fallback.
//    Combine ?. and ?? — fallback only when value is null or undefined.
const castName = movie2.cast?.[0]?.name ?? "Unknown cast";
console.log("4.", castName); // "Unknown cast"

// 5. Write a function formatPosterUrl(movie) that:
//    - returns the full TMDB poster URL if movie.poster_path exists and is not null
//    - returns a placeholder URL otherwise
//    TMDB poster format : https://image.tmdb.org/t/p/w500{poster_path}
//    Placeholder        : https://placehold.co/500x750?text=No+Image

function formatPosterUrl(movie) {
  const path = movie.poster_path;

  // If path exists and is truthy, return TMDB URL
  // Otherwise return placeholder
  return path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : "https://placehold.co/500x750?text=No+Image";
}

const tmdbMovie        = { title: "Inception", poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg" };
const tmdbMovieNoPoster = { title: "Obscure Film", poster_path: null };

console.log("5a.", formatPosterUrl(tmdbMovie));         
// https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg

console.log("5b.", formatPosterUrl(tmdbMovieNoPoster)); 
// https://placehold.co/500x750?text=No+Image
