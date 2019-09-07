import React from "react";

import styles from "./Loading.module.scss";

export const Loading: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return isLoading ? <div className={styles.loading}>Loading</div> : null;
};
