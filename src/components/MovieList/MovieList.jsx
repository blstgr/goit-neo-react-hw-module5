import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li className={styles.item} key={movie.id}>
          <Link
            className={styles.link}
            state={location}
            to={`/movies/${movie.id}`}
          >
            {movie.title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
