import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getImageUrl, getMovieDetails } from "../../services/tmdb-api.js";
import styles from "./MovieDetailsPage.module.css";

const getNavLinkClassName = ({ isActive }) =>
  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError("");
        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (err) {
        setError(err.message || "Unable to load movie details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const releaseYear = movie?.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;
  const posterUrl = getImageUrl(movie?.poster_path);
  const userScore = movie ? Math.round(movie.vote_average * 10) : null;

  return (
    <section className={styles.section}>
      <Link className={styles.backLink} to={backLinkRef.current}>
        Go back
      </Link>

      {isLoading && <p className={styles.status}>Loading movie details...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {movie && (
        <>
          <div className={styles.details}>
            {posterUrl && (
              <img
                alt={movie.title}
                className={styles.poster}
                src={posterUrl}
              />
            )}
            <div className={styles.content}>
              <h1 className={styles.title}>
                {movie.title}
                {releaseYear && <span> ({releaseYear})</span>}
              </h1>
              <p className={styles.score}>User score: {userScore}%</p>

              <h2 className={styles.heading}>Overview</h2>
              <p className={styles.text}>{movie.overview}</p>

              <h2 className={styles.heading}>Genres</h2>
              <p className={styles.text}>
                {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
            </div>
          </div>

          <div className={styles.additional}>
            <h2 className={styles.heading}>Additional information</h2>
            <nav className={styles.nestedNav}>
              <NavLink className={getNavLinkClassName} to="cast">
                Cast
              </NavLink>
              <NavLink className={getNavLinkClassName} to="reviews">
                Reviews
              </NavLink>
            </nav>
          </div>

          <Outlet />
        </>
      )}
    </section>
  );
}
