import React, { useState, Dispatch, useEffect } from "react";

import {
  getScoreRanking,
  isUserExist,
  setScoreRanking,
  rankingOfAll
} from "../../../logics/util/fireStore";
import { Button } from "../../atoms/Button";
import { NameForm } from "../../molecules/NameForm";
import { IState } from "../../../types";
import styles from "./ScoreBoard.module.scss";

interface IScoreBoard {
  time: number;
  isDisplay: boolean;
  setState: Dispatch<IState>;
}

export const ScoreBoard: React.FC<IScoreBoard> = React.memo(
  ({ time, isDisplay, setState }) => {
    console.log("render ScoreBoard");
    const [name, setName] = useState<string>("Guest");
    const [message, setMessage] = useState<string>("");
    const [ranking, setRanking] = useState<number>(0);
    const [scoreRankingList, setScoreRankingList] = useState([
      { name: "Null", time: Infinity }
    ]);
    const score = { name: name, time: time, date: new Date() };

    useEffect(() => {
      if (isDisplay) {
        getScoreRanking().then(scoreRanking => {
          setScoreRankingList(scoreRanking);
        });
      }
    }, [isDisplay]);

    useEffect(() => {
      const ranking = rankingOfAll(time, scoreRankingList);
      if (!ranking) {
        setRanking(Infinity);
      } else {
        setRanking(ranking);
      }
    }, [time, scoreRankingList]);

    useEffect(() => {
      if (name === "") {
        setMessage("名前を入力してください");
      } else {
        const preTime = isUserExist(name, scoreRankingList);
        console.log(name);
        if (!preTime) {
          setMessage("");
        } else {
          setMessage(`このユーザの記録...${preTime}`);
        }
      }
    }, [name, scoreRankingList]);

    return (
      <div className={styles.all} style={isDisplay ? {} : { display: "none" }}>
        <div className={styles.body}>
          <div className={styles.title}>ゲームクリア!!</div>
          <div>
            <div className={styles.ranking_label}>
              第<span className={styles.ranking}>{ranking}</span>位
            </div>
            <div>
              <span className={styles.time}>Time :</span> {time}
            </div>
            <NameForm name={name} setName={setName} />
            <small>{message}</small>
          </div>
          <Button
            label="記録する"
            onClick={() => {
              setScoreRanking(score, scoreRankingList);
              setState("standby");
            }}
          ></Button>
          <Button label="もう一度" onClick={() => setState("standby")}></Button>
        </div>
      </div>
    );
  }
);
