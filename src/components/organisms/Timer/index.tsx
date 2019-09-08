import React, { Dispatch, useEffect, useState } from "react";

import { IState } from "../../../types";
import styles from "./Timer.module.scss";

let startTime = 0;
let intervalId: NodeJS.Timeout[] = [];
const clearAllInterval = (
  intervalIdArray: NodeJS.Timeout[]
): NodeJS.Timeout[] => {
  intervalIdArray.forEach(target => {
    clearInterval(target);
  });
  return [];
};

function* readyCount() {
  yield "3";
  yield "2";
  yield "1";
}

interface ITimer extends React.Props<{}> {
  state: IState;
  setState: Dispatch<IState>;
  setTime: Dispatch<string>;
}

export const Timer: React.FC<ITimer> = React.memo(
  ({ state, setState, setTime }) => {
    // console.log("render Timer");
    const [stopWatch, setStopWatch] = useState<string>("0");

    useEffect(() => {
      switch (state) {
        case "standby":
          intervalId = clearAllInterval(intervalId);
          let readyCounter = readyCount();
          let id = setInterval(() => {
            let val = readyCounter.next();
            if (!val.done) {
              setStopWatch(val.value);
            } else {
              startTime = Date.now();
              setState("playing");
              clearInterval(id);
            }
          }, 1000);
          break;
        case "playing":
          intervalId.push(
            setInterval(() => {
              const time = Date.now() - startTime;
              if (time > 20000) {
                setState("gameover");
              }
              setStopWatch((Math.round(time / 100) / 10).toFixed(1));
            }, 100)
          );
          // console.log(intervalId);
          break;
        case "finished":
          setTime(((Date.now() - startTime) / 1000).toFixed(3));
          intervalId = clearAllInterval(intervalId);
          break;
        case "gameover":
          intervalId = clearAllInterval(intervalId);
      }
    }, [state]);

    const timerIcon = state === "playing" ? "■ " : "▶ ";

    return (
      <div className={styles.time}>
        <span>{timerIcon}</span>
        {stopWatch}
      </div>
    );
  }
);
