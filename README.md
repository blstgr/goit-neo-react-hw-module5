# Movie Search

React homework project for Topic 10: routing. The app searches movies by title and shows trending movies, movie details, cast, and reviews using the TMDB API.

## Links

- Source code: https://github.com/blstgr/goit-neo-react-hw-module5
- Live page: https://goit-neo-react-hw-module5-silk-rho.vercel.app

## Technologies

- Vite
- React
- React Router
- Axios
- CSS Modules

## Routes

- `/` - home page with today's trending movies
- `/movies` - movie search page
- `/movies/:movieId` - movie details page
- `/movies/:movieId/cast` - movie cast nested route
- `/movies/:movieId/reviews` - movie reviews nested route
- `*` - not found page with a link back home

## Features

- Trending movie list on the home page
- Movie search by keyword with URL search parameters
- Movie details with poster, overview, score, and genres
- Nested cast and reviews sections
- Back navigation to the previous page
- Lazy-loaded route components with `React.lazy` and `Suspense`
- Loading and error states for API requests

## Project Structure

```text
src/
  components/
    App/
    MovieCast/
    MovieList/
    MovieReviews/
    Navigation/
  pages/
    HomePage/
    MovieDetailsPage/
    MoviesPage/
    NotFoundPage/
  services/
    tmdb-api.js
```

Each component and page has its own folder with a `.jsx` file and matching `.module.css` file.

## Environment Variables

The app requires a TMDB API Read Access Token.

Create a `.env.local` file in the project root:

```env
VITE_TMDB_TOKEN=your_tmdb_api_read_access_token
```

The token can be found in your TMDB account settings under API.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Format the code:

```bash
npm run format
```
