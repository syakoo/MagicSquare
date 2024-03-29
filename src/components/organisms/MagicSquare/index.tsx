import React from "react";
import useReactRouter from "use-react-router";

import { BalloonButton } from "../../atoms/BalloonButtom";
import { Board } from "../Board";
import { GameOver } from "../../molecules/GameOver";
import { ScoreBoard } from "../ScoreBoard";
import { useMagicSquare } from "./use";
import styles from "./MagicSquare.module.scss";
import { Timer } from "../Timer";
import { Imode } from "../../../types";

export const MagicSquare: React.FC<{mode: Imode}> = React.memo(({mode}) => {
  // console.log("render MagicSuare");
  const {
    state,
    setState,
    time,
    setTime,
    stateBoard,
    setStateBoard
  } = useMagicSquare(mode);
  const { history } = useReactRouter();

  return (
    <div className={styles.table}>
      <GameOver isDisplay={state === "gameover"} setState={setState} />
      <ScoreBoard
        time={parseFloat(time)}
        isDisplay={state === "finished"}
        setState={setState}
        mode={mode}
      />
      <Timer state={state} setState={setState} setTime={setTime} />
      <Board
        state={state}
        stateBoard={stateBoard}
        setStateBoard={setStateBoard}
      />
      <div>
        <BalloonButton
          label="Restart"
          onClick={() => {
            setState("standby");
          }}
          isEmpha={false}
          LorR="left"
        ></BalloonButton>
        <BalloonButton
          label="Ranking"
          onClick={() => {
            history.push("/");
          }}
          isEmpha={true}
          LorR="right"
        ></BalloonButton>
      </div>
    </div>
  );
});
