import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList.jsx";
import { searchMovies } from "../../services/tmdb-api.js";
import styles from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const [inputValue, setInputValue] = useState(query);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setInputValue(query);

    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const foundMovies = await searchMovies(query);
        setMovies(foundMovies);
      } catch (err) {
        setError(err.message || "Unable to search movies.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextQuery = inputValue.trim();

    if (nextQuery) {
      setSearchParams({ query: nextQuery });
    } else {
      setSearchParams({});
    }
  };

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="query"
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Search movies"
          type="text"
          value={inputValue}
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>

      {isLoading && <p className={styles.status}>Searching movies...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {query && !isLoading && !error && movies.length === 0 && (
        <p className={styles.status}>No movies found for "{query}".</p>
      )}
    </section>
  );
}
