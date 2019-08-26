import React, { useState, Dispatch } from "react";

import { Button } from "../../atoms/Button";
import { IState } from "../Board";
import styles from "./ScoreBoard.module.scss";

interface IScoreBoard {
  time: number;
  state: IState;
  setState: Dispatch<IState>;
}

export const ScoreBoard: React.FC<IScoreBoard> = ({
  time,
  state,
  setState
}) => {
  const [name, setName] = useState<string>("Guest");

  return (
    <div className={styles.all} style={state === "finished" ? {} : { display: "none" }}>
      <div className={styles.body}>
        <h1>ゲームクリア!!</h1>
        <h2>Time : {time}</h2>

        <Button label="もう一度" onClick={() => setState("standby")}></Button>
      </div>
    </div>
  );
};
