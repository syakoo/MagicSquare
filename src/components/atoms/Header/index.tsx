import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";

export const Header: React.FC<{}> = () => {
  return (
    <header className={styles.header}>
      <div>
        <Link to="/" className={styles.app_title}>Magic Square</Link>
      </div>
    </header>
  );
};
