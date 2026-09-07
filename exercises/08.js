// ## Part 2 — Modules, Array Methods, async/await, Optional Chaining
// ### Exercise 8 — async/await
// Run this file in the browser console or with Node 18+.

const BASE_URL = "https://jsonplaceholder.typicode.com";

// 1. Write an async function fetchPosts() that:
//    - fetches BASE_URL + "/posts"
//    - parses the JSON response
//    - returns the first 5 items
//    - logs each item's title

// 2. Add try/catch to fetchPosts().
//    If the fetch fails, log "Failed to load posts".

async function fetchPosts() {
  try {
    // Fetch the posts
    const res = await fetch(BASE_URL + "/posts");

    // Parse JSON
    const data = await res.json();

    // Take first 5 items
    const firstFive = data.slice(0, 5);

    // Log each title
    firstFive.forEach(post => {
      console.log(post.title);
    });

    // Return first 5 posts
    return firstFive;

  } catch (err) {
    console.log("Failed to load posts");
  }
}

// 3. Write an async function getPostById(id) that:
//    - fetches BASE_URL + "/posts/" + id
//    - throws an Error if res.ok is false
//    - returns the parsed JSON object

async function getPostById(id) {
  try {
    // Fetch the specific post
    const res = await fetch(BASE_URL + "/posts/" + id);

    // If response is not OK, throw an error
    if (!res.ok) {
      throw new Error("Post not found");
    }

    // Parse JSON and return it
    return await res.json();

  } catch (err) {
    // Log the error for debugging
    console.log("Error:", err.message);

    // IMPORTANT: rethrow so the promise REJECTS (Vitest requires this)
    throw err;
  }
}

// Call getPostById(1) and log the result.
getPostById(1)
  .then(post => console.log("Post 1:", post))
  .catch(err => console.log("Handled:", err.message));

// Call getPostById(99999) — what happens? Handle it.
getPostById(99999)
  .then(post => console.log("Post 99999:", post))
  .catch(err => console.log("Handled:", err.message));
