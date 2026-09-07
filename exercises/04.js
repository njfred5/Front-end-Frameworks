// ## Part 1 — Variables, Arrow Functions, Destructuring, Spread
// ### Exercise 4 — Destructuring Objects

const movie = {
  title: "Inception",
  year: 2010,
  rating: 8.8,
  genres: ["Action", "Sci-Fi", "Thriller"],
  director: {
    name: "Christopher Nolan",
    nationality: "British",
  },
};

// 1. Destructure title, year, and rating in one line.
const { title, year, rating } = movie;

// 2. Destructure director.name using nested destructuring.
const { director: { name: directorName } } = movie;

// 3. Destructure title, and rename it to movieTitle.
const { title: movieTitle } = movie;

// 4. Destructure a field that does not exist: tagline.
//    Give it a default value of "No tagline available".
const { tagline = "No tagline available" } = movie;

// 5. Rewrite this function using destructuring in the parameter list:
function printMovie({ title, year }) {
  console.log(title, year);
}

printMovie(movie); // "Inception" 2010
