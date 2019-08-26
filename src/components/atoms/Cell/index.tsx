import React from "react";
import types from "./Cell.module.scss";

export interface Cell {
  key?: number;
  id?: number;
  value: number;
  type?: "static" | "variable";
  clickEventHandler?: () => void;
}

export const Cell: React.FC<Cell> = ({
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
