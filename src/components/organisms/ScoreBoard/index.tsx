import React, { useState, Dispatch, useEffect } from "react";

import { getUserName } from "../../../logics/util/user";
import {
  rankingListNormal,
  rankingListHard
} from "../../../logics/util/rankingList";
import { setAnalysis } from "../../../logics/util/analysis";
import { IState, Imode } from "../../../types";
import styles from "./ScoreBoard.module.scss";

interface IScoreBoard {
  time: number;
  isDisplay: boolean;
  setState: Dispatch<IState>;
  mode: Imode;
}

export const ScoreBoard: React.FC<IScoreBoard> = React.memo(
  ({ time, isDisplay, setState, mode }) => {
    // console.log("render ScoreBoard");
    const name = getUserName();
    const [message, setMessage] = useState<string>("");
    const [ranking, setRanking] = useState<number>(0);
    const [isNewRecord, setIsNewRecord] = useState<boolean>(false);
    const score = { time: time, date: new Date() };
    const rankingList = mode === "normal" ? rankingListNormal : rankingListHard;

    useEffect(() => {
      if (isDisplay) {
        rankingList.loadScoreRanking().then(() => {
          const ranking = rankingList.rankingOfAll(time);
          if (!ranking) {
            setRanking(Infinity);
          } else {
            setRanking(ranking);
          }
          const preTime = rankingList.isUserExist(name);
          if (!preTime) {
            setMessage("");
            rankingList.setScoreRanking(name, score);
          } else {
            setMessage(`${name}'s Record...${preTime}`);
            if (preTime > time) {
              setIsNewRecord(true);
              rankingList.setScoreRanking(name, score);
            } else {
              setIsNewRecord(false);
            }
          }
        });

        setAnalysis(mode, time);
      }
    }, [time]);

    return (
      <div className={styles.all} style={isDisplay ? {} : { display: "none" }}>
        <div className={styles.body}>
          <div className={styles.title}>Game Clear</div>
          <div>
            <div className={styles.mode}>{mode.toUpperCase()}</div>
            <div className={styles.ranking_label}>
              第<span className={styles.ranking}>{ranking}</span>位
            </div>
            <div>
              <span className={styles.time}>Time :</span> {time}{" "}
              <span className={styles.newrecord}>
                {isNewRecord ? "(New Record)" : ""}
              </span>
            </div>
            <small>{message}</small>
          </div>
        </div>
      </div>
    );
  }
);
