import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/tmdb-api.js";
import styles from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError("");
        const movieReviews = await getMovieReviews(movieId);
        setReviews(movieReviews);
      } catch (err) {
        setError(err.message || "Unable to load reviews.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) {
    return <p className={styles.status}>Loading reviews...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (reviews.length === 0) {
    return <p className={styles.status}>No reviews available.</p>;
  }

  return (
    <ul className={styles.list}>
      {reviews.map((review) => (
        <li className={styles.item} key={review.id}>
          <h3 className={styles.author}>Author: {review.author}</h3>
          <p className={styles.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
