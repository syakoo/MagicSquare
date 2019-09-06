import React from "react";
import { RouteComponentProps } from "react-router";

import { PageTemplate } from "../Template";
import { Ranking } from "../../organisms/Ranking";

export const Home: React.FC<RouteComponentProps> = () => {
  return (
    <PageTemplate>
      <Ranking />
    </PageTemplate>
  );
};
