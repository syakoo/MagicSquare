import React from "react";
import useReactRouter from "use-react-router";
import { RouteComponentProps } from "react-router";

import { PageTemplate } from "../Template";
import { Counter } from "../../organisms/Counter";
import { Button } from "../../atoms/Button";

export const Home: React.FC<RouteComponentProps> = () => {
  const { history } = useReactRouter();
  
  const handleToGamePage = ():void => {
    console.log("Clicked");
    history.push("/game");
  }
  
  return (
    <PageTemplate>
      <Button label="Game Start" onClick={handleToGamePage}/>
      <div>Home</div>
      <Counter></Counter>
    </PageTemplate>
  );
};
