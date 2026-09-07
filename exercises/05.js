// ## Part 1 — Variables, Arrow Functions, Destructuring, Spread
// ### Exercise 5 — Destructuring Arrays

const genres = ["Action", "Sci-Fi", "Thriller"];

// 1. Destructure only the first genre.
const [firstGenre] = genres;

// 2. Destructure the first and third genre (skip the second — leave the slot empty with a comma).
const [first, , third] = genres;

// 3. Destructure the first genre, and collect the rest into a variable called remainingGenres.
const [mainGenre, ...remainingGenres] = genres;

// 4. Swap these two variables without a temp variable:
let a = "Action";
let b = "Comedy";
// Swap a and b using array destructuring.
[a, b] = [b, a];

console.log(genres);          // ["Action", "Sci-Fi", "Thriller"] — should be unchanged
console.log(a, b);            // "Comedy" "Action" after the swap
