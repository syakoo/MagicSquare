import React from "react";
import types from "./Cell.module.scss";

import { ICell } from "../../../types"

export const Cell: React.FC<ICell> = ({
  id,
  value,
  type,
  clickEventHandler = () => {}
}) => {
  
  const output = value===0 ? "" : value;

  if (type === "variable") {
    return (
      <div
        className={`${types.cell} ${types.variable}`}
        onClick={clickEventHandler}
      >
        {output}
      </div>
    );
  }
  return <div className={`${types.cell} ${types.static}`}>{output}</div>;
};
