import React from "react";
import { RouteComponentProps } from "react-router";

import { PageTemplate } from "../Template";
import { Counter } from "../../organisms/Counter";

export const Home: React.FC<RouteComponentProps> = () => {
  return (
    <PageTemplate>
      <div>Home</div>
      <Counter></Counter>
    </PageTemplate>
  );
};
