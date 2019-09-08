import React from "react";
import { Route, Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";

import { MagicSquare } from "../../organisms/MagicSquare"
import { PageTemplate } from "../Template";

export const Game: React.FC<RouteComponentProps> = () => {

  return (
    <PageTemplate>
      <Route path="/game/normal" render={()=><MagicSquare mode={"normal"}/>}></Route>
      <Route path="/game/hard" render={()=><MagicSquare mode={"hard"}/>}></Route>
    </PageTemplate>
  );
};
