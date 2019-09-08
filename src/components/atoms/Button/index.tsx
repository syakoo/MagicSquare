import React from "react";

import styles from "./Button.module.scss";

interface IButton {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isEmpha?: boolean;
}

export const Button: React.FC<IButton> = ({
  label,
  onClick,
  isEmpha = false
}) => {
  return (
    <button
      className={isEmpha ? styles.empha : styles.normal}
      onClick={onClick}
    >
      {label}
    </button>
  );
};


export const WideButton: React.FC<IButton> = ({
  label,
  onClick,
  isEmpha = false
}) => {
  return (
    <button
      className={isEmpha ? styles.wideEmpha : styles.wideNormal}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
