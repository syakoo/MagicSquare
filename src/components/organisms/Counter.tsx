import React, { useState } from "react";
import Count from "../atoms/Count";
import Increment from "../atoms/Increment";

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Count count={count} />
      <Increment count={count} setCount={setCount} />
    </div>
  );
};