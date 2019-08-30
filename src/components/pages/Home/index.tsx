import React from "react";
import useReactRouter from "use-react-router";
import { RouteComponentProps } from "react-router";

import { PageTemplate } from "../Template";
import { Ranking } from "../../organisms/Ranking";
import { Button } from "../../atoms/Button";

export const Home: React.FC<RouteComponentProps> = () => {
  const { history } = useReactRouter();
  
  const handleToGamePage = ():void => {
    history.push("/game");
  }
  
  return (
    <PageTemplate>
      <Ranking />
    </PageTemplate>
  );
};
