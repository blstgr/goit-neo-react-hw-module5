import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.text}>
        The page you are looking for does not exist.
      </p>
      <Link className={styles.link} to="/">
        Go home
      </Link>
    </section>
  );
}
