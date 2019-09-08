import React, { useState } from "react";
import useReactRouter from "use-react-router";
import { RouteComponentProps, Switch } from "react-router";

import { BalloonButton } from "../../atoms/BalloonButtom";
import { PageTemplate } from "../Template";
import { Ranking } from "../../organisms/Ranking";
import { Imode } from "../../../types";

export const Home: React.FC<RouteComponentProps> = () => {
  const [mode, setMode] = useState<Imode>("normal");
  const { history } = useReactRouter();

  return (
    <PageTemplate>
      <Ranking mode={mode}></Ranking>
      <BalloonButton
        label={`${(mode==="normal")? "HARD": "NORMAL"}`}
        onClick={() => {setMode((mode==="normal")? "hard": "normal")}}
        isEmpha={false}
        LorR="left"
      ></BalloonButton>
      <BalloonButton
        label="GameStart"
        onClick={() => {
          history.push("/level_select");
        }}
        isEmpha={true}
        LorR="right"
      ></BalloonButton>
    </PageTemplate>
  );
};
