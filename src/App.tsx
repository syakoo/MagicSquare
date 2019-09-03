import React from "react";
import { Switch } from "react-router";
import { Route } from "react-router-dom";

import { Game } from "./components/pages/Game";
import { Home } from "./components/pages/Home";
import { Help } from "./components/pages/Help";

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/game" component={Game}></Route>
        <Route path="/help" component={Help}></Route>
      </Switch>
    </div>
  );
};

export default App;
