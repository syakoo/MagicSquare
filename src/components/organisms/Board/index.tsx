import React, { Dispatch } from "react";

import { Cell } from "../../atoms/Cell";
import styles from "./Board.module.scss";

export type IState = "standby" | "playing" | "finished" | "gameover";
export type IBoard = Cell[];

export interface Board {
  state: IState;
  stateBoard: IBoard;
  setStateBoard: Dispatch<IBoard>;
}

export const Board: React.FC<Board> = ({
  state,
  stateBoard,
  setStateBoard
}) => {
  // Cell click event
  const ClickEventHandler = (i: number) => {
    let newState = stateBoard.map((items, index) => {
      if (index === i) {
        items.value = (items.value + 1) % 10;
      }
      return items;
    });
    setStateBoard(newState);
  };

  // Call cell components
  const cells = stateBoard.map((items, index) => {
    return (
      <Cell
        key={index}
        id={index}
        value={items.value}
        type={items.type}
        clickEventHandler={() => ClickEventHandler(index)}
      />
    );
  });

  let rows = [];
  for (let i = 0; i < 3; i++) {
    rows.push(
      <div key={i}>
        {cells[i * 3 + 0]}
        {cells[i * 3 + 1]}
        {cells[i * 3 + 2]}
      </div>
    );
  }

  return (
    <div className={styles.board_outline}>
      <div className={styles.board_body}>
        <div
          className={styles.board_hidden}
          style={state === "playing" ? { display: "none" } : {}}
        ></div>
        {rows}
      </div>
    </div>
  );
};
