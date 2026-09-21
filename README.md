# Movie App

EPITA Bachelor in Computer Science — S5
Front-End Frameworks (2627_BSI_CS_S05_PROG_FEF)

---

This branch introduces **data fetching from the TMDB API**. You will fetch a list of popular movies and start rendering them as React components.

---

## Prerequisites

- Node.js 18 or higher — https://nodejs.org
- A free TMDB account and API key — https://www.themoviedb.org/settings/api

---

## Setup

**1. Install dependencies**
```bash
npm install
```

**2. Configure environment variables**
```bash
cp .env.example .env
```
Open `.env` and set `VITE_TMDB_API_KEY` to your **API Read Access Token** (the long Bearer token from TMDB Settings → API).

**3. Add the submission secret**

Go to your repo on GitHub → **Settings → Secrets and variables → Actions → New repository secret**
- Name: `SHEETS_WEBHOOK_URL`
- Value: *(provided by your teacher via Teams)*

**4. Start the dev server**
```bash
npm run dev
```

App runs at http://localhost:5173

---

## TMDB API

All requests are authenticated with a Bearer token in the `Authorization` header.

### Endpoint used in this branch

```
GET https://api.themoviedb.org/3/movie/popular
```

| Parameter  | Type    | Default | Description         |
|------------|---------|---------|---------------------|
| `language` | string  | `en-US` | Response language   |
| `page`     | integer | `1`     | Page number         |
| `region`   | string  | —       | ISO-3166-1 country  |

### Response shape

```json
{
  "page": 1,
  "results": [ /* array of movie objects */ ],
  "total_pages": 38029,
  "total_results": 760569
}
```

### Movie object fields

| Field               | Type      | Description                          |
|---------------------|-----------|--------------------------------------|
| `id`                | integer   | Unique TMDB movie ID                 |
| `title`             | string    | Movie title                          |
| `overview`          | string    | Plot summary                         |
| `release_date`      | string    | `YYYY-MM-DD`                         |
| `poster_path`       | string    | Poster image path (see below)        |
| `backdrop_path`     | string    | Backdrop image path                  |
| `vote_average`      | number    | Rating out of 10                     |
| `vote_count`        | integer   | Number of votes                      |
| `popularity`        | number    | TMDB popularity score                |
| `genre_ids`         | integer[] | Array of genre IDs                   |
| `original_language` | string    | Original language code               |

### Building image URLs

Poster and backdrop paths are relative. Prepend the image base URL and a size:

```
https://image.tmdb.org/t/p/w500{poster_path}
```

Common sizes: `w185`, `w342`, `w500`, `w780`, `original`.

---

## Available Scripts

```bash
npm run dev              # Start dev server
npm run build            # Type-check + production build
npm run lint             # Run ESLint
npm run type-check       # TypeScript check
npm run test:run         # Run tests once
npm run test:run:verbose # Run tests with per-test detail
npm run test             # Watch mode
```

---

## Submitting

Each milestone has its own tag. Push the tag for the milestone you are submitting to trigger the automated test run on GitHub Actions.

| Milestone | Tag |
|-----------|-----|
| Milestone 1 — Props, State, useState | `milestone-1` |
| Milestone 2 — Routing & API | `milestone-2` |
| Milestone 3 — Complete SPA | `milestone-3` |

```bash
git add .
git commit -m "Milestone 1 submission"
git tag milestone-1
git push origin milestone-1
```

> **Important:** Tags are unique — you cannot push the same tag twice. To resubmit, delete the old tag first:
> ```bash
> git tag -d milestone-1
> git push origin --delete milestone-1
> git tag milestone-1 && git push origin milestone-1
> ```

---

## Tech Stack

| Tool                | Purpose                              |
|---------------------|--------------------------------------|
| React 18            | UI library                           |
| React Router 6      | Client-side routing (later branches) |
| TypeScript 5        | Static typing                        |
| Vite 5              | Build tool and dev server            |
| Vitest + Testing Library | Test runner                   |
| TMDB API v3         | Movie data                           |
