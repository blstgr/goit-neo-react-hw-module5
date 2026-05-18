import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImageUrl, getMovieCredits } from "../../services/tmdb-api.js";
import styles from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        setError("");
        const movieCast = await getMovieCredits(movieId);
        setCast(movieCast);
      } catch (err) {
        setError(err.message || "Unable to load cast.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) {
    return <p className={styles.status}>Loading cast...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (cast.length === 0) {
    return <p className={styles.status}>No cast information available.</p>;
  }

  return (
    <ul className={styles.list}>
      {cast.map((actor) => (
        <li className={styles.card} key={actor.cast_id || actor.credit_id}>
          {actor.profile_path && (
            <img
              alt={actor.name}
              className={styles.photo}
              src={getImageUrl(actor.profile_path, "w185")}
            />
          )}
          <div className={styles.info}>
            <p className={styles.name}>{actor.name}</p>
            <p className={styles.character}>Character: {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
