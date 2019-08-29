import React, { useState, useEffect } from "react";
import useReactRouter from "use-react-router";

import { getScoreRanking } from "../../../logics/util/fireStore";
import styles from "./Ranking.module.scss";

export const Ranking: React.FC<{}> = () => {
  const [scoreRanking, setScoreRanking] = useState<JSX.Element[]>([]);
  const { location } = useReactRouter();

  useEffect(()=>{
    getScoreRanking().then(scoreRanking => {
      let rankingList = [
        <tr key="0">
          <th>Rank</th>
          <th>Time</th>
          <th>User</th>
          <th className={styles.date}>Date</th>
        </tr>
      ];
      scoreRanking.forEach((score, index) => {
        rankingList.push(
          <tr key={index + 1}>
            <td>{index + 1}</td>
            <td>{score.time}</td>
            <td>{score.name}</td>
            <td>
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
  },[location.pathname])

  return (
    <div className={styles.table_body}>
      <div className={styles.title}>ランキング</div>
      <table className={styles.table}>{scoreRanking}</table>
    </div>
  );
};
