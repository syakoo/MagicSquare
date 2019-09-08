import React, { Dispatch } from "react";

import { Button } from "../../atoms/Button";
import { IState } from "../../../types";
import styles from "./GameOver.module.scss";

interface IGameOver {
  isDisplay: boolean;
  setState: Dispatch<IState>;
}

export const GameOver: React.FC<IGameOver> = React.memo(
  ({ isDisplay, setState }) => {
    // console.log("render GameOver");
    return (
      <div
        className={styles.all}
        style={isDisplay ? {} : { display: "none" }}
      >
        <div className={styles.body}>
          <div className={styles.title}>Game Over</div>
          <Button label="もう一度" onClick={() => setState("standby")}></Button>
        </div>
      </div>
    );
  }
);
