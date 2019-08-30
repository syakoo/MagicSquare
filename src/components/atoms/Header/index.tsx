import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import logo from "../../../assets/icons/logo.svg";

export const Header: React.FC<{}> = () => {
  return (
    <header className={styles.header}>
      <div className={styles.div}>
        <img className={styles.logo} src={logo} alt="logo"></img>
        <Link to="/" className={styles.app_title}>
          Magic Square
        </Link>
      </div>
    </header>
  );
};
