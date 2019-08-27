import React from "react";
import { useEffect } from "react";
import { RouteComponentProps } from "react-router";

import { MagicSquare } from "../../organisms/MagicSquare"
import { PageTemplate } from "../Template";

export const Game: React.FC<RouteComponentProps> = () => {

  return (
    <PageTemplate>
      <MagicSquare />
    </PageTemplate>
  );
};
