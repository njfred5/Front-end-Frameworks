// ## Part 2 — Modules, Array Methods, async/await, Optional Chaining
// ### Exercise 7 — Array Methods

const movies = [
  { title: "Inception",       rating: 8.8, genre: "Sci-Fi",   year: 2010 },
  { title: "The Dark Knight", rating: 9.0, genre: "Action",   year: 2008 },
  { title: "Interstellar",    rating: 8.6, genre: "Sci-Fi",   year: 2014 },
  { title: "Parasite",        rating: 8.5, genre: "Thriller", year: 2019 },
  { title: "1917",            rating: 8.3, genre: "War",       year: 2019 },
  { title: "Tenet",           rating: 7.3, genre: "Sci-Fi",   year: 2020 },
];

// 1. Get an array of just the movie titles.
const titles = movies.map(movie=>movie.title);

// 2. Get all Sci-Fi movies.
const sciFiMovies = movies.filter(movie => movie.genre==="Sci-Fi");

// 3. Get all movies rated 8.5 or above.
const highRated = movies.filter(movie => movie.rating>=8.5);

// 4. Find the movie titled "Parasite".
const parasite = movies.find(movie=> movie.title==="Parasite");

// 5. Check if any movie has a rating above 9.5.
const hasOver9_5 = movies.some(movie=>movie.rating>9.5);

// 6. Get the titles of all Sci-Fi movies rated above 8.0 (chain filter and map).
const sciFiTitles = movies
.filter(movie=>movie.rating>8.0 && movie.genre==="Sci-Fi")
.map(movie=>movie.title);


// 7. Build a string listing all titles separated by " | "
//    Expected: "Inception | The Dark Knight | Interstellar | ..."
const titleString = movies.map(movie=>movie.title).join(" | ");

// 8. Sort movies by rating descending (highest first).
//    Note: sort() mutates the original array. Use [...movies].sort(...) to sort a copy instead.
const sorted = [...movies].sort((a, b) => b.rating - a.rating);

console.log(movies); // should be unchanged after all operations above
