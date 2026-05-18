import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList.jsx";
import { getTrendingMovies } from "../../services/tmdb-api.js";
import styles from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies);
      } catch (err) {
        setError(err.message || "Unable to load trending movies.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Trending today</h1>
      {isLoading && <p className={styles.status}>Loading movies...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </section>
  );
}
