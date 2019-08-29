import React from "react";
import { Switch } from "react-router";
import { Route } from "react-router-dom";

import { Game } from "./components/pages/Game";
import { Home } from "./components/pages/Home";


const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/game" component={Game}></Route>
      </Switch>
    </div>
  );
};

export default App;
