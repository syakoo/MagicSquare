import React, { useEffect } from "react";
import useReactRouter from "use-react-router";

import { Header } from "../../atoms/Header";
import styles from "./Template.module.scss";

export const PageTemplate: React.FC<{}> = ({ children }) => {
  const { location } = useReactRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <Header />
      <div className={styles.body}>{children}</div>
    </div>
  );
};
