import React, { useState, useEffect } from "react";
import useReactRouter from "use-react-router";

import { BalloonButton } from "../../atoms/BalloonButtom";
import { WideButton } from "../../atoms/Button";
import { PageTemplate } from "../Template";
import { NameForm } from "../../molecules/NameForm";
import { rankingListNormal, rankingListHard } from "../../../logics/util/rankingList";
import { setUserName, getUserName } from "../../../logics/util/user";
import styles from "./LevelSelect.module.scss";

export const LevelSelect: React.FC<{}> = () => {
  const { history } = useReactRouter();
  const [name, setName] = useState<string>(getUserName() || "Guest");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if(name===""){
      setMessage("Input UserName")
    }else{
      const preScoreNormal = rankingListNormal.isUserExist(name);
      const preScoreHard = rankingListHard.isUserExist(name);
      if (!(preScoreNormal)&&!(preScoreHard)) {
        setMessage("new Player");
      } else {
        setMessage(`Normal...${(preScoreNormal)? preScoreNormal: "No Record"} Hard...${(preScoreHard)? preScoreHard: "No Record"}`);
      }
    }
  }, [name]);

  return (
    <PageTemplate>
      <div className={styles.select_box}>
        <div className={styles.title}>● Player ●</div>
        <NameForm name={name} setName={setName} />
        <div className={styles.message}>{message}</div>
      </div>
      <div className={styles.select_box}>
        <div className={styles.title}>● Level Select ●</div>
        <WideButton
          label="Normal"
          onClick={() => {
            setUserName(name);
            history.push("/game/normal");
          }}
        ></WideButton>
        <WideButton
          label="Hard"
          onClick={() => {
            setUserName(name);
            history.push("/game/hard");
          }}
          isEmpha={true}
        ></WideButton>
      </div>
      <BalloonButton
        label="Home"
        onClick={() => {
          history.push("/");
        }}
        isEmpha={false}
        LorR="left"
      ></BalloonButton>
    </PageTemplate>
  );
};
