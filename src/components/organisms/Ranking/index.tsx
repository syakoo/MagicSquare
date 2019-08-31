import React, { useState, useEffect } from "react";
import useReactRouter from "use-react-router";

import {BalloonButton} from "../../atoms/BalloonButtom";
import {Button} from "../../atoms/Button";
import { getScoreRanking } from "../../../logics/util/fireStore";
import styles from "./Ranking.module.scss";

export const Ranking: React.FC<{}> = () => {
  const [scoreRanking, setScoreRanking] = useState<JSX.Element[]>([]);
  const { location, history } = useReactRouter();

  function updateScoreRanking(){
    getScoreRanking().then(scoreRanking => {
      let rankingList = [<tr style={{ display: "none" }} />];
      scoreRanking.forEach((score, index) => {
        rankingList.push(
          <tr key={index + 1}>
            <td>{index + 1}</td>
            <td>{score.time}</td>
            <td>{score.name}</td>
            <td className={styles.small}>
              {
                score.date
                  .toDate()
                  .toISOString()
                  .split("T")[0]
              }
            </td>
          </tr>
        );
      });
      setScoreRanking(rankingList);
    });
  }

  useEffect(() => {
    if(location.pathname==="/"){
      updateScoreRanking();
    }
  }, [location.pathname]);

  return (
    <div className={styles.table_body}>
      <div className={styles.title}>● Ranking ●</div>
      <table className={styles.table}>
        <thead>
          <tr key="0">
            <td>Rank</td>
            <td>Time</td>
            <td>User</td>
            <td>Date</td>
          </tr>
        </thead>
        <div className={styles.tbody}>{scoreRanking}</div>
      </table>
      <BalloonButton label="Reload" onClick={()=>{updateScoreRanking()}} isEmpha={false} LorR="left"></BalloonButton>
      <BalloonButton label="GameStart" onClick={()=>{history.push("/game")}} isEmpha={true} LorR="right"></BalloonButton>
    </div>
  );
};
