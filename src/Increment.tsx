import React, { Dispatch } from "react";

// インクリメントボタンのComponent
const Increment: React.FC<{ count: number; setCount: Dispatch<number> }> = ({
  count,
  setCount
}) => {
  // インクリメント処理
  const clickEventHandler = () => {
    setCount(count + 1);
  };

  // インクリメントボタンのUI
  return <button onClick={clickEventHandler}>INCREMENT</button>;
};

// Componentをエクスポート
export default Increment;
