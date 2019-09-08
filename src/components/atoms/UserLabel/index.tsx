import React from "react";

import styles from "./UserLabel.module.scss";

export const UserLabel: React.FC<{ userName: string }> = React.memo(
  ({ userName }) => {
    return <div className={styles.user}>{userName}</div>;
  }
);
