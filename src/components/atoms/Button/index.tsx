import React from "react";

import styles from "./Button.module.scss"

interface Button {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isEmpha?: boolean;  
}

export const Button: React.FC<Button> = ({ label, onClick, isEmpha=false }) => {
  return <button className={isEmpha? styles.empha: styles.normal} onClick={onClick}>{label}</button>;
};
