import React, { useState } from "react";

// 自作Componentのインポート
import Count from "./Count";
import Increment from "./Increment";

// 全体のComponent
const App: React.FC = () => {
  // ReactHookを使う
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Count count={count} />
      <Increment count={count} setCount={setCount} />
    </div>
  );
};

export default App;
