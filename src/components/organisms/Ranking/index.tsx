import React, { useState, useEffect } from "react";
import useReactRouter from "use-react-router";

import { Loading } from "../../atoms/Loading";
import {
  rankingListNormal,
  rankingListHard
} from "../../../logics/util/rankingList";
import styles from "./Ranking.module.scss";
import { Imode } from "../../../types";

export const Ranking: React.FC<{ mode: Imode }> = ({ mode }) => {
  console.log("render Ranking");
  const [scoreRankingList, setScoreRankingList] = useState<any[]>([
    { name: "null", time: Infinity }
  ]);
  const { location } = useReactRouter();

  function updateScoreRanking() {
    setScoreRankingList([{ name: "null", time: Infinity }]);
    if (mode === "normal") {
      rankingListNormal.loadScoreRanking().then(scoreRanking => {
        setScoreRankingList(scoreRanking);
      });
    } else {
      rankingListHard.loadScoreRanking().then(scoreRanking => {
        setScoreRankingList(scoreRanking);
      });
    }
  }

  useEffect(() => {
    if (location.pathname === "/") {
      updateScoreRanking();
    }
  }, [location.pathname, mode]);

  const rankingList = scoreRankingList.map((score, index) => {
    if (score.name === "null" && index === 0) {
      return <Loading isLoading={true}></Loading>;
    }
    return (
      <div key={index + 1} className={styles.tr}>
        <div className={styles.td}>{index + 1}</div>
        <div className={styles.td}>{score.total.time}</div>
        <div className={styles.td}>{score.name}</div>
        <div className={`${styles.small} ${styles.td}`}>
          {score.total.date !== undefined
            ? score.total.date
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
      <small className={styles.mode}>{mode.toUpperCase()}</small>
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
    </div>
  );
};
