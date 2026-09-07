// ## Part 1 — Variables, Arrow Functions, Destructuring, Spread
// ### Exercise 6 — Spread and Rest

const watchlist = ["Inception", "Interstellar"];
const newMovies = ["Tenet", "Oppenheimer"];

// 1. Create a new array that combines watchlist and newMovies. Do not mutate either.
const combined = [...watchlist, ...newMovies];

// 2. Create a new array with "Dune" at the beginning of watchlist. Do not mutate watchlist.
const withDune = ["Dune", ...watchlist];

// 3. Create a shallow copy of watchlist.
const copy = [...watchlist];

// 4. Merge these two objects into one new object:
const baseInfo = { title: "Dune", year: 2021, rating: 8.0 };
const extraInfo = { genre: "Sci-Fi" };
const merged = { ...baseInfo, ...extraInfo };

// 5. Create a new object based on baseInfo, but with rating set to 9.0:
const updated = { ...baseInfo, rating: 9.0 };

// 6. Write a function logMovies that accepts any number of movie titles and logs each one.
const logMovies = (...titles) => {
  titles.forEach(title => console.log(title));
};

console.log(combined);   // ["Inception", "Interstellar", "Tenet", "Oppenheimer"]
console.log(withDune);   // ["Dune", "Inception", "Interstellar"]
console.log(copy);       // ["Inception", "Interstellar"]
console.log(merged);     // { title: "Dune", year: 2021, rating: 8.0, genre: "Sci-Fi" }
console.log(updated);    // { title: "Dune", year: 2021, rating: 9.0 }
console.log(watchlist);  // ["Inception", "Interstellar"]
console.log(newMovies);  // ["Tenet", "Oppenheimer"]

logMovies("Inception", "Dune", "Tenet");
