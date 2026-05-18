import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const getLinkClassName = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.active}` : styles.link;

export default function Navigation() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink className={getLinkClassName} end to="/">
          Home
        </NavLink>
        <NavLink className={getLinkClassName} to="/movies">
          Movies
        </NavLink>
      </nav>
    </header>
  );
}
