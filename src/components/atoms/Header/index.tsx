import React from "react";
import { Link } from "react-router-dom";

import { UserLabel } from "../UserLabel";
import { getUserName } from "../../../logics/util/user";
import styles from "./Header.module.scss";
import logo from "../../../assets/icons/logo.svg";
import help from "../../../assets/icons/help.svg";

export const Header: React.FC<{}> = () => {
  // console.log("render Header");
  return (
    <>
      <header className={styles.fixed}>
        <div className={styles.header}>
          <div className={styles.div}>
            <img className={styles.logo} src={logo} alt="logo"></img>
            <Link to="/" className={styles.app_title}>
              Magic Square
            </Link>
            <Link to="/help" className={styles.help} title="help">
              <img src={help} alt="help"></img>
            </Link>
          </div>
        </div>
        <UserLabel userName={getUserName()}></UserLabel>
      </header>
    </>
  );
};
