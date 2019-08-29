import React, { useState, Dispatch, useEffect } from "react";

import {
  getScoreRanking,
  isUserExist,
  setScoreRanking,
  rankingOfAll
} from "../../../logics/util/fireStore";
import { Button } from "../../atoms/Button";
import { NameForm } from "../../molecules/NameForm";
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
  const [message, setMessage] = useState<string>("");
  const [ranking, setRanking] = useState<number>(0);
  const score = { name: name, time: time, date: new Date() };
  let scoreRankingList = [{name: "Null", time: Infinity}];

  useEffect(() => {
    if (name === "") {
      setMessage("名前を入力してください");
    } else {
      const preTime = isUserExist(name, scoreRankingList); 
      if (!preTime) {
        setMessage("");
      } else {
        setMessage(`記録...${preTime}`);
      }
    }
  }, [name]);

  useEffect(() => {
    if (state === "finished") {
      getScoreRanking().then((scoreRanking)=>{
        scoreRankingList = scoreRanking;
        const ranking = rankingOfAll(time, scoreRankingList);
        if (!ranking) {
          setRanking(Infinity);
        } else {
          setRanking(ranking);
        }
      });
    }
  }, [state]);

  return (
    <div
      className={styles.all}
      style={state === "finished" ? {} : { display: "none" }}
    >
      <div className={styles.body}>
        <div className={styles.title}>ゲームクリア!!</div>
        <div>
          <div className={styles.ranking_label}>
            第<span className={styles.ranking}>{ranking}</span>位
          </div>
          <div>Time : {time}</div>
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
};
