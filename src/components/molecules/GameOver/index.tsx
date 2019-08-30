import React, {Dispatch} from "react";

import { Button } from "../../atoms/Button";
import { IState } from "../../organisms/Board";
import styles from "./GameOver.module.scss";

interface IGameOver {
  state: IState;
  setState: Dispatch<IState>;
}

export const GameOver: React.FC<IGameOver> = ({
  state,
  setState
}) => {
  return (
    <div
      className={styles.all}
      style={state === "gameover" ? {} : { display: "none" }}
    >
      <div className={styles.body}>
        <div className={styles.title}>ゲームオーバー!!</div>
        <Button label="もう一度" onClick={() => setState("standby")}></Button>
      </div>
    </div>
  );
};
