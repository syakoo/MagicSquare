import React from "react";
import useReactRouter from "use-react-router";

import {BalloonButton} from "../../atoms/BalloonButtom";
import { Board } from "../Board";
import { GameOver } from "../../molecules/GameOver";
import { ScoreBoard } from "../ScoreBoard"
import { useMagicSquare } from "./use";
import styles from "./MagicSquare.module.scss";

export const MagicSquare: React.FC = () => {
  const { state, setState, time, stateBoard, setStateBoard } = useMagicSquare();
  const { history } = useReactRouter();

  const timerIcon = (state==="playing")? "■ ": "▶ ";

  // console.log(timerIcon);

  return (
    <div className={styles.table}>
      <GameOver state={state} setState={setState}/>
      <ScoreBoard time={parseFloat(time)} state={state} setState={setState}/>
      <div className={styles.time}><span>{timerIcon}</span>{time}</div>
      <Board
        state={state}
        stateBoard={stateBoard}
        setStateBoard={setStateBoard}
      />
      <div>
      <BalloonButton label="Restart" onClick={()=>{setState("standby")}} isEmpha={false} LorR="left"></BalloonButton>
      <BalloonButton label="Ranking" onClick={()=>{history.push("/")}} isEmpha={true} LorR="right"></BalloonButton>
      </div>
    </div>
  );
};
