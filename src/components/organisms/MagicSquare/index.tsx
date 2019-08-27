import React, { useState, useEffect } from "react";

import { Board } from "../Board";
import { ScoreBoard } from "../ScoreBoard"
import { useMagicSquare } from "./use";
import styles from "./MagicSquare.module.scss";

export const MagicSquare: React.FC = () => {
  const { state, setState, time, stateBoard, setStateBoard } = useMagicSquare();

  return (
    <div className={styles.table}>
      <ScoreBoard time={parseFloat(time)} state={state} setState={setState}/>
      <h2>{time}</h2>
      <Board
        state={state}
        stateBoard={stateBoard}
        setStateBoard={setStateBoard}
      />
    </div>
  );
};
