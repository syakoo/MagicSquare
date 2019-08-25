import React from "react";

// CountのComponent.今回は出力するだけ
const Count: React.FC<{ count: number }> = ({ count }) => {
  return <h1>{count}</h1>;
};

// Componentのエクスポート
export default Count;
