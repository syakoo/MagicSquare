import React, { useState, useEffect } from "react";
import useReactRouter from "use-react-router";

import { BalloonButton } from "../../atoms/BalloonButtom";
import { getScoreRanking } from "../../../logics/util/fireStore";
import styles from "./Ranking.module.scss";

export const Ranking: React.FC<{}> = () => {
  console.log("render Ranking");
  const [scoreRankingList, setScoreRankingList] = useState<any[]>([
    { name: "null", time: Infinity }
  ]);
  const { location, history } = useReactRouter();

  function updateScoreRanking() {
    getScoreRanking().then(scoreRanking => {
      setScoreRankingList(scoreRanking);
    });
  }

  useEffect(() => {
    if (location.pathname === "/") {
      updateScoreRanking();
    }
  }, [location.pathname]);

  const rankingList = scoreRankingList.map((score, index) => {
    return (
      <div key={index + 1} className={styles.tr}>
        <div className={styles.td}>{index + 1}</div>
        <div className={styles.td}>{score.time}</div>
        <div className={styles.td}>{score.name}</div>
        <div className={`${styles.small} ${styles.td}`}>
          {score.date !== undefined
            ? score.date
                .toDate()
                .toISOString()
                .split("T")[0]
            : "null"}
        </div>
      </div>
    );
  });

  return (
    <div className={styles.table_body}>
      <div className={styles.title}>● Ranking ●</div>
      <div className={styles.table}>
        <div className={styles.thead}>
          <div className={styles.tr}>
            <div className={styles.td}>Rank</div>
            <div className={styles.td}>Time</div>
            <div className={styles.td}>User</div>
            <div className={styles.td}>Date</div>
          </div>
        </div>
        <div className={styles.tbody}>{rankingList}</div>
      </div>
      <BalloonButton
        label="Reload"
        onClick={() => {
          updateScoreRanking();
        }}
        isEmpha={false}
        LorR="left"
      ></BalloonButton>
      <BalloonButton
        label="GameStart"
        onClick={() => {
          history.push("/game");
        }}
        isEmpha={true}
        LorR="right"
      ></BalloonButton>
    </div>
  );
};
