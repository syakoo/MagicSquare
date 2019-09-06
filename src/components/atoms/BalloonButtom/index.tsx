import React from "react";

import styles from "./BalloonButton.module.scss";

interface IBalloonButton {
  label: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  isEmpha?: boolean;
  LorR?: "left" | "right";
}

export const BalloonButton: React.FC<IBalloonButton> = ({
  label,
  onClick,
  isEmpha = false,
  LorR = "left"
}) => {
  return (
    <div
      className={
        (isEmpha ? styles.empha : styles.normal) +
        " " +
        (LorR === "left" ? styles.left : styles.right)
      }
    >
      <button onClick={onClick}>{label}</button>
    </div>
  );
};
